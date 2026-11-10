"""Inspect a local report in isolated PyQGIS. Optional live checks only when requested."""
import argparse
import json
import os
import sys
from pathlib import Path
from tempfile import TemporaryDirectory
from unittest.mock import patch

sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
from smoke_qgis_network import FakeIface, FakeSettings, until
from qgis.PyQt.QtWidgets import QApplication
from qgis.core import QgsApplication,QgsProject
from groundsurf_qgis import plugin as mod
from groundsurf_qgis.manifest import evidence_manifest


def check(report, root, live):
    mod.QgsSettings = FakeSettings
    p = mod.GroundSurfPlugin(FakeIface())
    p._create_panel()
    try:
        p.restore_record(report)
        assert p.reader.list.count()==len(report["report_data"]["evidence_registry"])
        with patch("groundsurf_qgis.report_view.QFileDialog.getSaveFileName",return_value=(str(root/"site.pdf"),"")):
            p.reader.export_pdf()
        assert (root/"site.pdf").read_bytes().startswith(b"%PDF")
        with patch("groundsurf_qgis.actions.QFileDialog.getSaveFileName",return_value=(str(root/"site.json"),"")):
            p.save_record()
        assert json.loads((root/"site.json").read_text())==report
        with patch("groundsurf_qgis.actions.QFileDialog.getOpenFileName",return_value=(str(root/"site.json"),"")):
            p.load_record()
        assert p.report==report
        m=evidence_manifest(report,"pl","2026-11-09T00:00:00Z")
        assert len(m["evidence"])==p.reader.list.count()
        if os.environ.get("GROUNDSURF_QA_MANIFEST"):
            Path(os.environ["GROUNDSURF_QA_MANIFEST"]).write_text(json.dumps(m))
        def share_fixture(key,path,body,done):
            assert path=="/api/reports/"+report["id"]+"/share"
            done({"id":report["id"],"shareable":True})
        with patch.object(p,"service",side_effect=share_fixture):
            p.share()
            assert QApplication.clipboard().text().endswith(report["id"])
            p.share(embed=True)
            assert "&amp;embed=true" in QApplication.clipboard().text()
        if live:
            p.country.setCurrentIndex(p.country.findData("PL"))
            p.lookup_at({"lat":50.0615,"lon":19.9371,"country":"PL"})
            until(lambda:not p.jobs,30)
            assert p.parcel and p._site_payload()["officialParcel"]==p.parcel,p.progress.text()
            print("Polish parcel:",p.parcel["parcelId"])
            for name in ("Topografia · GUGiK","Działki · GUGiK","SMGP 1:50 000 · PIG-PIB"):
                with patch("groundsurf_qgis.actions.QInputDialog.getItem",return_value=(name,True)):
                    p.add_overlay()
                matches = QgsProject.instance().mapLayersByName(name)
                assert matches and matches[0].isValid(),name
                print("QGIS provider valid:",name)
        print("PASS: native reader, JSON save/open, PDF, manifest, share confirmation and embed clipboard.")
    finally:
        p.unload()


if __name__=="__main__":
    parser=argparse.ArgumentParser()
    parser.add_argument("report",type=Path)
    parser.add_argument("--live",action="store_true")
    args=parser.parse_args()
    app=QgsApplication([],False)
    app.initQgis()
    with TemporaryDirectory() as temp:
        check(json.loads(args.report.read_text()),Path(temp),args.live)

