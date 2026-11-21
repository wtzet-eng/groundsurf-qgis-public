# Web and QGIS feature audit

## 0.5.1 map controls · 21 November 2026

OpenStreetMap and Map layers are always available below the dock heading. The OpenStreetMap switch follows QGIS layer/group visibility and reuses an existing background. Empty projects still start with OpenStreetMap enabled. The background's drawing order stays below site and evidence layers. See [0.5.1 verification](docs/RELEASE-0.5.1.md).

## 0.5.0 interface update · 21 November 2026

The original web/API audit below is retained as a dated baseline. This update changes the native interface and defaults; it reuses the 0.4.1 evidence, parcel, report identity and export code. It is not a new audit of every currently deployed country adapter. GroundSurf Site Intelligence remains independent of GroundSurf Geothermal/Studio.

| Action | 0.5.0 implementation | Acceptance |
|---|---|---|
| Open the plugin in an empty project | Automatic native OpenStreetMap XYZ layer, bottom of a dedicated group; visible attribution | Visible installed ZIP and fixture tests; default can be disabled; existing project CRS, layers, styles and extent preserved |
| Type an address | 900 ms debounce, minimum three characters, request interval, memory cache, stale response suppression | Live Photon choices for Rynek Główny 1; fixture checks for timeout, cache, explicit selection and disabling suggestions |
| Choose a precise address | Country and language update; official parcel lookup uses existing service | Polish selected automatically; live GUGiK / ULDK parcel 126105_9.0001.312 confirmed after an earlier HTTP 429; fallback retained |
| Choose a boundary | Pick parcel and Draw boundary beside address search; explicit 50 m fallback; selected polygon in More | Visible polygon drawing and finish; projected/geographic payload and radius fixtures |
| Generate and read | Form folds away; short groundwater overview; larger native reader with Interpretation and Evidence | Visible installed-ZIP Polish polygon: HTTP 200 in 35.2 s, REP-PL-MWQ3Q89Y, 30 records; cancel and retry confirmed |
| Search all evidence | Source-oriented list, filter count, source details and linked map selection | Record 24 accessible; source text escaped; nonspatial data stays in report |
| Save, reopen, ask and share | Existing APIs and stored identity; export menu in reader; recent/JSON/web reports in More | JSON, PDF, reopen, live Polish question and 18-field stored-report equality; fixture sharing; optional manifest runtime limitation documented |
| Map services fail | Separate map status; concise parcel/service errors; selected site preserved | Map errors cannot overwrite report status; HTTP 429 observed in live test network |
| Optional modelling tools | Existing Geotech and ParaView handoff remain optional | Handoff fixture passed; no Geothermal/Studio UI, dependency or shared project store added |

See [0.5.0 release verification](docs/RELEASE-0.5.0.md) for exact coverage and blockers.

## Original backend parity audit · November 2026

Compared Geosurvey main `da296fb` with the deployed `/assets/index-Crby1XSY.js`. The Ubuntu web checkout at `726146e` differs from that commit only in the deployment workflow. The deployed bundle contains the Cloud Run base URL and the analysis, question and cadastre calls below. The health endpoint supplies status and time. An exact deployed Git SHA was unavailable.

| User action | Reachable web entry / dependency | QGIS 0.3.0 equivalent and state | Acceptance or gap |
|---|---|---|---|
| Find address and zoom | MapPicker search, geocoder, Leaflet extent | Explicit Photon search with memory cache, transforms address extent into project CRS | Kraków search and submitted position checked in EPSG:2180 |
| Choose site and language | GroundSurfApp country and language refs, browser preference | Country selector, QGIS profile preference, site country then QGIS locale | Automatic Polish, explicit Polish in Germany, persistence and reset |
| Select official parcel | MapPicker address or map click, GET /api/cadastre/query with jurisdiction hints | House-number search lookup, manual address lookup and map click, containment and valid-ring checks, UK large-title guard | Kraków ULDK parcel confirmed. Outage fixture. Country-by-country cartographic parity remains unverified |
| Exact Hong Kong lot | MapPicker findHongKongLot, GET /api/cadastre/hk-lot | HK menu action accepts a reference, uses returned geometry | Implemented, live lot acceptance outstanding |
| Draw, import or screen a radius | Leaflet polygon/rectangle/circle, client area | Draw polygon, import single QGIS polygon, explicit address radius. A rectangle can be selected or drawn as a polygon | Four clicks including finish, geographic import, projected drawing, double click, area and vertex order. No dedicated drag-rectangle mode |
| Generate and cancel | GroundSurfApp gatherEvidence, POST /api/analyze-site?progressStream=1, SSE heartbeat, source, finding, result | Shared asynchronous QgsNetworkAccessManager, bounded incremental parser, elapsed time, cancel, retry, source and localized verified early finding | Visible installed-ZIP runs, duplicate, stale-site, malformed, incomplete, timeout and unload tests |
| Read interpretation and uncertainty | GroundSurfApp evidence registry, deterministic fallbacks, /api/ai/interpret | Local groundwater-first summary immediately, optional asynchronous AI interpretation, limitations, verification checklist | Polish PIG-PIB depth, date and distance verified. AI failure fixture. Native reader does not reproduce every country-specific web narrative |
| Read detailed report and search | /report via App ReportRoute, country-specific ReportView components | Native reader opens active data without repeating analysis. Evidence filter, source, date, relationship, method, raw values, checks, terrain and complete JSON | Thirty records, filtered one by station reference. Firefox rendered the same station and record |
| Inspect evidence on map | MapPreview displays selected/mapped/official boundary and conditional overlays | Native source-position layer with linked selection. Explicit station coordinates, source GeoJSON points, EEA facilities and verified PIG-PIB station lookup | Live Kraków station shown. Nonspatial records remain searchable. Arbitrary source lines, polygons and all national schemas are outside current mapper coverage |
| Add map layers | MapPicker and MapPreview provider definitions | Opt-in GUGiK topo, GUGiK cadastral, PIG-PIB SMGP 1:50,000, grouped in project | All three QGIS providers validated. First provider connection may take time when a map is explicitly added |
| Historical context and studies | LocalHistoricalCluesPanel, GermanyHistoricalCluesPanel, EuropeHistoryDiscoveryPanel, AreaResearchPanel, /api/research/discover | Returned historical leads are in the reader. User-triggered publications lookup. Helsinki municipal aerial imagery 1932 and 2024, conditional Stockholm cloudburst rasters | Helsinki layer name checked in capabilities. Local historical portals, Europe archive directories and city overlays have partial parity. Research leads stay separate from core findings |
| Terrain and 3D | Technical fields in ReportView. Site3DView defined in GroundSurfApp without a mounted instance in audited route | Terrain tab reads technical parameters, native QGIS canvas remains available | No reachable GroundSurf 3D view verified for this build |
| Ask follow-up | GroundSurfApp ask, POST /api/ai/ask with report, question and language | Question box in active native reader. Displays answer and returned unknowns | Live Polish answer for Berlin. Web suggested next questions and action buttons are not reproduced |
| Reopen and save | Browser report cache and saved IDs, GET /api/reports/:id, web backfill POST /api/reports | Recent 20 in profile, reopen by ID or JSON, atomic save. Original response fields preserved alongside selected_boundary and boundary origin | Local reopen and web API readback checked. Browser-private and QGIS-private recent lists are separate |
| Share and embed | reportSharing durable confirmation and EmbedModal | POST /api/reports/:id/share before copying canonical link or iframe | Fixture verified both clipboard forms. Web React/Wikidot standalone widget generator stays web-only |
| Download machine data | createGroundSurfEvidenceManifest, client-side download | Offline execution of same bundled exporter, localized manifest, separate full JSON | Full 30-record Polish manifest matched independently executed web function field-for-field |
| PDF and Drive | ReportView print button uses window.print. GoogleDriveModal currently displays availability notice | Native Qt PDF export of interpretation and evidence. Local JSON can be saved anywhere writable | PDF signature and JSON round trip verified. No functioning web Drive upload to reuse |
| Give feedback | /feedback?lang= opens feedback page | Explicit feedback menu action | URL wired. No messages sent by plugin |
| Other browser-only presentation | Theme, browser geolocation, standalone embed presets and delayed feedback presentation | Uses QGIS theme and map navigation | Browser UI controls and theme parity outside native report workflow |

English and Polish cover the main native workflow. Other report languages depend on the existing service. Some progress, validation text, source claims and raw field names can still appear in English. Cross-country UI localisation is incomplete.
