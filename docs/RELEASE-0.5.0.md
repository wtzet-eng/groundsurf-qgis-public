# GroundSurf Site Intelligence 0.5.0 · 21 November 2026

This update simplifies site selection and report reading. It remains a separate QGIS plugin from GroundSurf Geothermal/Studio.

## Changes

- Charcoal and green dock, compact search and boundary controls, and fewer controls shown at once.
- OpenStreetMap appears automatically in empty projects. Existing project layers, styling, CRS and extent are retained. Duplicate maps are reused, attribution remains visible, and map errors have a separate status from report generation.
- Address suggestions after a short pause, with caching and request throttling. A suggestion does not select a site until chosen. Older results cannot replace a newer query. A precise address starts the existing official parcel lookup, with an explicit radius or drawing fallback.
- Country and language follow the selected address. Remembered language overrides remain available. English and Polish cover the main controls.
- Compact groundwater-first overview. A larger native report reader has two primary views: interpretation and evidence. Every returned record remains searchable. Details, questions, exports and optional companion tools remain available.
- Diagnostic and network version identifiers match metadata. Location URLs are excluded from routine service error text. Remote report text is escaped before formatted display.

## Source and package

Public `main` was `ffe71d74a55042e4dea403f07f50d4ead35ba841`. It still contained an older plugin. The shipped 0.4.1 ZIP was recovered and reconciled first in local commit `cde2cf8`, preserving its Qt compatibility fixes, Geotech tools and website/ParaView handoff. The interface update builds on that baseline. Existing Ubuntu checkouts and the user's default installed profile were not overwritten.

The package is `GroundSurf-QGIS-0.5.0.zip`, with one `groundsurf_qgis` directory, matching `metadata.txt` and `version.py`, extensionless `LICENSE`, and the existing third-party notices. No compiled or platform-specific runtime was added.

Size: **99791 bytes**. SHA-256: `0b6009d03bbebe800b28b7980e68a3dd29c973f6041db921559166dbf0fcff2b`.

## Automated verification

All 34 pure-Python core/stream tests pass. The following QGIS scripts pass on Debian 13, QGIS 3.40.6 Bratislava, Qt 5:

| Check | Result |
|---|---|
| `smoke_qgis_ui.py` | Country defaults, Polish first, explicit language persistence and reset |
| `smoke_qgis_network.py` | Fixture address → CRS-aware map → polygon → asynchronous report → full reader |
| `smoke_report_lifecycle.py` | Duplicate click, changed site, Polish for Germany, 24 records, unavailable AI/groundwater/cadastre, malformed response, HTTP 503, timeout, retry and unload |
| `smoke_qgis_handoff.py` | Website report link, stored boundary, QGIS evidence layer, linked selection and mocked optional 3D handoff |
| `smoke_map_defaults.py` | Empty-project OSM, attribution, unload, deduplication, existing project preservation, defaults off, stale suggestions, precise-address lookup, radius fallback, timeout, dynamic form height and escaped text |
| `check_stored_report.py` | Reader, JSON round trip, PDF signature, saved report reopening and fixture-confirmed share/embed clipboard |

The stored-report checker used `--allow-missing-manifest-runtime`: this test environment has neither QtQml nor QtWebKit. The existing manifest exporter returns its expected dependency error. Full JSON and PDF remain available. Manifest parity was previously verified in the 0.3.0 acceptance; it was not reverified here. The optional real ParaView exporter test was not run because that separate plugin is not installed; its interface handoff fixture passed.

The exact delivered ZIP also passed all 34 core/stream tests and all five native workflow scripts on Ubuntu 24.04 / QGIS 3.34.4 Prizren. These Ubuntu checks ran offscreen from a separate review checkout and temporary extracted package. The user's running QGIS process, default profile and existing checkouts were left untouched.

Python compilation and whitespace checks pass. `tools/verify_package.py` confirms that every ZIP entry matches source, that the licence and version are present, and that all five native workflow scripts import the extracted ZIP. Every final installed plugin file was also compared byte for byte with the ZIP in the visible Debian desktop.

## Visible installation and integration

The candidate was installed using QGIS's Install from ZIP implementation in the isolated test desktop. The loaded module was `/home/agent/.local/share/QGIS/QGIS3/profiles/default/python/plugins/groundsurf_qgis/plugin.py` and identified itself as 0.5.0 on QGIS 3.40.6.

The first live run found the public Kraków address through Photon and selected Polish automatically. Both the GroundSurf parcel request and urban OSM tiles initially returned HTTP 429. Testing paused; after the restriction cleared, a later run displayed OSM streets and automatically selected official parcel **126105_9.0001.312**, with GUGiK / ULDK attribution. Small-parcel zoom was adjusted to preserve surrounding street context.

An explicitly synthetic response test also generated and reopened a 24-record report from a drawn polygon. It exercised the installed ZIP with unavailable AI and is not presented as real ground evidence.

The live drawn-polygon request completed with HTTP 200 after **35.2 seconds**, report **REP-PL-MWQ3Q89Y**, Polish, **30 evidence records**. The visible dock had 426 pixels of report area. The PIG-PIB finding identified station II_771_1, a 9.41 m depth below ground on 29 September 2026, about 2.92 km from the site, with local/seasonal uncertainty retained.

The visible cancel action kept the same polygon; retry completed successfully. The larger reader showed 30 / 30 records; filtering by II_771_1 produced 1 / 30. A live Polish follow-up answered that the measurement was from the nearby monitoring station, not the selected parcel. GET `/api/reports/REP-PL-MWQ3Q89Y` returned all 18 server fields unchanged relative to the plugin record. The plugin only added its selected boundary and origin metadata.

Two final presentation corrections followed this run: Enter in the question field no longer activates a navigation button, and safe bold markup in answers is formatted instead of showing asterisks. The final ZIP passed the isolated package tests, was reinstalled in the visible QGIS desktop and reopened the same stored report without another analysis. The larger reader displayed the Polish groundwater findings, all 30 records and the 1 / 30 station filter. Its map action resolved the genuine PIG-PIB monitoring-station position and displayed one source point on OpenStreetMap, about 2.92 km from the selected site.

## Install or upgrade

1. In QGIS, open **Plugins → Manage and Install Plugins → Install from ZIP**.
2. Choose `GroundSurf-QGIS-0.5.0.zip` and enable **GroundSurf – Site Intelligence**.
3. Restart QGIS after replacing an older loaded version. Open **Plugins → GroundSurf**.
4. Search for an address, select it, check its boundary and generate the report. Use **Country, language and defaults** to change automatic behaviour.

## Remaining coverage and publication

- The new release was tested visibly on Debian 13 / QGIS 3.40.6 / Qt 5 and with offscreen native package tests on Ubuntu 24.04 / QGIS 3.34.4. The earlier 0.3.0 workflow also had a visible Ubuntu acceptance. Windows, macOS, Qt 6 and minimum QGIS 3.28 remain unverified for 0.5.0.
- Country-specific narrative and mapping coverage remain as described in `PARITY.md`. This interface update does not claim a fresh complete audit of every backend country adapter.
- New reports and provider maps require internet access. Public Photon/OSM capacity and national provider availability vary. No bulk tile fetching, new hosted service or geothermal dependency was added.
- GPL-2.0-or-later applies to the plugin and bundled exporter only. The hosted service and provider datasets remain outside that grant. Copyright and existing notices are retained. Package email and homepage use the maintainer's previously confirmed choices.
- Prepared for maintainer review and catalogue submission. This version has not been submitted to the QGIS catalogue or merged into the public default branch.
