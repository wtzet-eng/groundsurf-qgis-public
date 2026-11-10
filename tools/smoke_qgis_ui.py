"""Headless PyQGIS smoke test for locale dropdown; no map/data requests."""
from pathlib import Path
import sys
from tempfile import TemporaryDirectory

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from qgis.core import QgsApplication, QgsGeometry, QgsPointXY, QgsCoordinateReferenceSystem
from qgis.PyQt.QtWidgets import QMainWindow
from qgis.gui import QgsMapCanvas

from groundsurf_qgis import plugin as plugin_module
from groundsurf_qgis.plugin import GroundSurfPlugin


class IsolatedSettings:
    """Never modify the user's actual QGIS profile during automated tests."""
    data = {}

    def value(self, key, fallback=None):
        return self.data.get(key, fallback)

    def setValue(self, key, value):
        self.data[key] = value

    def remove(self, key):
        self.data.pop(key, None)


plugin_module.QgsSettings = IsolatedSettings


class FakeIface:
    def __init__(self):
        self.window = QMainWindow()
        self.canvas = QgsMapCanvas(self.window)
        self.canvas.setDestinationCrs(QgsCoordinateReferenceSystem("EPSG:4326"))

    def mapCanvas(self):
        return self.canvas

    def mainWindow(self):
        return self.window

    def addDockWidget(self, area, dock):
        self.window.addDockWidget(area, dock)

    def removeDockWidget(self, dock):
        self.window.removeDockWidget(dock)


def verify():
    app = QgsApplication([], False)
    app.initQgis()
    iface = FakeIface()
    plugin = GroundSurfPlugin(iface)
    plugin._create_panel()
    try:
        pl_idx = plugin.country.findData("PL")
        assert pl_idx >= 0
        plugin.country.setCurrentIndex(pl_idx)
        assert plugin.analyze_button.text() == "Generuj raport GroundSurf"
        assert plugin.analyze_button.isEnabled(), "Primary action must be visible and clickable"
        assert plugin.language.itemData(0) == "pl", "Polski must be first"
        assert plugin.language.itemData(1) == "en", "English should be second"
        assert plugin.language.currentData() == "pl", "Polish site defaults to Polish"

        en_idx = plugin.language.findData("en")
        plugin.language.setCurrentIndex(en_idx)
        plugin._on_explicit_language(en_idx)
        assert plugin._explicit_language == "en"

        plugin.country.setCurrentIndex(plugin.country.findData("DE"))
        assert plugin.language.itemData(0) == "de"
        assert plugin.language.currentData() == "en", "User explicit language must be preserved"

        plugin._use_site_language()
        assert plugin.language.currentData() == "de"
        plugin.country.setCurrentIndex(pl_idx)
        assert plugin.language.currentData() == "pl"

        # Mock a cached Photon result; no requests to a public geocoding service.
        plugin._show_address_results([{
            "lat": 50.06149, "lon": 19.93711,
            "country": "PL", "label": "Rynek Główny, Kraków, Polska"
        }])
        assert plugin.address_results.count() == 2
        plugin.address_results.setCurrentIndex(1)
        assert plugin.country.currentData() == "PL"
        assert "Rynek Główny" in plugin.site_status.text()
        assert plugin._address_marker is not None

        polygon = QgsGeometry.fromPolygonXY([[
            QgsPointXY(19.937, 50.061),
            QgsPointXY(19.938, 50.061),
            QgsPointXY(19.938, 50.062),
            QgsPointXY(19.937, 50.061),
        ]])
        plugin._set_site(polygon, QgsCoordinateReferenceSystem("EPSG:4326"), "Drawn site")
        payload = plugin._site_payload()
        assert payload["countryCode"] == "PL"
        assert payload["areaSize"] > 0
        assert len(payload["shape"]["points"]) == 3
        assert plugin.analyze_button.isEnabled()

        plugin.language.setCurrentIndex(plugin.language.findData("de"))
        plugin._on_explicit_language(plugin.language.currentIndex())
        plugin.dock.close()
        plugin.unload()
        plugin = GroundSurfPlugin(iface)
        plugin._create_panel()
        assert plugin.country.currentData() == "PL"
        assert plugin.language.currentData() == "de", "Manual language choice must persist"
        print("PASS: Polish first; country-driven defaults; explicit override and persistence; reset")
    finally:
        plugin.unload()
        # Deliberately do not call exitQgis() while Qt objects remain alive.
    return 0


if __name__ == "__main__":
    raise SystemExit(verify())
