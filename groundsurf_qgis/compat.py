"""Field and geometry enums across supported QGIS 3 releases."""
from qgis.PyQt.QtCore import QMetaType
from qgis.core import Qgis

if Qgis.QGIS_VERSION_INT >= 33000:
    POLYGON_GEOMETRY = Qgis.GeometryType.Polygon
else:
    from qgis.core import QgsWkbTypes
    POLYGON_GEOMETRY = QgsWkbTypes.GeometryType.PolygonGeometry

if Qgis.QGIS_VERSION_INT >= 33800:
    FIELD_TEXT = QMetaType.Type.QString
    FIELD_INTEGER = QMetaType.Type.Int
else:
    # Let Qt 5 infer the field type from a representative Python value.
    from qgis.PyQt.QtCore import QVariant
    FIELD_TEXT = QVariant("").type()
    FIELD_INTEGER = QVariant(0).type()
