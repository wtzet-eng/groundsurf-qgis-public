# GroundSurf Site Intelligence 0.5.1 · 21 November 2026

Map controls now sit directly below the GroundSurf heading, above address search and the report. OpenStreetMap has a visible on/off switch beside Map layers. Empty projects still start with the background enabled. Existing projects keep their layer choices, and the switch follows visibility changes made in QGIS's Layers panel. Enabling it also reveals a hidden parent group and reuses the existing map layer.

This changes the control position, not the drawing order: the background stays below site and evidence layers. Map controls remain visible when the site form folds away. Site Intelligence remains separate from Geothermal/Studio.

The groundwater number formatter in `geotech.py` now uses a named function instead of an assigned lambda, resolving the reported Flake8 E731 warning without changing number formatting.

## Package and verification

`GroundSurf-QGIS-0.5.1.zip`: **100192 bytes**. SHA-256: `f33d3bda11fe9aa9e692b15b69786d847374b1160f78e2092b94ea08a81ba55d`.

- Matching metadata/runtime version and extensionless LICENSE; package contents match source.
- Flake8 7.5.0 with `--select=E731` reports zero occurrences across the plugin.
- All 34 core/stream tests and all five native workflow scripts pass from the extracted ZIP on Debian 13 / QGIS 3.40.6 Bratislava / Qt 5.
- Visible installation from ZIP: OpenStreetMap active in an empty project; both map controls visible at the top of the dock; map and attribution hidden/revealed by the switch; switch updated by QGIS layer and parent-group visibility; hidden parent group restored without adding a duplicate layer; Map layers menu opens at the top.
- Loaded module: `/home/agent/.local/share/QGIS/QGIS3/profiles/default/python/plugins/groundsurf_qgis/plugin.py`, version 0.5.1.

The visible layout check preceded the final formatting-only E731 correction. The rebuilt package was checked again with Flake8, core tests and the five native package scripts.

The broader live Polish report acceptance and Ubuntu / QGIS 3.34.4 checks were completed for 0.5.0 and are recorded in [that release](RELEASE-0.5.0.md). No new analysis request was needed for this layout change. Ubuntu was not rerun for 0.5.1; Windows, macOS, QGIS 3.28 and Qt 6 remain unverified. Existing manifest-runtime and optional real ParaView test limitations still apply.

## Upgrade

Use **Plugins → Manage and Install Plugins → Install from ZIP**, choose `GroundSurf-QGIS-0.5.1.zip`, then restart QGIS. This package is prepared for maintainer review; it has not been submitted to the public QGIS catalogue.
