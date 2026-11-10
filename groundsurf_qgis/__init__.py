"""GroundSurf Site Intelligence: experimental QGIS plugin."""
def classFactory(iface):
    from .plugin import GroundSurfPlugin
    return GroundSurfPlugin(iface)

