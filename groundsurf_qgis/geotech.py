"""Local geotechnical screening of the evidence in the open report."""
import json
import math
import re

from qgis.PyQt.QtCore import QLocale
from qgis.PyQt.QtGui import QColor, QPen
from qgis.PyQt.QtWidgets import (
    QDoubleSpinBox, QFormLayout, QGraphicsScene, QGraphicsView, QMessageBox, QPlainTextEdit,
    QPushButton, QTabWidget, QVBoxLayout, QWidget,
)

CHEMISTRY = re.compile(
    r"\bpH\b|sul[fp]h?at|siarczan|ammonium|amonow|magnesium|magnez|"
    r"aggressive.?CO2|aggressive carbon dioxide|agresywn.*(?:CO2|węgla)|hydrochem|"
    r"groundwater.?(?:quality|chemistry)|jakość wód podziemnych", re.I
)


def numeric(value):
    return type(value) in (int, float) and math.isfinite(value)


def level(item):
    """Mirror the report engine's explicit depth fields and evidence statuses."""
    values = item.get("value")
    if not isinstance(values, dict):
        return None
    status = item.get("status")
    if status not in ("VERIFIED", "MODELLED"):
        return None
    if not re.search(r"groundwater|water.table|piezomet|zwierciad|grundwasser",
                     " ".join(str(item.get(k, "")) for k in ("id", "category", "claim")), re.I):
        return None
    fields = ("groundwaterDepthM", "waterTableDepthM")
    if status == "MODELLED":
        fields = ("modelledGroundwaterDepthM",) + fields
    return next((values[k] for k in fields if numeric(values.get(k))), None)


def source_text(item):
    parts = [item.get(k) for k in ("sourceName", "id", "status", "claim")]
    value = item.get("value")
    if value is not None:
        parts.append(json.dumps(value, ensure_ascii=False, indent=2))
    parts.extend(item.get(k) for k in ("limitation", "sourceUrl"))
    return "\n".join(str(v) for v in parts if v)


class GeotechPanel(QWidget):
    def __init__(self, items, translate):
        super().__init__()
        self.t = t = translate
        self.items = items
        self.locale = QLocale("pl_PL" if t("en", "pl") == "pl" else "en_GB")
        layout = QVBoxLayout(self)
        form = QFormLayout()
        self.depth = QDoubleSpinBox()
        self.depth.setLocale(self.locale)
        self.depth.setRange(0, 1000)
        self.depth.setDecimals(2)
        self.depth.setSpecialValueText(t("Enter depth", "Podaj głębokość"))
        self.depth.setSuffix(" m")
        form.addRow(t("Excavation below site ground", "Wykop poniżej terenu działki"), self.depth)
        layout.addLayout(form)
        tabs = QTabWidget()
        layout.addWidget(tabs)
        self.water = QPlainTextEdit()
        self.water.setReadOnly(True)
        water_page = QWidget()
        water_layout = QVBoxLayout(water_page)
        self.section = QGraphicsScene(self)
        self.section_view = QGraphicsView(self.section)
        self.section_view.setMaximumHeight(170)
        water_layout.addWidget(self.section_view)
        water_layout.addWidget(self.water)
        tabs.addTab(water_page, t("Groundwater", "Wody podziemne"))
        chemistry = QPlainTextEdit()
        chemistry.setReadOnly(True)
        tabs.addTab(chemistry, t("Concrete exposure", "Agresywność wobec betonu"))
        guidance = t(
            "For the formation at excavation depth, check groundwater pH, sulfate, magnesium, ammonium and aggressive carbon dioxide. Verify sample depth, date, aquifer, units and method. Regional maps and water-body status provide context only.",
            "Dla warstwy na głębokości wykopu sprawdź pH wody, siarczany, magnez, jon amonowy i agresywny dwutlenek węgla. Sprawdź głębokość i datę pobrania, poziom wodonośny, jednostki i metodę. Mapy regionalne i stan części wód stanowią tło."
        )
        matches = [source_text(i) for i in items if CHEMISTRY.search(source_text(i))]
        heading = t("Related source records", "Powiązane dane źródłowe") if matches else t(
            "No matching chemistry records in this report. Concrete exposure remains undetermined.",
            "Brak powiązanych danych chemicznych w raporcie. Agresywność środowiska pozostaje nieokreślona.")
        chemistry.setPlainText("\n\n".join([guidance, heading] + matches))
        from qgis.utils import plugins
        ready = callable(getattr(plugins.get("sgems_export"), "open_workbench", None))
        button = QPushButton(t("Open SGeMS Workbench", "Otwórz SGeMS Workbench") if ready else
                             t("SGeMS Workbench installation", "Instalacja SGeMS Workbench"))
        button.clicked.connect(self.open_workbench)
        layout.addWidget(button)
        self.depth.valueChanged.connect(self.refresh)
        self.refresh()

    def refresh(self):
        t = self.t
        number = lambda x: self.locale.toString(float(x), 'f', 2)
        excavation = self.depth.value()
        lines = [t("Depths are relative to local ground at each source. Nearby wells may have different terrain elevations, aquifers and measurement dates.",
                   "Głębokości odniesiono do powierzchni terenu w miejscu każdego źródła. Rzędne terenu, poziomy wodonośne i daty pomiarów mogą się różnić.")]
        markers = []
        for item in self.items:
            depth = level(item)
            if depth is None:
                continue
            v = item["value"]
            label = t("Model estimate", "Wartość modelowana") if item["status"] == "MODELLED" else t("Source observation", "Obserwacja źródłowa")
            details = [label, str(item.get("sourceName") or item.get("id") or ""), number(depth) + " m"]
            for key in ("stationName", "monitoringPoint", "measurementDate"):
                if v.get(key):
                    details.append(str(v[key]))
            distance = v.get("stationDistanceKm", v.get("distanceKm"))
            if numeric(distance):
                details.append(number(distance) + " km")
            markers.append((depth, " · ".join(details[:3]), "#137689"))
            lines.append(" · ".join(details))
            if item.get("claim"):
                lines.append(str(item["claim"]))
            if excavation:
                lines.append(t("Excavation depth minus reported water depth", "Głębokość wykopu minus podana głębokość zwierciadła") + " = " + number(excavation - depth) + " m")
            if item.get("limitation"):
                lines.append(str(item["limitation"]))
        if not markers:
            lines.append(t("No comparable numeric groundwater depth in this report. Check the evidence tab for source descriptions or ranges.",
                           "W raporcie brak porównywalnej liczbowej głębokości zwierciadła. Sprawdź opisy i przedziały w danych źródłowych."))
        elif excavation:
            lines.append(t("A positive difference means the excavation is deeper on the two local depth scales. Confirm groundwater elevation and seasonal range at the site before interpreting an intersection.",
                           "Wynik dodatni oznacza większą głębokość wykopu przy porównaniu lokalnych skal. Przed oceną przecięcia zwierciadła sprawdź rzędną i wahania sezonowe wody na działce."))
        if excavation:
            markers.insert(0, (excavation, t("Excavation", "Wykop") + " · " + number(excavation) + " m", "#a95019"))
        self.draw_depths(markers)
        self.water.setPlainText("\n\n".join(lines))

    def draw_depths(self, markers):
        # Horizontal position represents depth. Each row has its own local ground reference.
        self.section.clear()
        self.section_view.setVisible(bool(markers))
        if not markers:
            return
        low = min(0, min(m[0] for m in markers))
        high = max(0, max(m[0] for m in markers))
        scale = 150 / max(high - low, 0.01)
        zero = 8 - low * scale
        self.section.addLine(zero, 4, zero, 20 * len(markers), QPen(QColor("#666666")))
        for row, (depth, label, colour) in enumerate(markers):
            y = 12 + row * 20
            end = zero + depth * scale
            pen = QPen(QColor(colour), 3)
            self.section.addLine(zero, y, end, y, pen)
            self.section.addEllipse(end - 2, y - 2, 4, 4, pen)
            self.section.addSimpleText(label).setPos(175, y - 10)
        self.section.setSceneRect(self.section.itemsBoundingRect())

    def open_workbench(self):
        from qgis.utils import plugins
        launch = getattr(plugins.get("sgems_export"), "open_workbench", None)
        if callable(launch):
            launch()
            return
        QMessageBox.information(self, "SGeMS Workbench", self.t(
            "In QGIS choose Plugins → Manage and Install Plugins → Install from ZIP. Select SGeMS-Workbench-0.4.0.zip and enable SGeMS Workbench. Return here to open it. Use a projected well-point layer with a measured property for kriging or simulation. The bundled modelling tools require 64-bit Intel/AMD Linux.",
            "W QGIS wybierz Wtyczki → Zarządzanie wtyczkami → Instaluj z ZIP. Wskaż SGeMS-Workbench-0.4.0.zip i włącz SGeMS Workbench. Wróć tutaj, aby go otworzyć. Do krigingu lub symulacji użyj punktów studni w układzie metrycznym z polem pomiarowym. Dołączone narzędzia modelowania wymagają 64-bitowego systemu Linux Intel/AMD."))
