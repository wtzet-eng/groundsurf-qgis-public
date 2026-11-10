"""Pure Python: request schema and safe report formatting. No QGIS dependency."""
import math
import re
from urllib.parse import urlencode, urlsplit, parse_qs

API_BASE = "https://geosurvey-backend-5yz2avrqwa-ew.a.run.app"
API_URL = API_BASE + "/api/analyze-site"
GEOCODER_URL = "https://photon.komoot.io/api"  # komoot public demo; manual low-volume searches only
REPORT_BASE_URL = "https://groundsurf.net/report?report_id="
MAX_RESPONSE_BYTES = 12 * 1024 * 1024
MAX_VERTICES = 1000

# Names match GroundSurf's website registry as of November 2026.
COUNTRIES = [
    ("AL", "Albania"), ("AD", "Andorra"), ("AU", "Australia"),
    ("AT", "Austria"), ("BE", "Belgium"), ("BG", "Bulgaria"),
    ("CA", "Canada"), ("CN", "China (mainland)"), ("HR", "Croatia"),
    ("CY", "Cyprus"), ("CZ", "Czechia"), ("DK", "Denmark"),
    ("EE", "Estonia"), ("FI", "Finland"), ("FR", "France"),
    ("DE", "Germany"), ("GR", "Greece"), ("GL", "Greenland"),
    ("HK", "Hong Kong"), ("HU", "Hungary"), ("IS", "Iceland"),
    ("IE", "Ireland"), ("IT", "Italy"), ("LV", "Latvia"),
    ("LT", "Lithuania"), ("LU", "Luxembourg"), ("MO", "Macau"),
    ("MT", "Malta"), ("MD", "Moldova"), ("MC", "Monaco"),
    ("ME", "Montenegro"), ("NL", "Netherlands"), ("NO", "Norway"),
    ("PL", "Poland"), ("PT", "Portugal"), ("RO", "Romania"),
    ("RS", "Serbia"), ("SK", "Slovakia"), ("SI", "Slovenia"),
    ("ES", "Spain"), ("SE", "Sweden"), ("CH", "Switzerland"),
    ("UA", "Ukraine"), ("GB", "United Kingdom"), ("US", "United States"),
]
# Same 26 selectable report languages as GroundSurf's shared language registry.
# Labels deliberately use native names where possible.
LANGUAGES = [
    ("en", "English"), ("de", "Deutsch"), ("pl", "Polski"),
    ("nl", "Nederlands"), ("cs", "Čeština"), ("da", "Dansk"),
    ("sv", "Svenska"), ("no", "Norsk bokmål"), ("fr", "Français"),
    ("it", "Italiano"), ("es", "Español"), ("fi", "Suomi"),
    ("sk", "Slovenčina"), ("hr", "Hrvatski"), ("pt", "Português"),
    ("et", "Eesti"), ("lv", "Latviešu"), ("lt", "Lietuvių"),
    ("uk", "Українська"), ("sl", "Slovenščina"), ("hu", "Magyar"),
    ("ro", "Română"), ("sq", "Shqip"), ("is", "Íslenska"),
    ("ca", "Català"), ("zh", "简体中文"),
]

# Match the country defaults in src/data/countries.ts; unsupported local
# languages intentionally fall back to English rather than pretending that
# GroundSurf can produce a fully localized report.
COUNTRY_LANGUAGE = {
    "AL": "sq", "AD": "ca", "AU": "en", "AT": "de", "BE": "nl",
    "CA": "en", "CN": "zh", "HR": "hr", "CZ": "cs", "DK": "da",
    "EE": "et", "FI": "fi", "FR": "fr", "DE": "de", "GL": "en",
    "HK": "en", "HU": "hu", "IS": "is", "IE": "en", "IT": "it",
    "LV": "lv", "LT": "lt", "LU": "fr", "MO": "en", "MD": "ro",
    "MC": "fr", "NL": "nl", "NO": "no", "PL": "pl", "PT": "pt",
    "RO": "ro", "SK": "sk", "SI": "sl", "ES": "es", "SE": "sv",
    "CH": "de", "UA": "uk", "GB": "en", "US": "en",
}
# The website currently restricts USA human-readable report languages.
US_LANGUAGES = {"en", "de", "pl"}


def _language_code(value):
    code = str(value or "").lower().strip().replace("_", "-").split("-")[0]
    return "no" if code in ("nn", "nb") else code


def available_languages(country_code):
    """Native country language first, then English, then remaining languages."""
    country = str(country_code or "").upper()
    supported = [item for item in LANGUAGES
                 if country != "US" or item[0] in US_LANGUAGES]
    native = COUNTRY_LANGUAGE.get(country, "en")
    return sorted(supported, key=lambda item: (
        0 if item[0] == native else 1 if item[0] == "en" else 2,
        item[1].casefold(),
    ))


def preferred_language(country_code="", explicit_language="", system_language="en"):
    """User's explicit preference wins; otherwise location then system language."""
    choices = {code for code, _ in available_languages(country_code)}
    explicit = _language_code(explicit_language)
    if explicit in choices:
        return explicit
    country = str(country_code or "").upper()
    if country:
        native = COUNTRY_LANGUAGE.get(country)
        if native in choices:
            return native
    system = _language_code(system_language)
    return system if system in choices else "en"


def geocoder_search_url(query, endpoint=GEOCODER_URL):
    """One explicit search per button click, never autocomplete."""
    query = str(query or "").strip()
    if len(query) < 3 or len(query) > 220:
        raise ValueError("Enter an address or place name (3–220 characters).")
    endpoint = str(endpoint or "").strip()
    if not endpoint.startswith("https://"):
        raise ValueError("Geocoding service must use HTTPS.")
    base = endpoint.rstrip("/")
    if not base.endswith("/api"):
        raise ValueError("Geocoding service must be a Photon /api endpoint.")
    return base + "?" + urlencode({"q": query, "limit": 5})


def parse_geocoder_results(response):
    """Convert Photon GeoJSON points to safe map-search results."""
    if not isinstance(response, dict) or not isinstance(response.get("features"), list):
        raise ValueError("Address service returned unexpected data.")
    results = []
    for item in response["features"][:12]:
        if not isinstance(item, dict):
            continue
        geometry = item.get("geometry") or {}
        props = item.get("properties") or {}
        if (not isinstance(geometry, dict) or not isinstance(props, dict)
                or geometry.get("type") != "Point"):
            continue
        xy = geometry.get("coordinates")
        if not isinstance(xy, list) or len(xy) < 2:
            continue
        try:
            lon, lat = float(xy[0]), float(xy[1])
        except (TypeError, ValueError):
            continue
        if not (math.isfinite(lat) and math.isfinite(lon)
                and -90 <= lat <= 90 and -180 <= lon <= 180):
            continue
        pieces = [
            str(props.get("name") or "").strip(),
            " ".join(str(props.get(key) or "").strip()
                     for key in ("street", "housenumber")).strip(),
            str(props.get("city") or props.get("county") or "").strip(),
            str(props.get("country") or "").strip(),
        ]
        label = ", ".join(dict.fromkeys(x[:120] for x in pieces if x))
        if not label:
            label = "%.5f, %.5f" % (lat, lon)
        country = str(props.get("countrycode") or "").upper()
        if country not in {code for code, _ in COUNTRIES}:
            country = ""
        results.append({"lat": lat, "lon": lon, "label": label[:300],
                        "country": country, "state": str(props.get("state") or ""),
                        "municipality": str(props.get("city") or ""), "address_level": bool(props.get("housenumber"))})
    return results[:5]


def normalize_ring_latlon(points):
    """Server uses [latitude, longitude]; QGIS convention is x=longitude, y=latitude."""
    out = []
    for point in points:
        if len(point) < 2:
            raise ValueError("Each vertex needs latitude and longitude.")
        lat, lon = float(point[0]), float(point[1])
        if not (math.isfinite(lat) and math.isfinite(lon) and -90 <= lat <= 90 and -180 <= lon <= 180):
            raise ValueError("Invalid WGS84 coordinate.")
        if not out or out[-1] != [lat, lon]:
            out.append([lat, lon])
    if len(out) > 1 and out[0] == out[-1]:
        out.pop()
    if len({tuple(p) for p in out}) < 3:
        raise ValueError("Site boundary needs at least three distinct vertices.")
    if len(out) > MAX_VERTICES:
        raise ValueError("Simplify the polygon to 1000 vertices or fewer.")
    return out

def request_payload(points_latlon, area_m2, country_code, language):
    area = float(area_m2)
    if not math.isfinite(area) or area <= 0:
        raise ValueError("Site area must be greater than zero.")
    country = str(country_code).strip().upper()
    if country not in {code for code, _ in COUNTRIES}:
        raise ValueError("Select the site country.")
    lang = str(language).strip().lower()
    if lang not in {code for code, _ in LANGUAGES}:
        raise ValueError("Select a supported report language.")
    return {"shape": {"type": "polygon", "points": normalize_ring_latlon(points_latlon)},
            "areaSize": round(area, 2), "countryCode": country, "language": lang}

def report_id_from_input(value):
    """Accept a GroundSurf report ID or the canonical HTTPS report URL only."""
    text = str(value or "").strip()
    if not text or len(text) > 1200:
        return ""
    if "://" in text:
        try:
            url = urlsplit(text)
            if (url.scheme != "https" or url.hostname not in
                    ("groundsurf.net", "www.groundsurf.net")
                    or url.port is not None or url.username is not None
                    or url.password is not None or url.path != "/report"):
                return ""
            params = parse_qs(url.query, keep_blank_values=True)
            identifiers = params.get("report_id", [])
            if len(identifiers) != 1:
                return ""
            text = identifiers[0]
        except ValueError:
            return ""
    return text if report_url({"id": text}) else ""


def report_url(report):
    value = report.get("id") if isinstance(report, dict) else None
    return REPORT_BASE_URL + value if isinstance(value, str) and re.fullmatch(r"[A-Za-z0-9_-]{6,100}", value) else ""

def _text(value, limit=2000):
    return value.strip()[:limit] if isinstance(value, str) else ""

def format_report_text(report, limit=16):
    """Safely show server text with no HTML or external link execution."""
    if not isinstance(report, dict) or not isinstance(report.get("report_data"), dict):
        raise ValueError("Unexpected report response.")
    data = report["report_data"]
    summary = data.get("summary")
    if isinstance(summary, dict):
        summary = summary.get("summary") or summary.get("text") or summary.get("interpretation")
    if not isinstance(summary, str):
        summary = "No site interpretation was provided."
    evidence = data.get("evidence_registry")
    evidence = evidence if isinstance(evidence, list) else []
    lines = ["GROUNDSURF • SITE INTELLIGENCE", _text(report.get("location_name"), 250) or "Selected site",
             "Preliminary screening only — not a site investigation.", "", "SITE INTERPRETATION", summary[:8000],
             "", "EVIDENCE • %d records" % len(evidence)]
    if not evidence:
        lines.append("No records returned. This does not mean there is no hazard.")
    def key(item):
        category = str(item.get("category", "")).lower() if isinstance(item, dict) else ""
        return 0 if "groundwater" in category or "hydrogeolog" in category else 1
    for i, item in enumerate(sorted(evidence, key=key)[:limit], 1):
        if not isinstance(item, dict):
            continue
        category = _text(item.get("category"), 80) or "Evidence"
        status = _text(item.get("status") or item.get("assessment_status"), 90) or "status unknown"
        claim = _text(item.get("claim") or item.get("description") or item.get("title"), 1500)
        source = _text(item.get("sourceName") or item.get("source_name"), 200)
        limitation = _text(item.get("limitation"), 500)
        lines.extend(["", "%d. %s [%s]" % (i, category, status)])
        if claim: lines.append(claim)
        if source: lines.append("Source: " + source)
        if limitation: lines.append("Limitation: " + limitation)
    if len(evidence) > limit:
        lines.append("\nShowing %d of %d records; open full report for details." % (limit, len(evidence)))
    checks = data.get("verification_checklist")
    if isinstance(checks, list) and checks:
        lines.extend(["", "STILL NEEDS CHECKING"])
        for item in checks[:8]:
            label = item if isinstance(item, str) else item.get("topic") or item.get("reason") or item.get("recommendation") if isinstance(item, dict) else ""
            if isinstance(label, str) and label.strip():
                lines.append("• " + label.strip()[:400])
    lines.extend(["", "Unknown data never means that a hazard is absent."])
    return "\n".join(lines)

