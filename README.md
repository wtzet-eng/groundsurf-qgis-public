# GroundSurf for QGIS 0.5.1

GroundSurf is an independent, non-commercial online service. This QGIS 3 plugin uses the same hosted evidence engine as the website.

## Videos and companion plugins

- **Start with GroundSurf.** See how site selection and ground evidence support a conceptual model for land evaluation in QGIS. [Watch the GroundSurf walkthrough](https://youtu.be/o8NiUfYtFVM).
- **Explore the site in 3D.** Once GroundSurf evidence is on the QGIS map, add your geological layers or positioned seismic profiles. Current View to ParaView exports the visible layers for inspection in 3D. The video demonstrates this workflow with SeisPlotPy. [Watch the seismic and mapping demo](https://youtu.be/eWNIJKgonms) · [Current View to ParaView](https://github.com/wtzet-eng/current-view-to-paraview).
- **Model groundwater locally.** If you have a projected well-point layer with water elevations from the same aquifer and a common height datum, SGeMS Workbench can estimate a groundwater surface with ordinary kriging or simulate alternative surfaces. Its bundled modelling tools run on 64-bit Intel/AMD Linux. [SGeMS Workbench](https://github.com/wtzet-eng/sgems-workbench).

## Install or upgrade

1. Open **Plugins → Manage and Install Plugins → Install from ZIP**.
2. Select **GroundSurf-QGIS-0.5.1.zip**. Enable **GroundSurf – Site Intelligence** in the Installed tab.
3. Open **Plugins → GroundSurf**. If an older dock remains open after upgrading, restart QGIS. Existing project layers and the explicit report-language preference are retained.

## Generate your first report

1. Open **Plugins → GroundSurf**. An empty project gets an OpenStreetMap background automatically.
2. Type an address. Suggestions appear after a short pause. Choose a result to zoom to it. The site country and report language follow the address; Poland defaults to Polish.
3. A precise address starts an official parcel lookup where supported. Check the highlighted boundary. Otherwise choose **Pick parcel**, **Draw boundary**, or the explicitly labelled **50 m radius**. To draw, click the corners and double-click the final corner. **More → Use selected polygon** imports one selected QGIS polygon.
4. Click **Generate GroundSurf report**. The outline stays visible while evidence arrives. The form folds away and a groundwater-first overview appears in the dock.
5. Choose **Read full report** for the larger internal reader. **Interpretation** and **Evidence** are the two main views. Search every evidence record, inspect sources, ask a question, or use **Save / export**. Checks, history, terrain, local Geotech tools, research and full JSON remain under **More detail**.

**OpenStreetMap** and **Map layers** stay at the top of the dock, directly below the heading. OpenStreetMap is on by default in empty projects. Its switch shows or hides the background and follows changes in QGIS's Layers panel. **Map layers** offers country-specific overlays and zooming to the site. The background remains below site and evidence layers in the map's drawing order.

**Find or change site** reopens the form. **Map evidence** plots supported source positions and links map selection to the evidence reader. A distance alone does not locate an observation.

**Country, language and defaults** lets you override the country or language and switch off automatic maps or suggestions. A remembered language choice takes priority over the site country. **Automatic** returns to the country language. English and Polish cover the main controls; other report languages use the existing service.

**More** contains recent reports, reopening a website report or saved JSON, selected polygon import and optional 3D handoff. Source pages, feedback and sharing remain explicit actions. Opening another report view reuses the existing record.

GroundSurf **Site Intelligence** remains separate from **GroundSurf Geothermal**. This package adds no geothermal modelling interface, dependency or shared project storage. Existing optional links to companion tools remain optional.

## Data and privacy

Typed address searches go to Photon after a 900 ms pause, with a minimum of three characters, an in-memory cache and a request interval. Turn suggestions off to search only with **Find** or Enter. Choosing a precise address can send its position to the GroundSurf parcel service. Address points are not parcel boundaries. The GroundSurf Cloud Run service receives the selected geometry, country, area, language and any selected parcel ID. QGIS project files and other feature attributes are excluded. The service can store an analysis under its report ID. A share action checks durable storage before copying a link. A person with that link can read the report.

The plugin keeps the 20 most recent generated records in the active QGIS profile under `groundsurf_reports`. Manage those JSON files through **Settings → User Profiles → Open Active Profile Folder**. The portable full report includes the server record plus the submitted boundary and its QGIS origin. The evidence manifest is a separate, curated export. It uses the web application's version 1.2.0 exporter. Offline manifest generation requires QtQml or QtWebKit. New reports, parcel lookups, AI questions and sharing require internet access.

The drawing and import tools accept one valid polygon without holes and up to 1,000 vertices. Groundwater observations retain the monitoring location and date. Well depth and local water level are separate quantities. Missing coverage remains unknown.

OpenStreetMap uses QGIS’s native XYZ provider and HTTP tile cache. Only visible map tiles are requested. There is no bulk download or offline tile pack. Attribution stays on the canvas while the OSM layer is visible, including after closing or unloading the plugin. Existing project layers, styles, extent and CRS are preserved. A new empty project uses Web Mercator. Map rendering and report requests run independently.

Provider policies: [OpenStreetMap tiles](https://operations.osmfoundation.org/policies/tiles/) · [Photon](https://github.com/komoot/photon). Provider availability and capacity can vary. Basemap downloads expose the viewed map extent to the tile provider. The advanced `GroundSurfQGIS/osm_tiles` setting accepts an HTTPS OSM-compatible XYZ endpoint; it must permit the displayed attribution and normal interactive use.

## Build and verify

```sh
python3 -m unittest discover -s tests -v
python3 -m compileall -q groundsurf_qgis
QT_QPA_PLATFORM=offscreen /usr/bin/python3 tools/smoke_qgis_ui.py
QT_QPA_PLATFORM=offscreen /usr/bin/python3 tools/smoke_qgis_network.py
QT_QPA_PLATFORM=offscreen /usr/bin/python3 tools/smoke_report_lifecycle.py
QT_QPA_PLATFORM=offscreen /usr/bin/python3 tools/smoke_map_defaults.py
QT_QPA_PLATFORM=offscreen /usr/bin/python3 tools/smoke_qgis_handoff.py
python3 tools/build_release.py
```

With a saved report, `tools/check_stored_report.py REPORT.json` checks the reader, JSON, PDF, sharing UI and manifest. Its optional `--live` flag contacts the Polish parcel and map services. `tools/verify_package.py dist/GroundSurf-QGIS-0.5.1.zip` checks the actual package against source and runs five native workflow scripts from the extracted ZIP. The install package contains the plugin directory only. The QGIS metadata declares a minimum of 3.28. Version 0.5.1 was tested visibly and with package tests on Debian 13 with QGIS 3.40.6 Bratislava / Qt 5. Version 0.5.0 also passed offscreen package tests on Ubuntu 24.04 with QGIS 3.34.4 Prizren. Windows, macOS, QGIS 3.28 and Qt 6 are not verified for this release.

See [feature parity](PARITY.md) and [release verification](VERIFICATION.md). Current verification is in [the 0.5.1 release notes](docs/RELEASE-0.5.1.md), with the broader report acceptance in [0.5.0](docs/RELEASE-0.5.0.md). Public catalogue submission remains with the maintainer.

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
