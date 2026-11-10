"""Incremental reader for GroundSurf's UTF-8 analysis stream or JSON response."""
import json
from .core import MAX_RESPONSE_BYTES


class AnalysisStream:
    def __init__(self):
        self.pending = bytearray()
        self.total = 0
        self.result = None
        self.stage = None
        self.source = None
        self.finding = None

    def feed(self, chunk):
        self.total += len(chunk)
        if self.total > MAX_RESPONSE_BYTES:
            raise ValueError("Response exceeds the size limit.")
        self.pending.extend(chunk)
        if self.pending.lstrip().startswith(b"{"):
            return
        # Normalise after appending so CRLF split over reads is also recognised.
        self.pending[:] = self.pending.replace(b"\r\n", b"\n")
        while True:
            end = self.pending.find(b"\n\n")
            if end < 0:
                break
            frame = bytes(self.pending[:end])
            del self.pending[:end+2]
            event, lines = None, []
            for line in frame.splitlines():
                if line.startswith(b"event:"):
                    event = line[6:].strip()
                if line.startswith(b"data:"):
                    lines.append(line[5:].lstrip())
            if event not in (b"progress",b"result",b"error"):
                continue
            data = json.loads(b"\n".join(lines))
            if not isinstance(data,dict):
                raise ValueError("Invalid GroundSurf event")
            if event == b"error":
                raise ValueError(str(data.get("error") or "Provider failure"))
            if event == b"result":
                self.result = data
            elif data.get("kind") == "stage":
                self.stage = data.get("stageKey")
            elif data.get("kind") == "source":
                self.source = data.get("sourceName")
            elif data.get("kind") == "finding":
                self.finding = data

    def finish(self):
        if self.pending.lstrip().startswith(b"{"):
            self.result = json.loads(bytes(self.pending))
        if not isinstance(self.result,dict) or not self.result.get("report_data"):
            raise ValueError("Incomplete GroundSurf report")
        return self.result

