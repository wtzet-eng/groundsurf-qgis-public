"""GroundSurf QGIS dock, simple site selection/drawing and asynchronous online query."""
import json
import time

from qgis.PyQt.QtCore import Qt, QLocale, QTimer, QUrl
from qgis.PyQt.QtGui import QAction, QColor, QDesktopServices
from qgis.PyQt.QtWidgets import (
    QComboBox, QDockWidget, QHBoxLayout, QLabel, QLineEdit, QFrame,
    QMessageBox, QPlainTextEdit, QPushButton, QScrollArea, QVBoxLayout, QWidget,
    QCheckBox, QMenu, QToolButton, QSizePolicy
)
from qgis.PyQt.QtNetwork import QNetworkAccessManager, QNetworkReply, QNetworkRequest
from qgis.core import (
    QgsCoordinateReferenceSystem, QgsCoordinateTransform, QgsDistanceArea,
    QgsGeometry, QgsPointXY, QgsProject, QgsSettings, QgsVectorLayer, QgsWkbTypes,
)
from qgis.gui import QgsMapTool, QgsRubberBand, QgsVertexMarker
from qgis.core import QgsNetworkAccessManager

from .presentation import STYLE, ReportText, SiteForm
from .basemap import Basemap, is_osm
from .version import VERSION, USER_AGENT
from .compat import POLYGON_GEOMETRY
from .core import (
    API_URL, GEOCODER_URL, COUNTRIES, LANGUAGES, MAX_RESPONSE_BYTES,
    available_languages, format_report_text, geocoder_search_url,
    parse_geocoder_results, preferred_language, report_url, request_payload
)


class PolygonDrawTool(QgsMapTool):
    """Lightweight 3+ clicks / double-click polygon tool in canvas coordinates."""

    def __init__(self, canvas, complete, cancelled):
        super().__init__(canvas)
        self._canvas = canvas
        self._complete = complete
        self._cancelled = cancelled
        self._points = []
        self._band = QgsRubberBand(canvas, POLYGON_GEOMETRY)
        self._band.setColor(QColor(21, 103, 155))
        self._band.setFillColor(QColor(38, 166, 124, 55))
        self._band.setWidth(2)

    def canvasPressEvent(self, event):
        if event.button() == Qt.MouseButton.RightButton:
            self._cancelled()
            return
        if event.button() != Qt.MouseButton.LeftButton:
            return
        point = self.toMapCoordinates(event.pos())
        if not self._points or self._points[-1] != point:
            self._points.append(point)
        self._redraw()

    def canvasDoubleClickEvent(self, event):
        point = self.toMapCoordinates(event.pos())
        if not self._points or self._points[-1] != point:
            self._points.append(point)
        # QGIS often sends a second press event before the double click event.
        compact = []
        for p in self._points:
            if not compact or p != compact[-1]:
                compact.append(p)
        if len(compact) < 3:
            self._cancelled("Draw at least three corners.")
            return
        ring = compact + [compact[0]]
        self._complete(QgsGeometry.fromPolygonXY([ring]), self._canvas.mapSettings().destinationCrs())

    def keyPressEvent(self, event):
        if event.key() == Qt.Key.Key_Escape:
            self._cancelled()
        else:
            super().keyPressEvent(event)

    def _redraw(self):
        self._band.reset(POLYGON_GEOMETRY)
        for p in self._points:
            self._band.addPoint(p, False)
        if self._points:
            self._band.show()

    def clear(self):
        self._points = []
        self._band.reset(POLYGON_GEOMETRY)
        self._band.hide()


from .actions import ReportActions
from .report_view import summary
from .stream import AnalysisStream


class GroundSurfPlugin(ReportActions):
    def __init__(self, iface):
        self.iface = iface
        self.jobs = {}
        self.report = self.reader = self.layer_id = self.parcel = None
        self.action = None
        self.dock = None
        self._geometry = None
        self._geometry_crs = None
        self._draw_tool = None
        self._previous_tool = None
        self._reply = None
        self._timeout = None
        self._timed_out = False
        self._current_report_url = ""
        self.circle = None
        self.site_kind = "drawn"
        # Explicit language choice persists across QGIS sessions. It takes
        # precedence over a country's native language, just as on the website.
        self._settings = QgsSettings()
        self._explicit_language = str(
            self._settings.value("GroundSurfQGIS/language_preference", "") or ""
        )
        self._system_language = QLocale().name()
        self._search_reply = None
        self._search_timer = None
        self._search_cache = {}
        self._search_last_at = 0
        self._pending_search_key = None
        self._address_marker = None
        self._site_band = None
        self._stream = None
        self._elapsed_timer = None
        self._request_start = None
        self.basemap = None
        self._suggest_timer = None
        self._search_select_single = False


    def initGui(self):
        self.action = QAction("GroundSurf — Site Intelligence", self.iface.mainWindow())
        self.action.triggered.connect(self.open_panel)
        self.iface.addPluginToMenu("&GroundSurf", self.action)
        self.iface.addToolBarIcon(self.action)

    def unload(self):
        if self._suggest_timer:
            self._suggest_timer.stop()
        if self.basemap:
            self.basemap.close()
            self.basemap = None
        if self.dock:
            self.iface.mapCanvas().destinationCrsChanged.disconnect(self._refresh_outline)
            tree = QgsProject.instance().layerTreeRoot()
            for signal in (tree.visibilityChanged, tree.addedChildren, tree.removedChildren):
                signal.disconnect(self._sync_basemap_control)
        self.reset_report()
        picker = getattr(self,"picker",None)
        if picker and self.iface.mapCanvas().mapTool() is picker:
            self.iface.mapCanvas().unsetMapTool(picker)
        if self._reply is not None:
            self._reply.finished.disconnect(self._on_reply_finished)
            self._reply.abort()
            self._reply = None
        if self._search_reply is not None:
            self._search_reply.finished.disconnect(self._on_address_search_finished)
            self._search_reply.abort()
            self._search_reply = None
        if self._search_timer is not None:
            self._search_timer.stop()
            self._search_timer = None
        if self._address_marker is not None:
            self.iface.mapCanvas().scene().removeItem(self._address_marker)
            self._address_marker = None
        if self._site_band is not None:
            self.iface.mapCanvas().scene().removeItem(self._site_band)
            self._site_band = None
        if self._elapsed_timer is not None:
            self._elapsed_timer.stop()
            self._elapsed_timer = None
        if self._timeout is not None:
            self._timeout.stop()
        self._restore_map_tool()
        if self._draw_tool is not None:
            self._draw_tool.clear()
            self.iface.mapCanvas().scene().removeItem(self._draw_tool._band)
            self._draw_tool = None
        if self.dock is not None:
            self.iface.removeDockWidget(self.dock)
            self.dock.deleteLater()
            self.dock = None
        if self.action is not None:
            self.iface.removeToolBarIcon(self.action)
            self.iface.removePluginMenu("&GroundSurf", self.action)
            self.action.deleteLater()
            self.action = None

    def open_panel(self):
        if self.dock is None:
            self._create_panel()
        self.dock.show()
        self.dock.raise_()
        if self.basemap is None:
            self.basemap = Basemap(self.iface, self._settings, self._map_unavailable)
            try:
                self.basemap.start()
            except ValueError as exc:
                self.progress.setText(str(exc))
        self.address_input.setFocus()

    def _create_panel(self):
        self.dock = QDockWidget("GroundSurf — Site Intelligence", self.iface.mainWindow())
        self.dock.setObjectName("groundsurfSiteIntelligenceDock")
        root = QWidget(self.dock)
        root.setObjectName("groundsurfPanel")
        root.setStyleSheet(STYLE)
        root.setMinimumWidth(310)
        layout = QVBoxLayout(root)
        layout.setContentsMargins(14, 12, 14, 12)
        layout.setSpacing(9)
        self._labels = []

        def labelled(widget, english, polish):
            self._labels.append((widget, english, polish))
            return widget

        top = QHBoxLayout()
        heading = QLabel("GroundSurf")
        heading.setObjectName("brand")
        top.addWidget(heading, 1)
        self.tools_button = labelled(QToolButton(), "More", "Więcej")
        self.tools_button.setPopupMode(QToolButton.ToolButtonPopupMode.InstantPopup)
        self.tools_menu = QMenu(self.tools_button)
        self.tools_button.setMenu(self.tools_menu)
        top.addWidget(self.tools_button)
        layout.addLayout(top)
        maps = QHBoxLayout()
        self.osm_toggle = QCheckBox("OpenStreetMap")
        self.osm_toggle.toggled.connect(self._toggle_basemap)
        maps.addWidget(self.osm_toggle, 1)
        self.map_button = labelled(QToolButton(), "Map layers", "Warstwy mapy")
        self.map_button.setPopupMode(QToolButton.ToolButtonPopupMode.InstantPopup)
        self.map_menu = QMenu(self.map_button)
        self.map_button.setMenu(self.map_menu)
        maps.addWidget(self.map_button)
        layout.addLayout(maps)
        self.map_status = QLabel()
        self.map_status.setObjectName("hint")
        self.map_status.setWordWrap(True)
        self.map_status.hide()
        layout.addWidget(self.map_status)
        tree = QgsProject.instance().layerTreeRoot()
        for signal in (tree.visibilityChanged, tree.addedChildren, tree.removedChildren):
            signal.connect(self._sync_basemap_control)
        self._sync_basemap_control()
        self.site_toggle = labelled(QPushButton(), "Find or change site", "Wybierz lub zmień lokalizację")
        self.site_toggle.setCheckable(True)
        self.site_toggle.setChecked(True)
        self.site_toggle.hide()
        layout.addWidget(self.site_toggle)

        self.form = SiteForm(root)
        self.form.setWidgetResizable(True)
        self.form.setSizeAdjustPolicy(QScrollArea.SizeAdjustPolicy.AdjustToContents)
        self.form.setFrameShape(QFrame.Shape.NoFrame)
        self.form.setMinimumHeight(0)
        self.form.setSizePolicy(QSizePolicy.Policy.Expanding, QSizePolicy.Policy.Maximum)
        self.form.setMaximumHeight(480)
        form = QWidget()
        controls = QVBoxLayout(form)
        controls.setContentsMargins(0, 0, 4, 0)
        controls.setSpacing(9)
        controls.setAlignment(Qt.AlignmentFlag.AlignTop)
        address_row = QHBoxLayout()
        self.address_input = QLineEdit()
        self.address_input.setClearButtonEnabled(True)
        self.address_input.setMinimumWidth(0)
        self.address_input.returnPressed.connect(self.search_address)
        self.address_input.textEdited.connect(self._address_edited)
        address_row.addWidget(self.address_input, 1)
        self.search_button = labelled(QPushButton(), "Find", "Szukaj")
        self.search_button.clicked.connect(self.search_address)
        address_row.addWidget(self.search_button)
        controls.addLayout(address_row)
        self.address_results = QComboBox()
        self.address_results.setMinimumWidth(0)
        self.address_results.setSizeAdjustPolicy(QComboBox.SizeAdjustPolicy.AdjustToMinimumContentsLengthWithIcon)
        self.address_results.setMinimumContentsLength(12)
        self.address_results.addItem("", None)
        self.address_results.currentIndexChanged.connect(self._on_address_result_selected)
        self.address_results.hide()
        controls.addWidget(self.address_results)
        attribution = QLabel("© OpenStreetMap contributors · Photon")
        attribution.setObjectName("hint")
        controls.addWidget(attribution)

        buttons = QHBoxLayout()
        self.parcel_button = labelled(QPushButton(), "Pick parcel", "Wskaż działkę")
        self.parcel_button.clicked.connect(self.pick_parcel)
        buttons.addWidget(self.parcel_button)
        draw = labelled(QPushButton(), "Draw boundary", "Narysuj granicę")
        draw.clicked.connect(self.start_drawing)
        buttons.addWidget(draw)
        controls.addLayout(buttons)
        self.radius_button = labelled(QPushButton(), "Use a 50 m radius here", "Użyj promienia 50 m")
        self.radius_button.clicked.connect(self.use_address_radius)
        self.radius_button.hide()
        controls.addWidget(self.radius_button)

        self.options_button = labelled(QPushButton(), "Country, language and defaults", "Kraj, język i ustawienia")
        self.options_button.setCheckable(True)
        controls.addWidget(self.options_button)
        self.options = QWidget()
        options = QVBoxLayout(self.options)
        options.setContentsMargins(0, 0, 0, 0)
        options.addWidget(labelled(QLabel(), "Site country", "Kraj lokalizacji"))
        self.country = QComboBox()
        self.country.addItem("", "")
        for code, name in sorted(COUNTRIES, key=lambda item: item[1]):
            self.country.addItem("%s (%s)" % (name, code), code)
        options.addWidget(self.country)
        options.addWidget(labelled(QLabel(), "Report language", "Język raportu"))
        language_row = QHBoxLayout()
        self.language = QComboBox()
        language_row.addWidget(self.language, 1)
        self.use_site_language_button = labelled(QPushButton(), "Automatic", "Automatycznie")
        self.use_site_language_button.clicked.connect(self._use_site_language)
        language_row.addWidget(self.use_site_language_button)
        options.addLayout(language_row)
        self.auto_search = labelled(QCheckBox(), "Suggest addresses as I type", "Podpowiadaj adresy podczas pisania")
        self.auto_search.setChecked(self._settings.value("GroundSurfQGIS/auto_search", True) not in (False, "false", "0"))
        self.auto_search.toggled.connect(self._auto_search_changed)
        options.addWidget(self.auto_search)
        self.auto_map = labelled(QCheckBox(), "OpenStreetMap in empty projects", "OpenStreetMap w pustych projektach")
        self.auto_map.setChecked(self._settings.value("GroundSurfQGIS/auto_map", True) not in (False, "false", "0"))
        self.auto_map.toggled.connect(lambda value: self._settings.setValue("GroundSurfQGIS/auto_map", value))
        options.addWidget(self.auto_map)
        privacy = labelled(QLabel(), "Typed searches go to Photon. GroundSurf receives your chosen site when you request its parcel or report.",
                           "Wpisywane adresy trafiają do Photon. GroundSurf otrzymuje wybraną lokalizację przy wyszukiwaniu działki lub raportu.")
        privacy.setWordWrap(True)
        privacy.setObjectName("hint")
        options.addWidget(privacy)
        controls.addWidget(self.options)
        self.options.hide()
        self.options_button.toggled.connect(self.options.setVisible)
        self.options_button.toggled.connect(self._size_form)
        self.form.setWidget(form)
        self.site_toggle.toggled.connect(self.form.setVisible)
        layout.addWidget(self.form)

        self.site_status = QLabel()
        self.site_status.setObjectName("siteCard")
        self.site_status.setWordWrap(True)
        self.site_status.setTextFormat(Qt.TextFormat.PlainText)
        layout.addWidget(self.site_status)
        self.progress = QLabel()
        self.progress.setObjectName("hint")
        self.progress.setWordWrap(True)
        self.progress.setTextFormat(Qt.TextFormat.PlainText)
        layout.addWidget(self.progress)
        self.analyze_button = labelled(QPushButton(), "Generate GroundSurf report", "Generuj raport GroundSurf")
        self.analyze_button.setObjectName("primary")
        self.analyze_button.clicked.connect(self.analyze)
        layout.addWidget(self.analyze_button)
        self.cancel_button = labelled(QPushButton(), "Cancel request", "Anuluj")
        self.cancel_button.setEnabled(False)
        self.cancel_button.hide()
        self.cancel_button.clicked.connect(self.cancel_analysis)
        layout.addWidget(self.cancel_button)

        self.report_text = ReportText()
        self.report_text.hide()
        layout.addWidget(self.report_text, 1)
        report_actions = QHBoxLayout()
        self.open_button = labelled(QPushButton(), "Read full report", "Czytaj pełny raport")
        self.open_button.setEnabled(False)
        self.open_button.clicked.connect(self.open_report)
        report_actions.addWidget(self.open_button)
        self.show_qgis_button = labelled(QPushButton(), "Map evidence", "Dane na mapie")
        self.show_qgis_button.clicked.connect(self.show_in_qgis)
        report_actions.addWidget(self.show_qgis_button)
        self.report_actions = QWidget()
        self.report_actions.setLayout(report_actions)
        self.report_actions.hide()
        layout.addWidget(self.report_actions)
        self.context_label = QLabel()
        self.context_label.setObjectName("hint")
        self.context_label.setWordWrap(True)
        layout.addWidget(self.context_label)
        self.empty_space = layout
        layout.addStretch(1)

        self.country.currentIndexChanged.connect(self._on_country_changed)
        self.language.activated.connect(self._on_explicit_language)
        self._suggest_timer = QTimer(self.dock)
        self._suggest_timer.setSingleShot(True)
        self._suggest_timer.timeout.connect(lambda: self.search_address(automatic=True))
        last_country = str(self._settings.value("GroundSurfQGIS/last_country", "") or "")
        last_index = self.country.findData(last_country)
        self.country.setCurrentIndex(max(0, last_index))
        self._refresh_languages()
        self.site_status.setText(self.tr2("Find an address, then choose its boundary.", "Znajdź adres, a następnie wybierz granicę."))
        self.progress.setText(self.tr2("Country and language follow the selected address.", "Kraj i język dopasują się do wybranego adresu."))
        self.dock.visibilityChanged.connect(self._visibility)
        self.iface.mapCanvas().destinationCrsChanged.connect(self._refresh_outline)
        self.dock.setWidget(root)
        self.iface.addDockWidget(Qt.DockWidgetArea.RightDockWidgetArea, self.dock)
        self._update_analyze_state()
        self._size_form()
        self.iface.mainWindow().resizeDocks([self.dock], [390], Qt.Orientation.Horizontal)

    def _size_form(self):
        controls = self.form.widget().layout()
        controls.invalidate()
        controls.activate()
        self.form.setMaximumHeight(min(460, controls.sizeHint().height() + 8))
        self.form.updateGeometry()

    def add_basemap(self):
        self.map_status.hide()
        if self.basemap is None:
            self.basemap = Basemap(self.iface, self._settings, self._map_unavailable)
        try:
            self.basemap.add()
        except ValueError as exc:
            self.map_status.setText(str(exc))
            self.map_status.show()
        self._sync_basemap_control()

    def _toggle_basemap(self, visible):
        if visible:
            self.add_basemap()
        else:
            for node in QgsProject.instance().layerTreeRoot().findLayers():
                if node.layer() and is_osm(node.layer()):
                    node.setItemVisibilityChecked(False)
            self.map_status.hide()
        self._sync_basemap_control()

    def _sync_basemap_control(self, *unused):
        visible = any(node.isVisible() and node.layer() and is_osm(node.layer())
                      for node in QgsProject.instance().layerTreeRoot().findLayers())
        blocked = self.osm_toggle.blockSignals(True)
        self.osm_toggle.setChecked(visible)
        self.osm_toggle.blockSignals(blocked)

    def _map_unavailable(self):
        self.map_status.setText(self.tr2("Some map tiles are unavailable. Report generation can still continue.",
                                        "Część kafelków mapy jest niedostępna. Nadal możesz wygenerować raport."))
        self.map_status.show()

    def use_address_radius(self):
        hit = self.address_results.currentData()
        if hit and hit.get("country") == self.country.currentData():
            self.set_circle(hit["lat"], hit["lon"], 50)
            self.radius_button.hide()

    def _auto_search_changed(self, enabled):
        self._settings.setValue("GroundSurfQGIS/auto_search", enabled)
        if self._suggest_timer:
            self._suggest_timer.stop()
        if not enabled:
            self._abort_address_search()

    def _address_edited(self, text):
        self._suggest_timer.stop()
        self._abort_address_search()
        self.address_results.hide()
        self._size_form()
        if self.auto_search.isChecked() and len(text.strip()) >= 3:
            self._suggest_timer.start(900)

    def _visibility(self, visible):
        if not visible:
            self._suggest_timer.stop()
            self._abort_address_search()
            self.stop_services()
            self.cancel_analysis()

    def _refresh_outline(self):
        if self._geometry is not None and self.dock:
            self._draw_selected_site_outline()

    def _translate(self):
        if not hasattr(self, "context_label"):
            return
        for widget, en, pl in self._labels:
            widget.setText(self.tr2(en, pl))
        self.address_input.setPlaceholderText(self.tr2("Address or place…", "Adres lub miejscowość…"))
        self.country.setItemText(0, self.tr2("Choose country", "Wybierz kraj"))
        country = self.country.currentData() or "—"
        language = self.language.currentText()
        self.context_label.setText(country + " · " + language)
        self.map_menu.clear()
        self.map_menu.addAction(self.tr2("Geology and other layers", "Geologia i inne warstwy"), self.add_overlay)
        self.map_menu.addAction(self.tr2("Zoom to site", "Powiększ do lokalizacji"), self.zoom_site)
        self.tools_menu.clear()
        for en, pl, fn in [
            ("Recent reports", "Ostatnie raporty", self.open_recent),
            ("Open website report", "Otwórz raport ze strony", self.open_web_report),
            ("Open saved JSON", "Otwórz zapisany JSON", self.load_record),
            ("Use selected polygon", "Użyj zaznaczonego poligonu", self.use_selected_polygon),
            ("Zoom to site", "Powiększ do lokalizacji", self.zoom_site),
            ("Screen an address radius…", "Ustaw promień wokół adresu…", self.point_radius),
            ("Find official parcel", "Znajdź działkę ewidencyjną", self.lookup),
            ("Explore in 3D", "Otwórz w 3D", self.explore_3d),
            ("Give feedback", "Przekaż opinię", lambda: QDesktopServices.openUrl(QUrl("https://groundsurf.net/feedback?lang=" + self.language.currentData()))),
        ]:
            self.tools_menu.addAction(self.tr2(en, pl), fn)
        if country == "HK":
            self.tools_menu.addAction(self.tr2("Find lot by reference", "Znajdź działkę według identyfikatora"), self.hk_lot)

    def _update_analyze_state(self):
        if not hasattr(self, "analyze_button"):
            return
        ready = self._geometry is not None and bool(self.country.currentData())
        # Keep action visible and clickable so users are told what is missing,
        # instead of showing an unexplained grey button.
        self.analyze_button.setEnabled(self._reply is None)
        if ready:
            self.analyze_button.setToolTip("Generate a new online site report")
        elif self._geometry is None:
            self.analyze_button.setToolTip("First draw a site or use one selected polygon")
        else:
            self.analyze_button.setToolTip("Select the site country before generating the report")

    def search_address(self, checked=False, automatic=False):
        """Debounced Photon search, bounded by the existing cache and request interval."""
        self._suggest_timer.stop()
        if self._search_reply is not None:
            return
        query = self.address_input.text().strip()
        endpoint = str(self._settings.value("GroundSurfQGIS/photon_endpoint", GEOCODER_URL)
                       or GEOCODER_URL)
        try:
            url = geocoder_search_url(query, endpoint)
        except ValueError as exc:
            self.progress.setText(str(exc))
            return
        key = (endpoint, query.casefold())
        if key in self._search_cache:
            self._show_address_results(self._search_cache[key], select_single=not automatic)
            return
        if time.monotonic() - self._search_last_at < 1.1:
            self._suggest_timer.start(1200)
            return
        self._search_last_at = time.monotonic()
        self._pending_search_key = key
        self._search_select_single = not automatic
        self.search_button.setEnabled(False)
        self.progress.setText(self.tr2("Finding addresses…", "Wyszukiwanie adresów…"))
        request = QNetworkRequest(QUrl(url))
        request.setRawHeader(b"User-Agent", USER_AGENT.encode("ascii"))
        request.setRawHeader(b"Accept", b"application/json")
        try:
            self._search_reply = QgsNetworkAccessManager.instance().get(request)
            self._search_reply.finished.connect(self._on_address_search_finished)
            self._search_timer = QTimer(self.dock)
            self._search_timer.setSingleShot(True)
            self._search_timer.timeout.connect(self._address_search_timeout)
            self._search_timer.start(18000)
        except Exception as exc:
            self._search_reply = None
            self.search_button.setEnabled(True)
            self.progress.setText(self.tr2("Address search could not start", "Nie można rozpocząć wyszukiwania") + ": %s" % exc)

    def _address_search_timeout(self):
        self._abort_address_search()
        self.progress.setText(self.tr2("Address search timed out. Try Find again, or draw a boundary.",
                                      "Upłynął czas wyszukiwania. Kliknij Szukaj ponownie lub narysuj granicę."))

    def _abort_address_search(self):
        if self._search_reply is not None:
            self._pending_search_key = None
            self._search_select_single = False
            self._search_reply.abort()

    def _on_address_search_finished(self):
        reply = self._search_reply
        if reply is None:
            return
        self._search_reply = None
        if self._search_timer is not None:
            self._search_timer.stop()
            self._search_timer.deleteLater()
            self._search_timer = None
        if self.dock is None:
            reply.deleteLater()
            return
        self.search_button.setEnabled(True)
        status = reply.attribute(QNetworkRequest.Attribute.HttpStatusCodeAttribute)
        error = reply.error()
        raw = bytes(reply.readAll()) if reply.isOpen() else b""
        detail = reply.errorString()
        reply.deleteLater()
        key = self._pending_search_key
        self._pending_search_key = None
        if key and key[1] != self.address_input.text().strip().casefold():
            return
        if error == QNetworkReply.NetworkError.OperationCanceledError:
            return
        if error != QNetworkReply.NetworkError.NoError or status != 200:
            self.progress.setText(self.tr2("Address search unavailable", "Wyszukiwanie adresu niedostępne") + " · " + str(detail)[:180])
            return
        if len(raw) > 200000:
            self.progress.setText(self.tr2("Address results exceeded the size limit.", "Wyniki wyszukiwania przekroczyły limit wielkości."))
            return
        try:
            results = parse_geocoder_results(json.loads(raw.decode("utf-8")))
        except (ValueError, UnicodeDecodeError) as exc:
            self.progress.setText(self.tr2("Unable to read address results", "Nie można odczytać wyników wyszukiwania") + ": %s" % exc)
            return
        if key is not None:
            self._search_cache[key] = results
        if len(self._search_cache) > 40:
            self._search_cache.pop(next(iter(self._search_cache)))
        self._show_address_results(results, select_single=self._search_select_single)

    def _show_address_results(self, results, select_single=False):
        self.address_results.blockSignals(True)
        try:
            self.address_results.clear()
            self.address_results.addItem(self.tr2("Choose an address…", "Wybierz adres…"), None)
            for result in results:
                self.address_results.addItem(result["label"], result)
        finally:
            self.address_results.blockSignals(False)
        self.address_results.setVisible(bool(results))
        self._size_form()
        if results:
            self.progress.setText(self.tr2("Choose an address to see it on the map.", "Wybierz adres, aby pokazać go na mapie."))
            if select_single and len(results) == 1:
                self.address_results.setCurrentIndex(1)
        else:
            self.progress.setText(self.tr2("No matching address. Try adding the town or country.", "Brak adresu. Dodaj miejscowość lub kraj."))

    def _on_address_result_selected(self, index):
        if index <= 0:
            return
        result = self.address_results.itemData(index)
        if not isinstance(result, dict):
            return
        self._suggest_timer.stop()
        self._abort_address_search()
        canvas = self.iface.mapCanvas()
        wgs84 = QgsCoordinateReferenceSystem("EPSG:4326")
        try:
            place = QgsPointXY(result["lon"], result["lat"])
            place = QgsCoordinateTransform(
                wgs84, canvas.mapSettings().destinationCrs(), QgsProject.instance()
            ).transform(place)
            self.reset_report()
            self._geometry = self._geometry_crs = self.parcel = self.circle = None
            if self._site_band:
                self._site_band.hide()
            # Zoom to roughly street / neighborhood scale, not a guessed parcel.
            from qgis.core import QgsRectangle
            extent = QgsRectangle(result["lon"]-.003, result["lat"]-.002, result["lon"]+.003, result["lat"]+.002)
            canvas.setExtent(QgsCoordinateTransform(wgs84,canvas.mapSettings().destinationCrs(),QgsProject.instance()).transformBoundingBox(extent))
            canvas.refresh()
            if self._address_marker is not None:
                canvas.scene().removeItem(self._address_marker)
            self._address_marker = QgsVertexMarker(canvas)
            self._address_marker.setCenter(place)
            self._address_marker.setColor(QColor(20, 130, 175))
            self._address_marker.setIconSize(16)
            self._address_marker.setIconType(QgsVertexMarker.IconType.ICON_CROSS)
            country = result.get("country", "")
            idx = self.country.findData(country)
            self.country.setCurrentIndex(max(0, idx))
            if idx <= 0:
                self.options_button.setChecked(True)
            self.radius_button.setVisible(idx > 0)
            self._size_form()
            self.site_toggle.setChecked(True)
            self.site_status.setText(
                self.tr2("Address point", "Punkt adresowy") + " · " + result["label"]
            )
            self.progress.setText(
                self.tr2("Check the location, then pick a parcel or draw its boundary.", "Sprawdź lokalizację, a następnie wskaż działkę lub narysuj granicę.")
            )
            if result.get("address_level") and idx > 0:
                self.lookup_at(result)
        except Exception as exc:
            self.progress.setText(self.tr2("Unable to locate address", "Nie można ustalić lokalizacji") + " · " + str(exc))

    def _refresh_languages(self):
        country = self.country.currentData() or ""
        selected = preferred_language(country, self._explicit_language, self._system_language)
        # Rebuild list without converting automatic changes into user overrides.
        self.language.blockSignals(True)
        try:
            self.language.clear()
            for code, label in available_languages(country):
                self.language.addItem(label, code)
            idx = self.language.findData(selected)
            self.language.setCurrentIndex(idx if idx >= 0 else 0)
        finally:
            self.language.blockSignals(False)
        self._translate()

    def _on_country_changed(self, _index):
        self.reset_report()
        if self.parcel or self.circle:
            self._geometry = self._geometry_crs = self.circle = None
            if self._site_band:
                self._site_band.hide()
        self.parcel = None
        country = self.country.currentData() or ""
        if country:
            self._settings.setValue("GroundSurfQGIS/last_country", country)
        else:
            self._settings.remove("GroundSurfQGIS/last_country")
        self._refresh_languages()
        self._update_analyze_state()

    def _on_explicit_language(self, _index):
        code = self.language.currentData()
        if code:
            self.reset_report()
            self._translate()
            self._explicit_language = code
            self._settings.setValue("GroundSurfQGIS/language_preference", code)

    def _use_site_language(self):
        self.reset_report()
        self._explicit_language = ""
        self._settings.remove("GroundSurfQGIS/language_preference")
        self._refresh_languages()

    def _set_site(self, geometry, crs, description):
        self.reset_report()
        self.parcel = self.circle = None
        self.site_kind = "drawn"
        self._geometry = QgsGeometry(geometry)
        self._geometry_crs = crs
        self.site_status.setText(description)
        self.site_status.setToolTip(description)
        self.progress.setText(self.tr2("Site ready. Generate a report when the boundary looks right.","Obszar gotowy. Sprawdź granicę i wygeneruj raport."))
        self.open_button.setEnabled(False)
        self._current_report_url = ""
        self._draw_selected_site_outline()
        self.radius_button.hide()
        self._size_form()
        self._update_analyze_state()

    def _draw_selected_site_outline(self):
        """Keep chosen site visible after the drawing tool is deactivated."""
        canvas = self.iface.mapCanvas()
        if self._site_band is None:
            self._site_band = QgsRubberBand(canvas, POLYGON_GEOMETRY)
            self._site_band.setColor(QColor(36, 111, 69))
            self._site_band.setFillColor(QColor(36, 111, 69, 35))
            self._site_band.setWidth(3)
        try:
            preview = QgsGeometry(self._geometry)
            preview.transform(QgsCoordinateTransform(
                self._geometry_crs, canvas.mapSettings().destinationCrs(),
                QgsProject.instance()
            ))
            self._site_band.setToGeometry(preview, None)
            self._site_band.show()
        except Exception:
            self._site_band.reset(POLYGON_GEOMETRY)

    def use_selected_polygon(self):
        self._suggest_timer.stop()
        self._abort_address_search()
        layer = self.iface.activeLayer()
        if not isinstance(layer, QgsVectorLayer):
            self._notify("Choose a polygon vector layer in QGIS first.")
            return
        if layer.geometryType() != POLYGON_GEOMETRY:
            self._notify("The active layer must contain polygons.")
            return
        selection = layer.selectedFeatures()
        if len(selection) != 1:
            self._notify("Select exactly one polygon feature in the active layer.")
            return
        geometry = selection[0].geometry()
        if geometry is None or geometry.isNull() or geometry.isEmpty():
            self._notify("The selected geometry is empty.")
            return
        self._set_site(geometry, layer.crs(), "Selected polygon from '%s' (not certified as official)." % layer.name())

        self.site_kind = "imported"

    def start_drawing(self):
        self._suggest_timer.stop()
        self._abort_address_search()
        canvas = self.iface.mapCanvas()
        if self._draw_tool is None:
            self._draw_tool = PolygonDrawTool(canvas, self._finish_draw, self._cancel_draw)
        self._draw_tool.clear()
        if canvas.mapTool() is not self._draw_tool:
            self._previous_tool = canvas.mapTool()
        self.stop_services()
        self.cancel_analysis()
        canvas.setMapTool(self._draw_tool)
        self.site_status.setText(self.tr2("Click corners and double-click to finish. Esc cancels.","Klikaj narożniki. Zakończ dwuklikiem. Esc anuluje."))
        self.progress.setText(self.site_status.text())

    def _finish_draw(self, geometry, crs):
        self._restore_map_tool()
        if self._draw_tool:
            self._draw_tool.clear()
        self._set_site(geometry, crs, self.tr2("User-drawn site boundary","Granica narysowana przez użytkownika"))

    def _cancel_draw(self, reason="Drawing cancelled."):
        self._restore_map_tool()
        if self._draw_tool:
            self._draw_tool.clear()
        self.site_status.setText(reason)
        self.progress.setText("No change to previously selected site.")

    def _restore_map_tool(self):
        if self._previous_tool is None and self._draw_tool is not None and self.iface.mapCanvas().mapTool() is self._draw_tool:
            self.iface.mapCanvas().unsetMapTool(self._draw_tool)
        if self._previous_tool is not None:
            canvas = self.iface.mapCanvas()
            if canvas.mapTool() is self._draw_tool:
                canvas.setMapTool(self._previous_tool)
        self._previous_tool = None

    def _site_payload(self):
        if self._geometry is None:
            # QGIS users may select a feature using QGIS's native tools,
            # without clicking GroundSurf's dedicated selection button.
            layer = self.iface.activeLayer()
            if (isinstance(layer, QgsVectorLayer)
                    and layer.geometryType() == POLYGON_GEOMETRY
                    and layer.selectedFeatureCount() == 1):
                self.use_selected_polygon()
        if self._geometry is None or self._geometry_crs is None:
            raise ValueError("Select one polygon or draw a site first.")
        source = QgsGeometry(self._geometry)
        if QgsWkbTypes.geometryType(source.wkbType()) != POLYGON_GEOMETRY:
            raise ValueError("Only polygon sites are supported in this prototype.")
        if source.isMultipart():
            raise ValueError("Multi-part polygons are not supported. Select a single polygon.")
        if not source.isGeosValid():
            raise ValueError("Invalid polygon geometry. Repair it in QGIS before analysing.")
        parts = source.asPolygon()
        if len(parts) != 1:
            raise ValueError("Polygons with holes are not supported yet; refusing to misrepresent the site.")
        distance = QgsDistanceArea()
        distance.setSourceCrs(self._geometry_crs, QgsProject.instance().transformContext())
        distance.setEllipsoid("WGS84")
        area = distance.measureArea(source)
        if area <= 0:
            raise ValueError("Selected polygon has no measurable area.")
        transformed = QgsGeometry(source)
        transformed.transform(QgsCoordinateTransform(
            self._geometry_crs, QgsCoordinateReferenceSystem("EPSG:4326"), QgsProject.instance()
        ))
        ring = transformed.asPolygon()[0]
        points = [[p.y(), p.x()] for p in ring]
        country = self.country.currentData()
        language = self.language.currentData()
        payload = request_payload(points, area, country, language)
        if self.circle:
            import math
            payload["shape"] = dict(self.circle)
            payload["areaSize"] = round(math.pi*self.circle["radius"]**2)
        if self.parcel:
            payload["officialParcel"] = self.parcel
        return payload

    def analyze(self):
        if self._reply is not None:
            return
        try:
            payload = self._site_payload()
        except (ValueError, RuntimeError) as exc:
            if self._geometry is not None and not self.country.currentData():
                self.options_button.setChecked(True)
                self.country.setFocus()
                self.site_status.setText(self.tr2("Choose the site country.","Wybierz kraj lokalizacji."))
            self.site_toggle.setChecked(True)
            message = str(exc)
            if self.language.currentData()=="pl":
                message = {"Select the site country.":"Wybierz kraj lokalizacji.",
                           "Select one polygon or draw a site first.":"Zaznacz jeden poligon lub narysuj granicę.",
                           "Invalid polygon geometry. Repair it in QGIS before analysing.":"Popraw geometrię poligonu w QGIS.",
                           "Multi-part polygons are not supported. Select a single polygon.":"Wybierz pojedynczy poligon.",
                           "Polygons with holes are not supported yet; refusing to misrepresent the site.":"Wybierz poligon bez otworów."}.get(message,message)
            self._notify(message)
            return
        self.reset_report()
        self.analyze_button.setEnabled(False)
        self.cancel_button.setEnabled(True)
        self.cancel_button.show()
        self.site_toggle.show()
        self.report_text.show()
        self.empty_space.setStretch(self.empty_space.count() - 1, 0)
        self.site_toggle.setChecked(False)
        self._request_start = time.monotonic()
        self.progress.setText(self.tr2("Gathering evidence…","Pobieranie danych…"))
        self.report_text.setPlainText(self.progress.text())
        request = QNetworkRequest(QUrl(API_URL+"?progressStream=1"))
        request.setHeader(QNetworkRequest.KnownHeaders.ContentTypeHeader, "application/json; charset=utf-8")
        request.setRawHeader(b"Accept", b"text/event-stream")
        request.setRawHeader(b"User-Agent", USER_AGENT.encode("ascii"))
        request.setTransferTimeout(210000)
        self._timed_out = False
        self._cancelled = False
        self._stream_error = None
        self._submitted_shape = payload["shape"]
        self._submitted_kind = self.site_kind
        self._stream = AnalysisStream()
        try:
            self._reply = QgsNetworkAccessManager.instance().post(
                request, json.dumps(payload, ensure_ascii=False).encode("utf-8")
            )
            self._reply.readyRead.connect(self._read_progress)
            self._reply.finished.connect(self._on_reply_finished)
            self._timeout = QTimer(self.dock)
            self._timeout.setSingleShot(True)
            self._timeout.timeout.connect(self._abort_timeout)
            self._timeout.start(210000)
            self._elapsed_timer = QTimer(self.dock)
            self._elapsed_timer.setInterval(5000)
            self._elapsed_timer.timeout.connect(self._update_elapsed)
            self._elapsed_timer.start()
        except Exception as exc:
            self._reply = None
            self.analyze_button.setEnabled(True)
            self.cancel_button.setEnabled(False)
            self._failure(self.tr2("Unable to start request","Nie można rozpocząć zapytania")+" · "+str(exc))

    def _read_progress(self):
        reply = self._reply
        if not reply or not reply.isOpen():
            return
        try:
            self._stream.feed(bytes(reply.readAll()))
            self._update_elapsed()
            finding = self._stream.finding
            if (finding and finding.get("language") == self.language.currentData()
                    and finding.get("countryCode") == self.country.currentData()
                    and finding.get("status") == "VERIFIED" and isinstance(finding.get("text"),str)):
                self.report_text.setPlainText(finding["text"])
        except (ValueError, UnicodeError) as exc:
            self._stream_error = str(exc)
            reply.abort()

    def _update_elapsed(self):
        if self._reply is not None and self._request_start is not None:
            elapsed = int(time.monotonic() - self._request_start)
            self.progress.setText(self.tr2("Gathering evidence","Pobieranie danych")+" · %d s" % elapsed + " · " + str(self._stream.source or self._stream.stage or "…"))

    def cancel_analysis(self):
        if self._reply is not None:
            self._timed_out = False
            self._cancelled = True
            self._reply.abort()

    def _failure(self, message):
        self.report_text.show()
        self.empty_space.setStretch(self.empty_space.count() - 1, 0)
        self.cancel_button.hide()
        self.progress.setText(self.tr2("Report unavailable","Raport niedostępny") + " · " + VERSION + " · " + message)
        if self.language.currentData() == "pl":
            self.report_text.setPlainText("Raport nie został wygenerowany.\n\n"+message+"\n\nMożesz ponowić próbę dla tej samej lokalizacji.")
            return
        self.report_text.setPlainText(
            "GROUNDSURF REPORT NOT GENERATED\n\n" + message +
            "\n\nThe site is not confirmed safe or free of hazards. "
            "Check the selected polygon, country and your connection, then retry."
        )

    def _abort_timeout(self):
        self._timed_out = True
        if self._reply is not None:
            self._reply.abort()

    def _on_reply_finished(self):
        reply = self._reply
        if reply is None:
            return
        self._reply = None
        if self._timeout is not None:
            self._timeout.stop()
            self._timeout.deleteLater()
            self._timeout = None
        if self._elapsed_timer is not None:
            self._elapsed_timer.stop()
            self._elapsed_timer.deleteLater()
            self._elapsed_timer = None
        if self.dock is None:
            reply.deleteLater()
            return
        self.cancel_button.setEnabled(False)
        self.cancel_button.hide()
        self._update_analyze_state()
        raw = bytes(reply.readAll()) if reply.isOpen() else b""
        status = reply.attribute(QNetworkRequest.Attribute.HttpStatusCodeAttribute)
        network_error = reply.error()
        description = reply.errorString()
        reply.deleteLater()
        if self._stream_error:
            self._failure(self._stream_error)
            return
        if getattr(self, "_cancelled", False):
            self._failure(self.tr2("Request cancelled. Generate again to retry.","Anulowano. Kliknij Generuj, aby ponowić."))
            return
        if self._timed_out:
            self._failure(self.tr2("Request timed out. Retry for the same site.","Upłynął czas oczekiwania. Ponów próbę dla tego obszaru."))
            return
        if len(raw) > MAX_RESPONSE_BYTES:
            self._failure("Server response too large to display safely.")
            return
        if isinstance(status, int) and (status < 200 or status >= 300):
            try:
                error_body = json.loads(bytes(self._stream.pending) + raw)
            except (ValueError, UnicodeDecodeError):
                error_body = {}
            message = (error_body.get("error") or error_body.get("message")
                       if isinstance(error_body, dict) else None)
            self._failure("GroundSurf returned HTTP %s: %s" %
                          (status, str(message or description)[:300]))
            return
        if network_error != QNetworkReply.NetworkError.NoError:
            self._failure(self.tr2("Network error","Błąd sieci")+" · "+description)
            return
        try:
            self._stream.feed(raw)
            data = self._stream.finish()
        except (ValueError, UnicodeError) as exc:
            self._failure(self.tr2("Incomplete or unreadable response","Niekompletna lub nieczytelna odpowiedź") + " · HTTP %s · %s" % (status,exc))
            return
        try:
            # Match the web client's selected_boundary while preserving the server's
            # own boundary, official geometry, area, evidence and identity verbatim.
            data["selected_boundary"] = self._submitted_shape
            data["qgis_site_kind"] = self._submitted_kind
            self.display(data)
            self.remember(data)
            self.progress.setText(self.tr2("Report ready","Raport gotowy")+" · " + VERSION + " · HTTP %s · %s" % (status,data["id"]))
            self.request_interpretation()
        except ValueError as exc:
            self._failure(str(exc))

    def request_interpretation(self):
        report = self.report
        def done(data):
            parts = [x for x in (data.get("interpretation") or []) if isinstance(x,str) and x.strip()]
            if self.report is report and parts:
                self._interpretation = parts
                self.report_text.setPlainText(summary(report, compact=True, interpretation=parts))
                if self.reader:
                    self.reader.overview.setPlainText(summary(report, interpretation=parts))
        self.service("interpret","/api/ai/interpret",{"report":dict(report,__groundsurf_front_page_mode=True)},done,
                     lambda message: self.progress.setToolTip(message))

    def _notify(self, message):
        if self.dock is not None:
            self._failure(message)
        else:
            QMessageBox.warning(self.iface.mainWindow(), "GroundSurf", message)

