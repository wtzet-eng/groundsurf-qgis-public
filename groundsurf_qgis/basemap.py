"""On-demand XYZ basemap using QGIS networking, rendering and tile cache."""
from qgis.PyQt.QtCore import QEvent, QUrl
from qgis.PyQt.QtGui import QDesktopServices
from qgis.PyQt.QtWidgets import QLabel
from qgis.core import (
    QgsCoordinateReferenceSystem, QgsCoordinateTransform, QgsDataSourceUri,
    QgsProject, QgsRasterLayer, QgsRectangle,
)
from .version import USER_AGENT

OSM_URL = "https://tile.openstreetmap.org/{z}/{x}/{y}.png"
OSM_CREDIT = "© OpenStreetMap contributors"


class MapAttribution(QLabel):
    """Canvas-owned credits survive dock closure and plugin unload."""

    def __init__(self, canvas):
        super().__init__(canvas)
        self.canvas = canvas
        self.setObjectName("groundsurfMapAttribution")
        self.setText('<a style="color:#153e24" href="https://www.openstreetmap.org/copyright">' + OSM_CREDIT + '</a>')
        self.setStyleSheet("background:rgba(255,255,255,235); padding:4px 7px; border-radius:3px; font-size:11px")
        self.setOpenExternalLinks(False)
        self.linkActivated.connect(lambda url: QDesktopServices.openUrl(QUrl(url)))
        canvas.installEventFilter(self)
        canvas.layersChanged.connect(self.update_visibility)
        self.adjustSize()
        self.update_visibility()

    def eventFilter(self, obj, event):
        if event.type() == QEvent.Type.Resize:
            self.move(max(0, self.canvas.width() - self.width() - 10), max(0, self.canvas.height() - self.height() - 10))
        return False

    def update_visibility(self):
        self.setVisible(any(is_osm(layer) for layer in self.canvas.layers()))
        self.move(max(0, self.canvas.width() - self.width() - 10), max(0, self.canvas.height() - self.height() - 10))
        self.raise_()


def is_osm(layer):
    if layer.customProperty("GroundSurf/basemap", "") == "osm":
        return True
    return layer.providerType() == "wms" and "tile.openstreetmap.org" in layer.source()


class Basemap:
    def __init__(self, iface, settings, on_error=None):
        self.iface = iface
        self.settings = settings
        self.on_error = on_error
        self.project = QgsProject.instance()
        canvas = iface.mapCanvas()
        self.credit = canvas.findChild(QLabel, "groundsurfMapAttribution") or MapAttribution(canvas)
        self.listening = False
        self.canvas_listening = False

    def start(self):
        if not self.canvas_listening:
            self.iface.mapCanvas().renderErrorOccurred.connect(self._render_error)
            self.canvas_listening = True
        if not self.listening and hasattr(self.iface, "newProjectCreated"):
            self.iface.newProjectCreated.connect(self.empty_project)
            self.listening = True
        self.empty_project()

    def _render_error(self, message, layer):
        if layer is not None and is_osm(layer) and self.on_error:
            self.on_error()

    def empty_project(self):
        automatic = self.settings.value("GroundSurfQGIS/auto_map", True)
        if automatic not in (False, "false", "0") and not self.project.mapLayers():
            self.add()

    def add(self):
        for layer in self.project.mapLayers().values():
            if is_osm(layer):
                node = self.project.layerTreeRoot().findLayer(layer.id())
                if node:
                    node.setItemVisibilityChecked(True)
                return layer
        was_empty = not self.project.mapLayers()
        endpoint = str(self.settings.value("GroundSurfQGIS/osm_tiles", OSM_URL) or OSM_URL)
        if not endpoint.startswith("https://") or not all(token in endpoint for token in ("{x}", "{y}", "{z}")):
            raise ValueError("Use an HTTPS XYZ tile URL containing {z}, {x} and {y}.")
        uri = QgsDataSourceUri()
        for key, value in {
            "type": "xyz", "url": endpoint, "zmin": "0", "zmax": "19",
            "http-header:User-Agent": USER_AGENT,
        }.items():
            uri.setParam(key, value)
        layer = QgsRasterLayer(bytes(uri.encodedUri()).decode(), "OpenStreetMap · " + OSM_CREDIT, "wms")
        if not layer.isValid():
            raise ValueError("OpenStreetMap could not be added. Check the map connection settings.")
        layer.setCustomProperty("GroundSurf/basemap", "osm")
        layer.setAttribution(OSM_CREDIT)
        layer.setAttributionUrl("https://www.openstreetmap.org/copyright")
        metadata = layer.metadata()
        metadata.setRights([OSM_CREDIT, "https://www.openstreetmap.org/copyright"])
        layer.setMetadata(metadata)
        self.project.addMapLayer(layer, False)
        root = self.project.layerTreeRoot()
        group = root.findGroup("GroundSurf · Basemap") or root.addGroup("GroundSurf · Basemap")
        group.addLayer(layer)
        if root.hasCustomLayerOrder():
            root.setCustomLayerOrder([item for item in root.customLayerOrder() if item != layer] + [layer])
        if was_empty:
            crs = QgsCoordinateReferenceSystem("EPSG:3857")
            self.project.setCrs(crs)
            canvas = self.iface.mapCanvas()
            canvas.setDestinationCrs(crs)
            transform = QgsCoordinateTransform(QgsCoordinateReferenceSystem("EPSG:4326"), crs, self.project)
            canvas.setExtent(transform.transformBoundingBox(QgsRectangle(-180, -65, 180, 80)))
        self.iface.mapCanvas().refresh()
        return layer

    def close(self):
        if self.canvas_listening:
            self.iface.mapCanvas().renderErrorOccurred.disconnect(self._render_error)
            self.canvas_listening = False
        if self.listening:
            self.iface.newProjectCreated.disconnect(self.empty_project)
            self.listening = False
