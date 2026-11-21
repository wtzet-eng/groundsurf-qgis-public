"""End-to-end offline GroundSurf -> QGIS -> real ParaView exporter smoke test."""
from pathlib import Path
import json
import os
import stat
import sys
import tempfile
import time

ROOT = Path(__file__).resolve().parents[1]
VIEW_ROOT = Path('/home/toma/current-view-to-paraview')
sys.path[0:0] = [str(ROOT), str(VIEW_ROOT)]

from qgis.PyQt.QtGui import QAction
from qgis.core import QgsApplication, QgsProject, QgsRectangle
from smoke_qgis_ui import FakeIface, IsolatedSettings
from groundsurf_qgis import plugin as gs_module
from view_to_paraview.plugin import ViewPlugin, KEY

gs_module.QgsSettings = IsolatedSettings


class MessageBar:
    def __init__(self):
        self.warnings = []
        self.messages = []

    def pushWarning(self, title, msg):
        self.warnings.append((title, msg))

    def pushInfo(self, title, msg):
        self.messages.append((title, msg))


class Iface(FakeIface):
    def __init__(self):
        super().__init__()
        self.messages = MessageBar()
        self.canvas.resize(800, 600)
        self.canvas.setExtent(QgsRectangle(12.99, 51.99, 13.02, 52.02))
        self.canvas.refresh()

    def messageBar(self):
        return self.messages


def run():
    app = QgsApplication([], False)
    app.initQgis()
    iface = Iface()
    owner = gs_module.GroundSurfPlugin(iface)
    owner._create_panel()
    report = {
        "id": "REP-DE-QA12345", "country_code": "DE", "language": "en",
        "selected_boundary": {
            "type": "polygon",
            "points": [[52, 13], [52, 13.001], [52.001, 13.001], [52.001, 13]]
        },
        "report_data": {
            "evidence_registry": [
                {"id": "sample", "sourceName": "Test station",
                 "geometry": {"type": "Point", "coordinates": [13.0002, 52.0003]},
                 "value": {"measurementDate": "2026-01-01"}}
            ],
            "summary": "Synthetic screening fixture"
        }
    }
    result = Path(tempfile.mkdtemp(prefix='groundsurf-paraview-'))
    launched = result / 'launch-marker'
    fake_exe = result / 'fake-paraview'
    fake_exe.write_text("#!/bin/sh\nprintf '%s\\n' \"$QGIS_PARAVIEW_SNAPSHOT\" > " + str(launched) + "\n")
    fake_exe.chmod(stat.S_IRWXU)
    pv = ViewPlugin(iface)
    pv.actions = [QAction('3D', iface.mainWindow()), QAction('Browser', iface.mainWindow())]
    pv.settings = IsolatedSettings()
    pv.settings.setValue(KEY + 'folder', str(result/'scenes'))
    pv.settings.setValue(KEY + 'exe', str(fake_exe))
    import qgis.utils
    previous = qgis.utils.plugins.get('view_to_paraview')
    qgis.utils.plugins['view_to_paraview'] = pv
    try:
        owner.restore_record(report)
        owner.show_in_qgis()
        layers = [
            QgsProject.instance().mapLayer(owner._site_export_layer_id),
            owner.evidence_layer()
        ]
        assert all(layers) and all(layer.isValid() for layer in layers)
        iface.canvas.setLayers(layers)
        iface.canvas.refresh()
        app.processEvents()
        owner.explore_3d()
        deadline = time.monotonic() + 65
        while time.monotonic() < deadline and (not pv.last_scene or not launched.exists()):
            app.processEvents()
            time.sleep(0.08)
        assert pv.last_scene, ('Scene missing', iface.messages.warnings)
        assert launched.exists(), ('ParaView launcher not called', iface.messages.warnings)
        scene = Path(pv.last_scene)
        assert scene.exists() and scene.read_text().startswith('<?xml'), scene
        marker = launched.read_text().strip()
        assert marker == str(scene), (marker,scene)
        audit = json.loads((scene.parent/'snapshot.json').read_text())
        names = [x.get('name') for x in audit['layers']]
        assert len(names) >= 2 and any('site boundary' in x for x in names), names
        assert any('GroundSurf' in x and 'boundary' not in x for x in names), names
        assert not iface.messages.warnings, iface.messages.warnings
        print('PASS real QGIS -> ParaView snapshot:', scene)
        print('Exported layers:', names)
        print('Launch environment points to:', marker)
    finally:
        if pv.task: pv.task.cancel()
        if previous is None:
            qgis.utils.plugins.pop('view_to_paraview', None)
        else:
            qgis.utils.plugins['view_to_paraview'] = previous
        owner.unload()
        QgsProject.instance().clear()


if __name__ == '__main__':
    run()
