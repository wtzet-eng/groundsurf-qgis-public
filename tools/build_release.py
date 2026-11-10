"""Build a clean ZIP containing the single QGIS plugin directory."""
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile

ROOT = Path(__file__).resolve().parents[1]
PLUGIN = ROOT / "groundsurf_qgis"
OUT = ROOT / "dist"
OUT.mkdir(exist_ok=True)
metadata = (PLUGIN / "metadata.txt").read_text(encoding="utf-8")
version = next(
    line.partition("=")[2].strip()
    for line in metadata.splitlines() if line.startswith("version=")
)
TARGET = OUT / ("GroundSurf-QGIS-" + version + ".zip")
with ZipFile(TARGET, "w", ZIP_DEFLATED) as package:
    for file in sorted(PLUGIN.iterdir()):
        if file.is_file() and file.suffix in (".py", ".txt", ".md", ".js"):
            package.write(file, "groundsurf_qgis/" + file.name)
with ZipFile(TARGET) as package:
    assert package.testzip() is None
    assert "groundsurf_qgis/metadata.txt" in package.namelist()
    assert "groundsurf_qgis/__init__.py" in package.namelist()
    print(TARGET, TARGET.stat().st_size, "bytes", package.namelist())

