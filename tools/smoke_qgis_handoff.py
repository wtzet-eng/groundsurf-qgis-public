"""Standalone QGIS integration smoke: website link, map geometry and optional 3D plugin.

Runs entirely with local fixtures. No QGIS projects or real network services are used.
"""
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from qgis.core import QgsApplication, QgsCoordinateReferenceSystem, QgsGeometry, QgsProject
from groundsurf_qgis import actions
from groundsurf_qgis import plugin as plugin_module
from groundsurf_qgis.core import report_id_from_input
from smoke_qgis_ui import FakeIface, IsolatedSettings

plugin_module.QgsSettings = IsolatedSettings

REPORT_ID = "REP-DE-QA12345"
REPORT = {
    "id": REPORT_ID, "country_code": "DE", "language": "en",
    "selected_boundary": {
        "type": "polygon",
        "points": [[52,13],[52,13.001],[52.001,13.001],[52.001,13]],
    },
    "report_data": {"summary": "Screening only; local groundwater unknown.",
        "evidence_registry": [
            {"id": "good", "sourceName": "Public site register",
             "datasetDate": "2026-01-01",
             "geometry": {"type": "Point", "coordinates": [13.0002, 52.0003]},
             "spatialRelationship": "nearby", "claim": "Nearby observation"},
            {"id": "not-located", "sourceName": "Regional article",
             "spatialRelationship": "regional", "claim": "Without coordinates"},
        ]
    }
}


def run():
    app = QgsApplication([], False)
    app.initQgis()
    iface = FakeIface()
    owner = plugin_module.GroundSurfPlugin(iface)
    owner._create_panel()
    project = QgsProject.instance()
    count = lambda: len(project.mapLayers())
    original_input = actions.QInputDialog
    try:
        class Input:
            @staticmethod
            def getText(*args, **kwargs):
                return "https://groundsurf.net/report?report_id=" + REPORT_ID, True

        actions.QInputDialog = Input
        requests = []
        def fixture_service(key, path, payload, success, failure=None):
            requests.append((key,path))
            success(REPORT)
        owner.service = fixture_service
        owner.open_web_report()
        assert requests == [("open", "/api/reports/" + REPORT_ID)]
        assert owner.report and owner.report["id"] == REPORT_ID
        assert owner._geometry is not None

        start = count()
        owner.show_in_qgis()
        assert count() == start + 2, (count(),start)
        layer = project.mapLayer(owner._site_export_layer_id)
        assert layer is not None and layer.isValid()
        assert layer.featureCount() == 1
        assert layer.crs().authid() == "EPSG:4326"
        assert next(layer.getFeatures())["report_id"] == REPORT_ID
        assert layer.dataProvider().hasSpatialIndex(), "Site layer must be indexed"
        evidence = owner.evidence_layer()
        assert evidence is not None and evidence.featureCount() == 1, "Never invent a point for an unlocated report claim"

        owner.show_in_qgis()
        assert count() == start + 2, "Repeated map action must not add duplicate layers"

        class FakeParaView:
            def __init__(self):
                self.calls = 0
                self.visible_ids = []
            def send(self):
                self.calls += 1
                self.visible_ids = [item.id() for item in iface.canvas.mapSettings().layers()]

        import qgis.utils
        previous_pv = qgis.utils.plugins.get("view_to_paraview")
        fake = FakeParaView()
        qgis.utils.plugins["view_to_paraview"] = fake
        try:
            iface.canvas.setLayers([layer, evidence])
            owner.explore_3d()
            app.processEvents()
            assert fake.calls == 1
            assert layer.id() in fake.visible_ids, "ParaView must receive the site layer"
        finally:
            if previous_pv is None:
                qgis.utils.plugins.pop("view_to_paraview", None)
            else:
                qgis.utils.plugins["view_to_paraview"] = previous_pv

        class BadInput:
            @staticmethod
            def getText(*args, **kwargs):
                return "https://evil.invalid/report?report_id=" + REPORT_ID, True
        actions.QInputDialog = BadInput
        owner.open_web_report()
        assert len(requests) == 1, "Invalid link must never trigger a report request"
        assert report_id_from_input("http://groundsurf.net/report?report_id=" + REPORT_ID) == ""
        print("PASS: website report restored by canonical link; correct boundary; indexed QGIS layer; one geolocated evidence point; 3D handoff; invalid link rejected")
    finally:
        actions.QInputDialog = original_input
        owner.unload()
        project.clear()


if __name__ == "__main__":
    run()
