"""Run native workflow checks against the actual ZIP in an isolated import path."""
import argparse
import configparser
import os
from pathlib import Path
import subprocess
import sys
import tempfile
from zipfile import ZipFile

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser()
parser.add_argument('package', type=Path)
parser.add_argument('--qgis-python', default='/usr/bin/python3')
args = parser.parse_args()
with tempfile.TemporaryDirectory(prefix='groundsurf-package-') as temp:
    folder = Path(temp)
    with ZipFile(args.package) as archive:
        assert archive.testzip() is None
        names = archive.namelist()
        assert all(name.startswith('groundsurf_qgis/') and '..' not in Path(name).parts for name in names)
        assert 'groundsurf_qgis/LICENSE' in names
        for name in names:
            assert archive.read(name) == (ROOT/name).read_bytes(), name
        archive.extractall(folder)
    metadata = configparser.ConfigParser()
    metadata.read(folder/'groundsurf_qgis/metadata.txt')
    env = dict(os.environ, QT_QPA_PLATFORM='offscreen', PYTHONPATH=str(folder))
    version_check = 'import groundsurf_qgis; from groundsurf_qgis.version import VERSION; assert VERSION == ' + repr(metadata['general']['version'])
    subprocess.run([args.qgis_python, '-c', version_check], cwd=temp, env=env, check=True)
    for name in ('smoke_qgis_ui.py', 'smoke_qgis_network.py', 'smoke_report_lifecycle.py', 'smoke_qgis_handoff.py', 'smoke_map_defaults.py'):
        script = ROOT/'tools'/name
        code = ('import sys,runpy,groundsurf_qgis; '
                'assert groundsurf_qgis.__file__.startswith('+repr(str(folder))+'); '
                'sys.path.insert(0,'+repr(str(ROOT/'tools'))+'); '
                'runpy.run_path('+repr(str(script))+',run_name="__main__")')
        subprocess.run([args.qgis_python, '-c', code], cwd=temp, env=env, check=True)
    print('PASS: ZIP matches source, licence and version; all five native workflow scripts loaded the extracted package.')
