# GroundSurf for QGIS 0.3.3

GroundSurf is an independent, non-commercial online service. This experimental QGIS 3 plugin uses the same hosted evidence engine as the website.

## Install or upgrade

1. Open **Plugins → Manage and Install Plugins → Install from ZIP**.
2. Select **GroundSurf-QGIS-0.3.3.zip**. Enable **GroundSurf – Site Intelligence** in the Installed tab.
3. Open **Plugins → GroundSurf**. If an older dock remains open after upgrading, restart QGIS. Existing project layers and the explicit report-language preference are retained.

## Generate your first report

Search for an address, choose a result and check its location on the map. For Poland the report language defaults to Polski. A cross marks the address. Use an official parcel, a selected polygon feature or **Narysuj granicę**. Click the corners, then double-click the final corner. Choose **Generuj raport GroundSurf**. The site outline stays on the map. The form folds away and the report appears in the dock.

**Wybór lokalizacji** expands the form again. Under **Mapy i zapisane raporty**, use the parcel tools, address-radius screening, Polish map layers or a saved report. The map-layer action contacts the named map provider when you choose a layer. Existing project layers keep their original styles.

Open **Raport szczegółowy** to search every returned evidence record, view sources and limitations, inspect the stored record, ask a question, or save JSON or PDF. **Pokaż dane na mapie** maps supported source positions. A distance from the site alone cannot locate an observation. The Polish monitoring mapper looks up the recorded station ID and checks its monitoring reference. Follow-up questions use the active report. Source pages, copying a share link and copying an embed are explicit actions.

## GroundSurf website → QGIS → optional 3D

**Open web report** accepts a saved report ID or a link in the form
`https://groundsurf.net/report?report_id=...`. This loads an existing report
from the hosted GroundSurf API without requesting a new analysis. The report
must be accessible through the existing report API.

**Display in QGIS** adds the selected site footprint as a spatially indexed
temporary polygon layer and maps only evidence with known source coordinates.
A nearby groundwater observation remains at the monitoring station, never
at the selected parcel. Claims with no usable coordinates stay in the report.

**Explore in 3D** optionally connects to the independent
[Current View to ParaView](https://github.com/wtzet-eng/current-view-to-paraview)
QGIS plugin. With that plugin installed and enabled, it opens the current
eligible local QGIS layers in ParaView. No missing geological geometry or
groundwater depth is invented.

You can also download GeoJSON directly from GroundSurf's website report tile
and open it in QGIS without installing this plugin. A selected screening
boundary is not necessarily a legal cadastral parcel boundary.

## Data and privacy

Address searches go to Photon (OpenStreetMap contributors). The GroundSurf Cloud Run service receives the selected geometry, country, area, language and any selected parcel ID. QGIS project files and other feature attributes are excluded. The service can store an analysis under its report ID. A share action checks durable storage before copying a link. A person with that link can read the report.

The plugin keeps the 20 most recent generated records in the active QGIS profile under `groundsurf_reports`. Manage those JSON files through **Settings → User Profiles → Open Active Profile Folder**. The portable full report includes the server record plus the submitted boundary and its QGIS origin. The evidence manifest is a separate, curated export. It uses the web application's version 1.2.0 exporter. Offline manifest generation requires QtQml or QtWebKit. New reports, parcel lookups, AI questions and sharing require internet access.

The drawing and import tools accept one valid polygon without holes and up to 1,000 vertices. Groundwater observations retain the monitoring location and date. Well depth and local water level are separate quantities. Missing coverage remains unknown.

## Build and verify

```sh
python3 -m unittest discover -s tests -v
python3 -m compileall -q groundsurf_qgis
QT_QPA_PLATFORM=offscreen /usr/bin/python3 tools/smoke_qgis_ui.py
QT_QPA_PLATFORM=offscreen /usr/bin/python3 tools/smoke_qgis_network.py
QT_QPA_PLATFORM=offscreen /usr/bin/python3 tools/smoke_report_lifecycle.py
QT_QPA_PLATFORM=offscreen /usr/bin/python3 tools/smoke_qgis_handoff.py
QT_QPA_PLATFORM=offscreen /usr/bin/python3 tools/smoke_qgis_paraview_bridge.py
python3 tools/build_release.py
```

With a saved report, `tools/check_stored_report.py REPORT.json` checks the reader, JSON, PDF, sharing UI and manifest. Its optional `--live` flag contacts the Polish parcel and map services. The install package contains the plugin directory only. The QGIS metadata declares a minimum of 3.28. Actual desktop testing covered Ubuntu 24.04.5 LTS with QGIS 3.34.4 Prizren.

See [feature parity](PARITY.md) and [release verification](VERIFICATION.md). The maintainer owns the licensing, public-source and catalogue-submission decisions.

## Plugin licence

GroundSurf for QGIS
Copyright (C) 2026 Tomasz Żuk, for the GroundSurf plugin original work.
SPDX-License-Identifier: GPL-2.0-or-later

You may redistribute and modify this plugin under the GNU General Public
License, version 2 or (at your option) any later version. It is distributed
without warranty. See [LICENSE](groundsurf_qgis/LICENSE) for the terms.

This grant covers the GroundSurf plugin and its bundled GroundSurf exporter.
The separately hosted GroundSurf service, source datasets and provider maps
are outside its scope. Third-party JavaScript helpers retain their notices.
