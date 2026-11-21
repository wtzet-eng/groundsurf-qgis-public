"""Native report reader. Source text is always rendered as plain text."""
import json

from qgis.PyQt.QtCore import Qt, QUrl
from qgis.PyQt.QtGui import QDesktopServices
from qgis.PyQt.QtWidgets import (QFileDialog, QDialog, QHBoxLayout, QLabel, QLineEdit,
    QListWidget, QListWidgetItem, QPlainTextEdit, QPushButton, QSplitter,
    QStackedWidget, QVBoxLayout, QWidget, QToolButton, QMenu)


from .presentation import STYLE, ReportText
from .geotech import GeotechPanel

def pretty(value):
    if isinstance(value, str):
        return value
    return json.dumps(value, ensure_ascii=False, indent=2)


def water_first(item):
    key = (str(item.get("category", "")) + " " + str(item.get("id", ""))).lower()
    return not any(word in key for word in ("groundwater", "hydrogeol", "piezom", "wody podziem"))


def records(report):
    entries = report["report_data"].get("evidence_registry")
    return sorted((x for x in (entries if isinstance(entries,list) else [])
                   if isinstance(x, dict)), key=water_first)


def summary(report, compact=False, interpretation=None):
    pl = report.get("language") == "pl"
    data = report["report_data"]
    items = records(report)
    lines = ["Wody podziemne" if pl else "Groundwater"]
    waters = [x for x in items if not water_first(x) and x.get("claim")]
    if waters:
        for item in waters[:1 if compact else 2]:
            v = item.get("value") or {}
            if pl and item.get("id")=="pl-pgi-groundwater-level" and isinstance(v,dict) and all(isinstance(v.get(k),(float,int)) for k in ("groundwaterDepthM","distanceKm")):
                lines.append(("PIG-PIB odnotował głębokość zwierciadła wody %.2f m p.p.t. w punkcie %s, około %.2f km od wybranego terenu (pomiar %s)." %
                              (v["groundwaterDepthM"], v.get("monitoringPoint") or "PIG-PIB",v["distanceKm"],v.get("measurementDate") or "—")).replace(".",",").replace("p,p,t,", "p.p.t.").rstrip(",")+".")
                lines.append("Głębokość na działce oraz zakres wahań sezonowych wymagają sprawdzenia.")
                continue
            if pl and item.get("status")=="REQUIRES_VERIFICATION":
                lines.append("Do sprawdzenia · "+str(item.get("sourceName") or item.get("id") or "wody podziemne"))
                continue
            lines.extend([item["claim"], str(item.get("sourceName") or ""), str(item.get("limitation") or "")])
    else:
        lines.append("Poziom wód podziemnych na działce pozostaje nieznany." if pl else "Groundwater depth at the site is unknown.")
    if interpretation:
        lines.append("Interpretacja terenu" if pl else "Site interpretation")
        lines.extend(interpretation[:2] if compact else interpretation)
    else:
        value = data.get("summary")
        if isinstance(value, dict):
            value = value.get("summary") or value.get("text") or value.get("interpretation")
        if isinstance(value, str):
            lines.extend(["Interpretacja terenu" if pl else "Site interpretation", value])
    checks = data.get("verification_checklist")
    if isinstance(checks,list) and checks:
        lines.append("Co jeszcze sprawdzić" if pl else "What still needs checking")
        for check in checks[:1] if compact else checks:
            if isinstance(check,dict):
                lines.append(" · ".join(str(check[k]) for k in ("topic","reason","recommendedAuthorityOrExpert") if check.get(k)))
            elif isinstance(check,str):
                lines.append(check)
    lines.append(("Dane źródłowe: %d. Otwórz pełny raport, aby przeszukać wszystkie źródła." if pl else
                  "%d evidence records. Open the full report to search every source.") % len(items))
    if not compact:
        lines.append(report["id"])
    return "\n\n".join(x for x in lines if x)


class ReportWindow(QDialog):
    def __init__(self, owner, report):
        super().__init__(owner.dock)
        self.owner = owner
        self.report = report
        self.items = records(report)
        t = owner.tr2
        self.setWindowTitle("GroundSurf · " + report["id"])
        self.setObjectName("groundsurfReader")
        self.setStyleSheet(STYLE)
        self.resize(1040, 740)
        screen = self.screen()
        if screen:
            available = screen.availableGeometry()
            self.resize(min(1040, available.width() - 50), min(740, available.height() - 60))
        layout = QVBoxLayout(self)
        layout.setContentsMargins(18, 16, 18, 16)
        layout.setSpacing(12)
        heading = QHBoxLayout()
        brand = QLabel("GroundSurf")
        brand.setObjectName("brand")
        heading.addWidget(brand, 1)
        rid = QLabel(report["id"])
        rid.setObjectName("hint")
        heading.addWidget(rid)
        layout.addLayout(heading)
        navigation = QHBoxLayout()
        self.overview_button = QPushButton(t("Interpretation", "Interpretacja"))
        self.evidence_button = QPushButton(t("Evidence", "Dane źródłowe") + " (%d)" % len(self.items))
        for button in (self.overview_button, self.evidence_button):
            button.setCheckable(True)
            navigation.addWidget(button)
        navigation.addStretch()
        more = QToolButton()
        more.setText(t("More detail", "Więcej szczegółów"))
        more.setPopupMode(QToolButton.ToolButtonPopupMode.InstantPopup)
        menu = QMenu(more)
        more.setMenu(menu)
        navigation.addWidget(more)
        layout.addLayout(navigation)
        self.page_title = QLabel()
        self.page_title.setWordWrap(True)
        self.page_title.setTextFormat(Qt.TextFormat.PlainText)
        layout.addWidget(self.page_title)
        self.tabs = QStackedWidget()
        layout.addWidget(self.tabs, 1)
        titles = []

        def page(widget, title, extra=False):
            index = self.tabs.addWidget(widget)
            titles.append(title)
            if extra:
                menu.addAction(title, lambda: self.tabs.setCurrentIndex(index))

        self.overview = ReportText(summary(report))
        page(self.overview, report.get("location_name") or t("Site interpretation", "Interpretacja terenu"))
        evidence = QWidget()
        form = QVBoxLayout(evidence)
        form.setContentsMargins(0, 0, 0, 0)
        self.search = QLineEdit()
        self.search.setClearButtonEnabled(True)
        self.search.setPlaceholderText(t("Search sources, findings or identifiers…", "Szukaj źródła, ustalenia lub identyfikatora…"))
        form.addWidget(self.search)
        split = QSplitter(Qt.Orientation.Horizontal)
        self.list = QListWidget()
        self.list.setWordWrap(True)
        self.list.setMinimumWidth(180)
        self.detail = ReportText()
        split.addWidget(self.list)
        split.addWidget(self.detail)
        split.setSizes([300, 630])
        split.setStretchFactor(1, 1)
        form.addWidget(split, 1)
        row = QHBoxLayout()
        self.match_count = QLabel()
        self.match_count.setObjectName("hint")
        row.addWidget(self.match_count, 1)
        self.source = QPushButton(t("Open source", "Otwórz źródło"))
        self.source.clicked.connect(self.open_source)
        row.addWidget(self.source)
        show_map = QPushButton(t("Show on map", "Pokaż na mapie"))
        show_map.clicked.connect(lambda: owner.map_evidence(self))
        row.addWidget(show_map)
        form.addLayout(row)
        page(evidence, t("Source evidence", "Dane źródłowe"))
        self.search.textChanged.connect(self.filter_items)
        self.list.currentItemChanged.connect(self.select)
        self.filter_items("")
        page(GeotechPanel(self.items, t), "GroundSurf Geotech", True)
        for label, key in [(t("Checks", "Co sprawdzić"), "verification_checklist"),
                           (t("History", "Historia"), "local_historical_leads"),
                           (t("Terrain", "Teren"), "technical_parameters")]:
            value = report["report_data"].get(key)
            if value:
                page(ReportText(pretty(value)), label, True)
        full = QPlainTextEdit(pretty(report))
        full.setReadOnly(True)
        page(full, t("Full record · JSON", "Pełny rekord · JSON"), True)
        research = QWidget()
        research_layout = QVBoxLayout(research)
        research_button = QPushButton(t("Find published studies", "Znajdź publikacje dotyczące okolicy"))
        self.research_text = ReportText()
        research_layout.addWidget(research_button)
        research_layout.addWidget(self.research_text, 1)
        research_button.clicked.connect(self.find_studies)
        page(research, t("Research", "Publikacje"), True)

        def page_changed(index):
            self.overview_button.setChecked(index == 0)
            self.evidence_button.setChecked(index == 1)
            self.page_title.setText(titles[index])
        self.tabs.currentChanged.connect(page_changed)
        self.overview_button.clicked.connect(lambda: self.tabs.setCurrentIndex(0))
        self.evidence_button.clicked.connect(lambda: self.tabs.setCurrentIndex(1))
        page_changed(0)
        self.question = QLineEdit()
        self.question.setClearButtonEnabled(True)
        self.question.setPlaceholderText(t("Ask about this site…", "Zapytaj o tę lokalizację…"))
        row = QHBoxLayout()
        row.addWidget(self.question, 1)
        ask = QPushButton(t("Ask", "Zapytaj"))
        ask.clicked.connect(self.ask)
        self.question.returnPressed.connect(self.ask)
        row.addWidget(ask)
        layout.addLayout(row)
        self.answer = ReportText()
        self.answer.setMaximumHeight(160)
        self.answer.hide()
        layout.addWidget(self.answer)
        row = QHBoxLayout()
        exports = QToolButton()
        exports.setText(t("Save / export", "Zapisz / eksportuj"))
        exports.setPopupMode(QToolButton.ToolButtonPopupMode.InstantPopup)
        export_menu = QMenu(exports)
        exports.setMenu(export_menu)
        for title, action in [(t("Full report · JSON", "Pełny raport · JSON"), owner.save_record),
                              (t("Evidence manifest", "Manifest danych"), lambda: owner.save_record(manifest=True)),
                              ("PDF", self.export_pdf), (t("Embed", "Osadź"), lambda: owner.share(embed=True))]:
            export_menu.addAction(title, action)
        row.addWidget(exports)
        share = QPushButton(t("Copy share link", "Kopiuj link udostępniania"))
        share.clicked.connect(owner.share)
        row.addWidget(share)
        row.addStretch()
        close = QPushButton(t("Back to map", "Wróć do mapy"))
        close.clicked.connect(self.hide)
        row.addWidget(close)
        layout.addLayout(row)
        # Enter in search/question fields must not activate a navigation button.
        for button in self.findChildren(QPushButton):
            button.setAutoDefault(False)
            button.setDefault(False)

    def find_studies(self):
        from urllib.parse import urlencode
        report = self.report
        if any(report.get(key) is None for key in ("latitude","longitude","country_code")):
            return
        params = {"country":report["country_code"],"lat":report["latitude"],"lng":report["longitude"]}
        self.research_text.setPlainText(self.owner.tr2("Looking up publications…","Wyszukiwanie publikacji…"))
        def complete(data):
            note = self.owner.tr2("Regional references. Check study boundaries and relevance.","Materiały regionalne. Sprawdź granice badań i ich związek z lokalizacją.")
            self.research_text.setPlainText(note+"\n\n"+pretty(data.get("items") or []))
        self.owner.service("research","/api/research/discover?"+urlencode(params),None,complete,self.research_text.setPlainText)

    def export_pdf(self):
        from qgis.PyQt.QtGui import QTextDocument
        from qgis.PyQt.QtPrintSupport import QPrinter
        path,_ = QFileDialog.getSaveFileName(self,"GroundSurf PDF",self.report["id"]+".pdf","PDF (*.pdf)")
        if path:
            printer = QPrinter(QPrinter.PrinterMode.HighResolution)
            printer.setOutputFormat(QPrinter.OutputFormat.PdfFormat)
            printer.setOutputFileName(path)
            doc = QTextDocument()
            parts = [self.overview.toPlainText()]
            for item in self.items:
                parts.append("\n".join(str(item[k]) for k in ("id","category","claim","sourceName","datasetDate","sourceUrl","spatialRelationship","calculationMethod","limitation") if item.get(k)))
            doc.setPlainText("\n\n".join(parts))
            doc.print(printer)

    def ask(self):
        question = self.question.text().strip()
        if not question:
            return
        self.answer.show()
        self.answer.setPlainText(self.owner.tr2("Requesting answer…","Pobieranie odpowiedzi…"))
        def complete(data):
            self.answer.setPlainText(str(data.get("answer") or self.owner.tr2("No answer returned.","Brak odpowiedzi.")) +
                                    "\n" + "\n".join(map(str,data.get("unknowns") or [])))
        self.owner.service("ask","/api/ai/ask",{"report":self.report,"question":question,
                           "language":self.owner.language.currentData()},complete,self.answer.setPlainText)

    def filter_items(self, query):
        self.list.clear()
        for idx, record in enumerate(self.items):
            if query.casefold() in pretty(record).casefold():
                title = str(record.get("sourceName") or record.get("id") or "—")
                category = str(record.get("category") or "")
                item = QListWidgetItem(title + ("\n" + category if category else ""))
                item.setToolTip(str(record.get("id") or ""))
                item.setData(Qt.ItemDataRole.UserRole, idx)
                self.list.addItem(item)
        self.match_count.setText("%d / %d" % (self.list.count(), len(self.items)))
        self.list.setCurrentRow(0)

    def select(self, item, old=None):
        record = self.items[item.data(Qt.ItemDataRole.UserRole)] if item else {}
        t = self.owner.tr2
        body = []
        for k,label in [("claim",t("Finding","Ustalenie")),("status",t("Assessment","Status")),("sourceName",t("Source","Źródło")),("datasetDate",t("Date","Data")),("spatialRelationship",t("Location","Lokalizacja")),("calculationMethod",t("Method","Metoda")),("limitation",t("Limitation","Ograniczenie")),("value",t("Source values","Wartości źródłowe")),("id","ID")]:
            if record.get(k) is not None:
                body.append(label+"\n"+pretty(record[k]))
        self.detail.setPlainText("\n\n".join(body))
        self.url = QUrl(str(record.get("sourceUrl") or ""))
        self.source.setEnabled(self.url.scheme() in ("http","https") and bool(self.url.host()))
        if item:
            self.owner.highlight_record(item.data(Qt.ItemDataRole.UserRole))

    def open_source(self):
        if self.source.isEnabled():
            QDesktopServices.openUrl(self.url)

