"""Native report reader. Source text is always rendered as plain text."""
import json

from qgis.PyQt.QtCore import Qt, QUrl
from qgis.PyQt.QtGui import QDesktopServices
from qgis.PyQt.QtWidgets import (QFileDialog, QDialog, QHBoxLayout, QLabel, QLineEdit,
    QListWidget, QListWidgetItem, QPlainTextEdit, QPushButton, QSplitter,
    QTabWidget, QVBoxLayout, QWidget)


def pretty(value):
    if isinstance(value, str):
        return value
    return json.dumps(value, ensure_ascii=False, indent=2)


def water_first(item):
    key = (str(item.get("category", "")) + " " + str(item.get("id", ""))).lower()
    return not any(word in key for word in ("groundwater", "hydrogeol", "piezom", "wody podziem"))


def records(report):
    entries = report["report_data"].get("evidence_registry")
    return sorted((x for x in (entries if isinstance(entries,list) else [])
                   if isinstance(x, dict)), key=water_first)


def summary(report):
    pl = report.get("language") == "pl"
    data = report["report_data"]
    items = records(report)
    lines = [report["id"], "Interpretacja terenu" if pl else "Site interpretation"]
    waters = [x for x in items if not water_first(x) and x.get("claim")]
    if waters:
        for item in waters[:2]:
            v = item.get("value") or {}
            if pl and item.get("id")=="pl-pgi-groundwater-level" and isinstance(v,dict) and all(isinstance(v.get(k),(float,int)) for k in ("groundwaterDepthM","distanceKm")):
                lines.append(("PIG-PIB odnotował głębokość zwierciadła wody %.2f m p.p.t. w punkcie %s, około %.2f km od wybranego terenu (pomiar %s)." %
                              (v["groundwaterDepthM"], v.get("monitoringPoint") or "PIG-PIB",v["distanceKm"],v.get("measurementDate") or "—")).replace(".",",").replace("p,p,t,", "p.p.t.").rstrip(",")+".")
                lines.append("Głębokość na działce oraz zakres wahań sezonowych wymagają sprawdzenia.")
                continue
            if pl and item.get("status")=="REQUIRES_VERIFICATION":
                lines.append("Do sprawdzenia · "+str(item.get("sourceName") or item.get("id")))
                continue
            lines.extend([item["claim"], str(item.get("sourceName") or ""), str(item.get("limitation") or "")])
    else:
        lines.append("Poziom wód podziemnych na działce pozostaje nieznany." if pl else "Groundwater depth at the site is unknown.")
    value = data.get("summary")
    if isinstance(value, dict):
        value = value.get("summary") or value.get("text") or value.get("interpretation")
    if isinstance(value, str):
        lines.append(value)
    lines.append(("Dane źródłowe" if pl else "Evidence records") + " (%d)" % len(items))
    for item in items[:4]:
        lines.append(" · ".join(str(item[k]) for k in ("id","sourceName","status") if item.get(k)))
    checks = data.get("verification_checklist")
    if isinstance(checks,list) and checks:
        lines.append("Co jeszcze sprawdzić" if pl else "What still needs checking")
        for check in checks[:3]:
            if isinstance(check,dict):
                lines.append(" · ".join(str(check[k]) for k in ("topic","reason","recommendedAuthorityOrExpert") if check.get(k)))
            elif isinstance(check,str):
                lines.append(check)
    return "\n\n".join(x for x in lines if x)


class ReportWindow(QDialog):
    def __init__(self, owner, report):
        super().__init__(owner.dock)
        self.owner = owner
        self.report = report
        self.items = records(report)
        t = owner.tr2
        self.setWindowTitle("GroundSurf · " + report["id"])
        self.resize(740, 570)
        layout = QVBoxLayout(self)
        tabs = QTabWidget()
        layout.addWidget(tabs)
        self.tabs = tabs
        self.overview = QPlainTextEdit(summary(report))
        self.overview.setReadOnly(True)
        tabs.addTab(self.overview, t("Interpretation","Interpretacja"))
        evidence = QWidget()
        form = QVBoxLayout(evidence)
        self.search = QLineEdit()
        self.search.setPlaceholderText(t("Search all evidence","Szukaj we wszystkich danych"))
        form.addWidget(self.search)
        split = QSplitter(Qt.Vertical)
        self.list = QListWidget()
        self.detail = QPlainTextEdit()
        self.detail.setReadOnly(True)
        split.addWidget(self.list)
        split.addWidget(self.detail)
        form.addWidget(split)
        row = QHBoxLayout()
        form.addLayout(row)
        self.source = QPushButton(t("Open source","Otwórz źródło"))
        self.source.clicked.connect(self.open_source)
        row.addWidget(self.source)
        show_map = QPushButton(t("Show evidence on map","Pokaż dane na mapie"))
        show_map.clicked.connect(lambda: owner.map_evidence(self))
        row.addWidget(show_map)
        tabs.addTab(evidence, t("Evidence","Dane źródłowe") + " (%d)" % len(self.items))
        self.search.textChanged.connect(self.filter_items)
        self.list.currentItemChanged.connect(self.select)
        self.filter_items("")
        for label, key in [(t("Checks","Co sprawdzić"),"verification_checklist"),
                           (t("History","Historia"),"local_historical_leads"),
                           (t("Terrain","Teren"),"technical_parameters")]:
            value = report["report_data"].get(key)
            if value:
                box = QPlainTextEdit(pretty(value))
                box.setReadOnly(True)
                tabs.addTab(box, label)
        full = QPlainTextEdit(pretty(report))
        full.setReadOnly(True)
        tabs.addTab(full, t("Full record","Pełny rekord"))
        research = QWidget()
        research_layout = QVBoxLayout(research)
        research_button = QPushButton(t("Find published studies","Znajdź publikacje dotyczące okolicy"))
        self.research_text = QPlainTextEdit()
        self.research_text.setReadOnly(True)
        research_layout.addWidget(research_button)
        research_layout.addWidget(self.research_text)
        research_button.clicked.connect(self.find_studies)
        tabs.addTab(research,t("Research","Publikacje"))
        self.question = QLineEdit()
        self.question.setPlaceholderText(t("Ask about this report","Zadaj pytanie o ten raport"))
        row = QHBoxLayout()
        row.addWidget(self.question)
        ask = QPushButton(t("Ask","Zapytaj"))
        ask.clicked.connect(self.ask)
        self.question.returnPressed.connect(self.ask)
        row.addWidget(ask)
        layout.addLayout(row)
        self.answer = QPlainTextEdit()
        self.answer.setReadOnly(True)
        self.answer.hide()
        layout.addWidget(self.answer)
        row = QHBoxLayout()
        for title, action in [(t("Save JSON","Zapisz JSON"),owner.save_record),
                              (t("Evidence manifest","Manifest danych"),lambda: owner.save_record(manifest=True)),
                              ("PDF",self.export_pdf),(t("Embed","Osadź"),lambda: owner.share(embed=True)),
                              (t("Copy share link","Kopiuj link udostępniania"),owner.share)]:
            button = QPushButton(title)
            button.clicked.connect(action)
            row.addWidget(button)
        layout.addLayout(row)

    def find_studies(self):
        from urllib.parse import urlencode
        report = self.report
        if any(report.get(key) is None for key in ("latitude","longitude","country_code")):
            return
        params = {"country":report["country_code"],"lat":report["latitude"],"lng":report["longitude"]}
        self.research_text.setPlainText(self.owner.tr2("Looking up publications…","Wyszukiwanie publikacji…"))
        def complete(data):
            note = self.owner.tr2("Regional references. Check study boundaries and relevance.","Materiały regionalne. Sprawdź granice badań i ich związek z lokalizacją.")
            self.research_text.setPlainText(note+"\n\n"+pretty(data.get("items") or []))
        self.owner.service("research","/api/research/discover?"+urlencode(params),None,complete,self.research_text.setPlainText)

    def export_pdf(self):
        from qgis.PyQt.QtGui import QTextDocument
        from qgis.PyQt.QtPrintSupport import QPrinter
        path,_ = QFileDialog.getSaveFileName(self,"GroundSurf PDF",self.report["id"]+".pdf","PDF (*.pdf)")
        if path:
            printer = QPrinter(QPrinter.HighResolution)
            printer.setOutputFormat(QPrinter.PdfFormat)
            printer.setOutputFileName(path)
            doc = QTextDocument()
            parts = [self.overview.toPlainText()]
            for item in self.items:
                parts.append("\n".join(str(item[k]) for k in ("id","category","claim","sourceName","datasetDate","sourceUrl","spatialRelationship","calculationMethod","limitation") if item.get(k)))
            doc.setPlainText("\n\n".join(parts))
            doc.print_(printer)

    def ask(self):
        question = self.question.text().strip()
        if not question:
            return
        self.answer.show()
        self.answer.setPlainText(self.owner.tr2("Requesting answer…","Pobieranie odpowiedzi…"))
        def complete(data):
            self.answer.setPlainText(str(data.get("answer") or self.owner.tr2("No answer returned.","Brak odpowiedzi.")) +
                                    "\n" + "\n".join(map(str,data.get("unknowns") or [])))
        self.owner.service("ask","/api/ai/ask",{"report":self.report,"question":question,
                           "language":self.owner.language.currentData()},complete,self.answer.setPlainText)

    def filter_items(self, query):
        self.list.clear()
        for idx, record in enumerate(self.items):
            if query.casefold() in pretty(record).casefold():
                item = QListWidgetItem(" · ".join(str(record.get(k) or "") for k in ("id","sourceName","category")))
                item.setData(Qt.UserRole, idx)
                self.list.addItem(item)
        self.list.setCurrentRow(0)

    def select(self, item, old=None):
        record = self.items[item.data(Qt.UserRole)] if item else {}
        t = self.owner.tr2
        body = []
        for k,label in [("claim",t("Finding","Ustalenie")),("status",t("Assessment","Status")),("sourceName",t("Source","Źródło")),("datasetDate",t("Date","Data")),("spatialRelationship",t("Location","Lokalizacja")),("calculationMethod",t("Method","Metoda")),("limitation",t("Limitation","Ograniczenie")),("value",t("Source values","Wartości źródłowe")),("id","ID")]:
            if record.get(k) is not None:
                body.append(label+"\n"+pretty(record[k]))
        self.detail.setPlainText("\n\n".join(body))
        self.url = QUrl(str(record.get("sourceUrl") or ""))
        self.source.setEnabled(self.url.scheme() in ("http","https") and bool(self.url.host()))
        if item:
            self.owner.highlight_record(item.data(Qt.UserRole))

    def open_source(self):
        if self.source.isEnabled():
            QDesktopServices.openUrl(self.url)

