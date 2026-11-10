"""Run with a temporary QGIS profile. All network responses are local fixtures."""
import json
import sys
import threading
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
from smoke_qgis_network import FakeIface, FakeSettings, until
from qgis.core import QgsApplication,QgsCoordinateReferenceSystem,QgsGeometry
from groundsurf_qgis import actions,plugin as mod

REPORT = {"id":"REP-DE-QA123","language":"pl","country_code":"DE",
          "report_data":{"evidence_registry":[{"id":"doc-%d"%i,"sourceName":"Geologie","claim":"Dane regionalne","status":"MODELLED"} for i in range(24)]}}


class Server(BaseHTTPRequestHandler):
    mode = "ok"
    posts = 0
    def log_message(self,*args):
        pass

    def do_GET(self):
        self.respond(200,{"success":False,"reasonCode":"SOURCE_UNAVAILABLE"})

    def respond(self,status,obj):
        raw = obj if isinstance(obj,bytes) else json.dumps(obj).encode()
        self.send_response(status)
        self.send_header("Content-Length",str(len(raw)))
        self.end_headers()
        try:
            self.wfile.write(raw)
        except (BrokenPipeError,ConnectionResetError):
            pass

    def do_POST(self):
        self.rfile.read(int(self.headers["Content-Length"]))
        if self.path.startswith("/api/ai/"):
            self.respond(503,{"error":"AI unavailable"})
            return
        Server.posts+=1
        mode = Server.mode
        time.sleep(.65)
        if mode=="malformed":
            self.respond(200,b"event: result\ndata: broken\n\n")
        elif mode=="error":
            self.respond(503,{"error":"Provider unavailable"})
        else:
            self.respond(200,REPORT)


def main():
    app = QgsApplication([],False)
    app.initQgis()
    http = ThreadingHTTPServer(("127.0.0.1",0),Server)
    threading.Thread(target=http.serve_forever,daemon=True).start()
    actions.API_BASE = "http://127.0.0.1:%d"%http.server_port
    mod.API_URL = actions.API_BASE+"/api/analyze-site"
    mod.QgsSettings = FakeSettings
    plugin = mod.GroundSurfPlugin(FakeIface())
    plugin._create_panel()
    plugin.remember = lambda report: None
    try:
        plugin.country.setCurrentIndex(plugin.country.findData("DE"))
        plugin.language.setCurrentIndex(plugin.language.findData("pl"))
        plugin._on_explicit_language(plugin.language.currentIndex())
        crs = QgsCoordinateReferenceSystem("EPSG:4326")
        first = QgsGeometry.fromWkt("POLYGON((13 52,13.001 52,13.001 52.001,13 52))")
        second = QgsGeometry.fromWkt("POLYGON((14 52,14.001 52,14.001 52.001,14 52))")
        plugin._set_site(first,crs,"fixture A")
        plugin.analyze()
        plugin.analyze()
        until(lambda: Server.posts==1)
        plugin._set_site(second,crs,"fixture B")
        until(lambda: plugin._reply is None)
        assert plugin.report is None
        assert plugin._site_payload()["shape"]["points"][0]==[52,14]
        plugin.analyze()
        until(lambda: plugin._reply is None and not plugin.jobs)
        assert plugin.report["report_data"]==REPORT["report_data"] and "nieznany" in plugin.report_text.toPlainText()
        assert plugin.report["selected_boundary"]==plugin._site_payload()["shape"]
        plugin.open_report()
        assert plugin.reader.list.count()==24
        plugin.reader.search.setText("doc-23")
        assert plugin.reader.list.count()==1 and "doc-23" in plugin.reader.detail.toPlainText()
        plugin.lookup_at({"country":"DE","lat":52,"lon":14})
        until(lambda: not plugin.jobs)
        assert "SOURCE_UNAVAILABLE" in plugin.progress.text()
        for mode in ["malformed","error"]:
            Server.mode=mode
            plugin.analyze()
            until(lambda: plugin._reply is None)
            assert plugin.report is None and "Raport niedostępny" in plugin.progress.text()
            assert plugin._site_payload()["language"]=="pl"
        Server.mode="ok"
        plugin.analyze()
        plugin._abort_timeout()
        until(lambda: plugin._reply is None)
        assert "Ponów" in plugin.progress.text()
        plugin.analyze()
        plugin.unload()
        until(lambda: plugin._reply is None)
        print("PASS: duplicate click, site switch, Polish/German, 24 searchable records, AI down, empty groundwater, cadastral outage, malformed response, HTTP 503, timeout, retry, unload.")
    finally:
        if plugin.dock:
            plugin.unload()
        http.shutdown()
        http.server_close()


if __name__=="__main__":
    main()

