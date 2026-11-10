"""Run the same bundled, offline export function as the web client."""
import json
from pathlib import Path


def evidence_manifest(report, language, created_at):
    script = Path(__file__).with_suffix(".js").read_text(encoding="utf-8")
    # Encode data as a JSON string argument. Report contents are never executable code.
    script = "if (!Object.entries) Object.entries = function(o){return Object.keys(o).map(function(k){return [k,o[k]];});};\n"+script
    argument = json.dumps(json.dumps([report, created_at, language]))
    expression = "JSON.stringify(GroundSurfExport.createGroundSurfEvidenceManifest.apply(null, JSON.parse(" + argument + ")))"
    try:
        from qgis.PyQt.QtQml import QJSEngine
    except ImportError:
        try:
            from qgis.PyQt.QtWebKitWidgets import QWebPage
        except ImportError as exc:
            raise ValueError("This QGIS build needs QtQml or QtWebKit for manifest export.") from exc
        page = QWebPage()
        evaluate = page.mainFrame().evaluateJavaScript
        evaluate(script)
        result = evaluate(expression)
    else:
        engine = QJSEngine()
        engine.evaluate(script)
        result = engine.evaluate(expression).toString()
    if not isinstance(result,str):
        raise ValueError("The evidence exporter could not read this report.")
    return json.loads(result)

