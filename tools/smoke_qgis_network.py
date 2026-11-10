"""Headless end-to-end PyQGIS smoke test, local fake HTTP only.

Exercises Photon-style search, QGIS map zoom, polygon payload, asynchronous
POST, result rendering, and report link. No production requests or secrets.
"""
import json
import sys
import threading
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
from qgis.core import (
    QgsApplication, QgsCoordinateReferenceSystem, QgsGeometry, QgsPointXY,
)
from qgis.PyQt.QtCore import QEventLoop, QTimer
from qgis.PyQt.QtWidgets import QMainWindow
from qgis.gui import QgsMapCanvas
from groundsurf_qgis import plugin as module


class FakeSettings:
    store = {}
    def value(self, key, fallback=None):
        return self.store.get(key, fallback)
    def setValue(self, key, value):
        self.store[key] = value
    def remove(self, key):
        self.store.pop(key, None)


class FakeIface:
    def __init__(self):
        self.win = QMainWindow()
        self.canvas = QgsMapCanvas(self.win)
        self.canvas.setDestinationCrs(QgsCoordinateReferenceSystem("EPSG:4326"))
    def mainWindow(self):
        return self.win
    def addDockWidget(self, area, dock):
        self.win.addDockWidget(area, dock)
    def removeDockWidget(self, dock):
        self.win.removeDockWidget(dock)
    def mapCanvas(self):
        return self.canvas


class FakeService(BaseHTTPRequestHandler):
    payload = None
    def log_message(self, *_args):
        pass
    def do_GET(self):
        data = {"features": [{
            "type": "Feature", "geometry": {"type": "Point", "coordinates": [19.93711, 50.06149]},
            "properties": {"name": "Rynek Główny", "city": "Kraków",
                           "country": "Polska", "countrycode": "PL"}
        }]}
        self._send(data)
    def do_POST(self):
        raw = self.rfile.read(int(self.headers["Content-Length"]))
        if self.path == "/api/ai/interpret":
            self._send({"interpretation":[]})
            return
        FakeService.payload = json.loads(raw.decode("utf-8"))
        self._send({
            "id": "REP-PL-SMOKE123",
            "country_code": "PL",
            "language": "pl",
            "location_name": "Kraków",
            "report_data": {
                "summary": "Testowy raport geologiczny.",
                "evidence_registry": [{
                    "category": "groundwater", "status": "REQUIRES_VERIFICATION",
                    "claim": "Poziom wody gruntowej nie jest potwierdzony."
                }]
            }
        })
    def _send(self, data):
        body = json.dumps(data, ensure_ascii=False).encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)


def until(condition, seconds=9):
    loop = QEventLoop()
    ticker = QTimer()
    ticker.setInterval(50)
    ticker.timeout.connect(lambda: loop.quit() if condition() else None)
    timer = QTimer()
    timer.setSingleShot(True)
    timer.timeout.connect(loop.quit)
    ticker.start()
    timer.start(int(seconds * 1000))
    loop.exec_()
    ticker.stop()
    timer.stop()
    assert condition(), "Timed out waiting for QGIS network request to finish"


def main():
    module.QgsSettings = FakeSettings
    app = QgsApplication([], False)
    app.initQgis()
    server = ThreadingHTTPServer(("127.0.0.1", 0), FakeService)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    base = "http://127.0.0.1:%d" % server.server_port
    # Substitute only the URL for tests; the public geocoder always requires HTTPS.
    module.API_URL = base + "/api/analyze-site"
    module.geocoder_search_url = lambda query, endpoint: base + "/api?q=test"
    from groundsurf_qgis import actions
    actions.API_BASE = base
    iface = FakeIface()
    previous_timeout = module.QgsNetworkAccessManager.instance().timeout()
    plugin = module.GroundSurfPlugin(iface)
    try:
        plugin._create_panel()
        plugin.remember = lambda report: None
        plugin.address_input.setText("Rynek Główny, Kraków")
        plugin.search_address()
        until(lambda: plugin._search_reply is None)
        assert plugin.address_results.count() == 2
        plugin.address_results.setCurrentIndex(1)
        assert plugin.country.currentData() == "PL"
        assert plugin.language.currentData() == "pl"
        assert plugin._address_marker is not None

        polygon = QgsGeometry.fromPolygonXY([[
            QgsPointXY(19.937, 50.061), QgsPointXY(19.938, 50.061),
            QgsPointXY(19.938, 50.062), QgsPointXY(19.937, 50.061),
        ]])
        plugin._set_site(polygon, QgsCoordinateReferenceSystem("EPSG:4326"), "Drawn site")
        plugin.analyze()
        until(lambda: plugin._reply is None)
        assert plugin.progress.text().startswith("Raport gotowy"), plugin.progress.text()
        assert plugin.open_button.isEnabled()
        assert module.QgsNetworkAccessManager.instance().timeout() == previous_timeout
        assert "Testowy raport geologiczny." in plugin.report_text.toPlainText()
        assert "REQUIRES_VERIFICATION" in plugin.report_text.toPlainText()
        assert FakeService.payload["countryCode"] == "PL"
        assert FakeService.payload["language"] == "pl"
        assert FakeService.payload["areaSize"] > 0
        print("PASS: address lookup -> map -> local country -> polygon -> async report -> full-report link")
    finally:
        plugin.unload()
        server.shutdown()
        server.server_close()


if __name__ == "__main__":
    main()
