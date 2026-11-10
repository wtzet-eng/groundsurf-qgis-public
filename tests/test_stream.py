import json
import unittest

from groundsurf_qgis.stream import AnalysisStream
from groundsurf_qgis.core import MAX_RESPONSE_BYTES


class AnalysisStreamTests(unittest.TestCase):
    def test_split_utf8_frame_heartbeat_and_result(self):
        stream = AnalysisStream()
        report = {"id":"REP-PL-123","report_data":{"summary":"Łąka"}}
        wire = (': heartbeat\r\n\r\nevent: progress\r\ndata: {"kind":"stage","stageKey":"terrain"}\r\n\r\n'
                'event: result\r\ndata: '+json.dumps(report,ensure_ascii=False)+'\r\n\r\n').encode()
        for byte in wire:
            stream.feed(bytes([byte]))
        self.assertEqual(stream.finish(),report)
        self.assertEqual(stream.stage,"terrain")

    def test_truncated_stream(self):
        stream = AnalysisStream()
        stream.feed(b'event: progress\ndata: {"kind":"stage"}\n\nevent: result\ndata: {"id"')
        with self.assertRaisesRegex(ValueError,"Incomplete"):
            stream.finish()

    def test_provider_error(self):
        with self.assertRaisesRegex(ValueError,"Provider failure"):
            AnalysisStream().feed(b'event: error\ndata: {}\n\n')

    def test_invalid_utf8_and_json(self):
        for bad in (b'\xff',b'[]',b'{"report"'):
            reader = AnalysisStream()
            with self.assertRaises(ValueError):
                reader.feed(b'event: result\ndata: '+bad+b'\n\n')
                reader.finish()

    def test_response_budget(self):
        with self.assertRaises(ValueError):
            AnalysisStream().feed(b'a'*(MAX_RESPONSE_BYTES+1))

    def test_json_fallback(self):
        reader = AnalysisStream()
        reader.feed(b'{"report_data":')
        reader.feed(b'{"summary":"Records"}}')
        self.assertEqual(reader.finish()["report_data"]["summary"],"Records")

