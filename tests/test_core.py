"""Unit tests that run without QGIS and without making any API calls."""
import unittest

from groundsurf_qgis.core import (
    MAX_VERTICES, COUNTRIES, COUNTRY_LANGUAGE, LANGUAGES,
    available_languages, format_report_text, geocoder_search_url,
    normalize_ring_latlon, parse_geocoder_results,
    preferred_language, report_url, request_payload,
)

RING = [(52.0, 13.0), (52.001, 13.0), (52.001, 13.002), (52.0, 13.0)]


class GroundSurfCoreTests(unittest.TestCase):
    def test_address_query_encodes_polish_and_limits_results(self):
        url = geocoder_search_url("  Rynek Główny, Kraków  ")
        self.assertIn("q=Rynek+G%C5%82%C3%B3wny", url)
        self.assertIn("limit=5", url)

    def test_address_search_rejects_empty_or_insecure_endpoint(self):
        for query in ("", "a", "b" * 221):
            with self.assertRaises(ValueError):
                geocoder_search_url(query)
        with self.assertRaises(ValueError):
            geocoder_search_url("Kraków", "http://example.org/api")

    def test_address_search_extracts_lon_lat_and_country(self):
        response = {"features": [
            {"type": "Feature", "geometry": {"type": "Point", "coordinates": [19.9371, 50.0615]},
             "properties": {"name": "Rynek Główny", "city": "Kraków", "country": "Polska", "countrycode": "PL"}},
            {"type": "Feature", "geometry": {"type": "Point", "coordinates": [200.0, 50.0]},
             "properties": {"name": "Invalid"}},
        ]}
        result = parse_geocoder_results(response)
        self.assertEqual(len(result), 1)
        self.assertEqual(result[0]["lat"], 50.0615)
        self.assertEqual(result[0]["lon"], 19.9371)
        self.assertEqual(result[0]["country"], "PL")
        self.assertIn("Kraków", result[0]["label"])

    def test_address_search_rejects_unknown_data(self):
        with self.assertRaises(ValueError):
            parse_geocoder_results({"features": "not-an-array"})
        self.assertEqual(parse_geocoder_results({"features": []}), [])

    def test_poland_native_language_is_first(self):
        entries = available_languages("PL")
        self.assertEqual([code for code, _ in entries[:2]], ["pl", "en"])
        self.assertEqual(preferred_language("PL", system_language="de-DE"), "pl")

    def test_germany_and_france_native_first(self):
        self.assertEqual(available_languages("DE")[0][0], "de")
        self.assertEqual(available_languages("FR")[0][0], "fr")
        self.assertEqual(preferred_language("FR", system_language="en-US"), "fr")

    def test_remembered_explicit_choice_wins(self):
        self.assertEqual(preferred_language("PL", explicit_language="en", system_language="de"), "en")
        self.assertEqual(preferred_language("DE", explicit_language="pl", system_language="de"), "pl")

    def test_system_language_only_when_country_not_selected(self):
        self.assertEqual(preferred_language("", system_language="de_DE"), "de")
        self.assertEqual(preferred_language("", system_language="nb_NO"), "no")
        self.assertEqual(preferred_language("PL", system_language="de_DE"), "pl")

    def test_unsupported_national_language_uses_qgis_locale(self):
        self.assertEqual(preferred_language("GR", system_language="de"), "de")
        self.assertEqual(preferred_language("BG", system_language="pl"), "pl")

    def test_us_language_list_matches_web(self):
        self.assertEqual({code for code, _ in available_languages("US")}, {"en", "de", "pl"})
        self.assertEqual(preferred_language("US", explicit_language="fr"), "en")

    def test_country_language_and_code_registry_consistency(self):
        known = {code for code, _ in COUNTRIES}
        allowed = {code for code, _ in LANGUAGES}
        self.assertTrue(set(COUNTRY_LANGUAGE).issubset(known))
        self.assertTrue(set(COUNTRY_LANGUAGE.values()).issubset(allowed))
        self.assertEqual(len(allowed), 26)
        self.assertEqual(len(allowed), len(LANGUAGES))

    def test_ring_removes_close_vertex(self):
        self.assertEqual(len(normalize_ring_latlon(RING)), 3)

    def test_request_contract_uses_lat_lon_and_area(self):
        p = request_payload(RING, 444.123, "DE", "de")
        self.assertEqual(p["shape"]["type"], "polygon")
        self.assertEqual(p["shape"]["points"][0], [52.0, 13.0])
        self.assertEqual(p["areaSize"], 444.12)
        self.assertEqual(p["countryCode"], "DE")
        self.assertEqual(p["language"], "de")

    def test_too_few_vertices(self):
        with self.assertRaisesRegex(ValueError, "three"):
            normalize_ring_latlon([(1, 2), (2, 3), (1, 2)])

    def test_nan_coordinate(self):
        with self.assertRaises(ValueError):
            normalize_ring_latlon([(0, 0), (1, float("nan")), (1, 1)])

    def test_invalid_latitude(self):
        with self.assertRaises(ValueError):
            normalize_ring_latlon([(91, 0), (0, 1), (0, 0)])

    def test_too_many_vertices(self):
        with self.assertRaisesRegex(ValueError, "1000"):
            normalize_ring_latlon([(10 + i / 100000, 11 + i / 100000) for i in range(MAX_VERTICES + 1)])

    def test_invalid_area(self):
        with self.assertRaises(ValueError):
            request_payload(RING, 0, "DE", "en")

    def test_invalid_country(self):
        with self.assertRaises(ValueError):
            request_payload(RING, 10, "XX", "en")

    def test_language_independent_from_country(self):
        p = request_payload(RING, 10, "FR", "pl")
        self.assertEqual(p["language"], "pl")

    def test_report_link(self):
        self.assertEqual(report_url({"id": "REP-DE-TEST123"}), "https://groundsurf.net/report?report_id=REP-DE-TEST123")

    def test_suspicious_report_id_is_rejected(self):
        self.assertEqual(report_url({"id": "x&other=evil"}), "")

    def test_no_evidence_is_not_no_hazard(self):
        content = format_report_text({"report_data": {"summary": "Partial coverage."}, "location_name": "Test"})
        self.assertIn("does not mean there is no hazard", content)

    def test_groundwater_evidence_first_and_limit(self):
        report = {"report_data": {"summary": "Preliminary", "evidence_registry": [
            {"category": "flood", "claim": "Flood record"},
            {"category": "groundwater", "claim": "Nearby well", "status": "VERIFIED", "limitation": "Not at site"},
        ]}}
        text = format_report_text(report, limit=1)
        self.assertIn("Nearby well", text)
        self.assertIn("Not at site", text)
        self.assertNotIn("Flood record", text)
        self.assertIn("Showing 1 of 2", text)

    def test_unknown_response_format(self):
        with self.assertRaises(ValueError):
            format_report_text({"summary": "No report_data"})

    def test_html_is_not_executed(self):
        content = format_report_text({"report_data": {"summary": "<script>bad()</script>"}})
        self.assertIn("<script>", content)  # intentionally plain text (not HTML widget)


if __name__ == "__main__":
    unittest.main()

