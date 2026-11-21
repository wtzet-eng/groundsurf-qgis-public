"""Scoped native styling and safe, readable report text."""
from html import escape
import re

from qgis.PyQt.QtWidgets import QTextBrowser, QScrollArea


STYLE = """
QWidget#groundsurfPanel, QDialog#groundsurfReader { background: #212121; color: #ecf2ed; }
QWidget#groundsurfPanel QLabel, QDialog#groundsurfReader QLabel { color: #ecf2ed; background: transparent; }
QWidget#groundsurfPanel QLabel#brand, QDialog#groundsurfReader QLabel#brand { font-size: 24px; font-weight: 600; color: #b4d5bd; }
QWidget#groundsurfPanel QLabel#hint, QDialog#groundsurfReader QLabel#hint { color: #c4cec6; font-size: 11px; }
QWidget#groundsurfPanel QLabel#siteCard { background: #2c3830; border: 1px solid #496451; border-radius: 7px; padding: 10px; }
QPushButton, QToolButton { background: #34483b; color: #f6faf7; border: 1px solid #56695c; border-radius: 5px; padding: 7px 9px; }
QPushButton:hover, QToolButton:hover { background: #45674e; border-color: #93b49b; }
QPushButton:focus, QToolButton:focus, QLineEdit:focus, QComboBox:focus { border: 2px solid #99c2a3; }
QPushButton:disabled, QToolButton:disabled { background: #303632; color: #9ba69e; border-color: #404b43; }
QPushButton#primary { background: #38704c; border-color: #6a9979; font-weight: 600; padding: 11px; }
QPushButton#primary:hover { background: #44875b; }
QPushButton:checked { background: #466e52; }
QLineEdit, QComboBox, QSpinBox { background: #f5f7f4; color: #202b24; border: 1px solid #899c8d; border-radius: 4px; padding: 7px; }
QComboBox QAbstractItemView { background: #f5f7f4; color: #202b24; selection-background-color: #d0e5d5; selection-color: #142a1d; }
QTextBrowser, QPlainTextEdit, QListWidget { background: #f5f7f4; color: #253329; border: 0; border-radius: 6px; selection-background-color: #b7d6bf; selection-color: #17251c; }
QListWidget::item { padding: 9px; border-bottom: 1px solid #dce3db; }
QListWidget::item:selected { background: #cfe2d3; color: #17251c; }
QCheckBox { color: #e5ece6; spacing: 7px; }
QScrollArea, QScrollArea > QWidget > QWidget { background: transparent; border: 0; }
QMenu { background: #f5f7f4; color: #202b24; padding: 5px; }
QMenu::item { padding: 7px 18px; }
QMenu::item:selected { background: #cfe2d3; }
QSplitter::handle { background: #46564b; }
"""


class SiteForm(QScrollArea):
    """Follow newly visible controls instead of QScrollArea's cached size hint."""

    def sizeHint(self):
        hint = super().sizeHint()
        if self.widget():
            hint.setHeight(min(460, self.widget().layout().sizeHint().height() + 8))
        return hint


class ReportText(QTextBrowser):
    """Accept the existing plain-text API, escaping every service-supplied value."""

    def __init__(self, text="", parent=None):
        super().__init__(parent)
        self.setOpenLinks(False)
        self.setOpenExternalLinks(False)
        self.document().setDocumentMargin(18)
        self.setPlainText(text)

    def setPlainText(self, text):
        paragraphs = str(text).split("\n\n")
        body = []
        headings = {"Groundwater", "Wody podziemne", "Site interpretation", "Interpretacja terenu",
                    "What still needs checking", "Co jeszcze sprawdzić", "Evidence records", "Dane źródłowe"}
        labels = {"Finding", "Ustalenie", "Assessment", "Status", "Source", "Źródło", "Date", "Data",
                  "Location", "Lokalizacja", "Method", "Metoda", "Limitation", "Ograniczenie",
                  "Source values", "Wartości źródłowe", "ID"}
        for paragraph in paragraphs:
            first, separator, rest = paragraph.partition("\n")
            if paragraph in headings:
                body.append('<h3 style="color:#31583d; margin-top:16px">' + escape(paragraph) + '</h3>')
            else:
                content = escape(paragraph).replace("\n", "<br>")
                if separator and first in labels:
                    content = '<b style="color:#31583d">' + escape(first) + '</b><br>' + escape(rest).replace("\n", "<br>")
                content = re.sub(r"\*\*([^*\n]+)\*\*", r"<b>\1</b>", content)
                body.append('<p style="line-height:145%; margin-bottom:13px">' + content + '</p>')
        self.setHtml('<html><body style="font-size:13px; color:#253329">' + ''.join(body) + '</body></html>')
