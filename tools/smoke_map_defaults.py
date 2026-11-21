"""Fixture checks for automatic map/search defaults, stale results and data safety."""
import json
import threading
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, urlparse, urlencode

from smoke_qgis_network import FakeIface, FakeSettings, until
from qgis.PyQt.QtCore import pyqtSignal, QObject
from qgis.PyQt.QtWidgets import QLabel
from qgis.core import (QgsApplication, QgsCoordinateReferenceSystem, QgsDataSourceUri,
                       QgsProject, QgsRectangle, QgsVectorLayer)
from groundsurf_qgis import plugin as mod, actions
from groundsurf_qgis.basemap import Basemap
from groundsurf_qgis.presentation import ReportText
from groundsurf_qgis.version import USER_AGENT


class Signals(QObject):
    newProjectCreated = pyqtSignal()


class Service(BaseHTTPRequestHandler):
    queries = []
    parcels = 0

    def log_message(self, *_):
        pass

    def do_GET(self):
        if self.path.startswith('/api/cadastre'):
            Service.parcels += 1
            body = {'success': False, 'reasonCode': 'SOURCE_UNAVAILABLE'}
        else:
            query = parse_qs(urlparse(self.path).query)['q'][0]
            Service.queries.append(query)
            if query == 'slow':
                time.sleep(.5)
            body = {'features': [{'geometry': {'type': 'Point', 'coordinates': [19.937, 50.061]},
                                 'properties': {'name': query, 'city': 'Kraków', 'countrycode': 'PL',
                                                'housenumber': '1' if query == 'precise' else None}}]}
        raw = json.dumps(body).encode()
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(raw)))
        self.end_headers()
        try:
            self.wfile.write(raw)
        except (BrokenPipeError, ConnectionResetError):
            pass


def main():
    app = QgsApplication([], False)
    app.initQgis()
    project = QgsProject.instance()
    project.clear()
    iface = FakeIface()
    iface.canvas.setRenderFlag(False)
    signals = Signals()
    iface.newProjectCreated = signals.newProjectCreated
    settings = FakeSettings()
    settings.store.clear()
    # The canvas stays hidden, so these provider checks do not fetch tiles.
    errors = []
    basemap = Basemap(iface, settings, lambda: errors.append('map unavailable'))
    basemap.start()
    assert len(project.mapLayers()) == 1
    osm = basemap.add()
    assert len(project.mapLayers()) == 1 and osm.isValid()
    uri = QgsDataSourceUri()
    uri.setEncodedUri(osm.source())
    assert uri.httpHeaders().headers().get('User-Agent') == USER_AGENT
    assert project.crs().authid() == 'EPSG:3857'
    iface.canvas.setLayers([osm])
    assert not basemap.credit.isHidden()
    assert 'OpenStreetMap' in basemap.credit.text()
    iface.canvas.renderErrorOccurred.emit('provider fixture', osm)
    assert errors == ['map unavailable']
    basemap.close()
    iface.canvas.renderErrorOccurred.emit('provider fixture', osm)
    assert len(errors) == 1
    assert not basemap.credit.isHidden(), 'Attribution must survive unload'
    iface.canvas.setLayers([])
    project.clear()
    # Existing user content keeps its CRS, extent, style and custom ordering.
    user_layer = QgsVectorLayer('Point?crs=EPSG:2180', 'Existing project', 'memory')
    project.setCrs(QgsCoordinateReferenceSystem('EPSG:2180'))
    project.addMapLayer(user_layer)
    root = project.layerTreeRoot()
    root.setHasCustomLayerOrder(True)
    root.setCustomLayerOrder([user_layer])
    iface.canvas.setDestinationCrs(project.crs())
    iface.canvas.setExtent(QgsRectangle(400000, 300000, 402000, 302000))
    previous_extent = iface.canvas.extent().toString()
    color = user_layer.renderer().symbol().color().name()
    basemap.start()
    assert len(project.mapLayers()) == 1
    osm = basemap.add()
    assert root.customLayerOrder() == [user_layer, osm]
    assert project.crs().authid() == 'EPSG:2180'
    assert iface.canvas.extent().toString() == previous_extent
    assert user_layer.renderer().symbol().color().name() == color
    basemap.close()
    project.clear()
    settings.setValue('GroundSurfQGIS/auto_map', False)
    basemap.start()
    assert not project.mapLayers()
    basemap.close()
    settings.setValue('GroundSurfQGIS/auto_map', True)
    signals.newProjectCreated.emit()
    assert not project.mapLayers(), 'Unloaded plugin must not add a map'
    assert len(iface.canvas.findChildren(QLabel, 'groundsurfMapAttribution')) == 1

    http = ThreadingHTTPServer(('127.0.0.1', 0), Service)
    threading.Thread(target=http.serve_forever, daemon=True).start()
    base = 'http://127.0.0.1:%d' % http.server_port
    mod.QgsSettings = FakeSettings
    mod.geocoder_search_url = lambda query, endpoint: base + '/search?' + urlencode({'q': query})
    actions.API_BASE = base
    plugin = mod.GroundSurfPlugin(iface)
    plugin._create_panel()
    try:
        iface.win.resize(1100, 800)
        iface.win.show()
        plugin.dock.show()
        app.processEvents()
        initial_form_height = plugin.form.height()
        plugin.address_input.setText('slow')
        plugin.search_address(automatic=True)
        until(lambda: 'slow' in Service.queries)
        plugin.address_input.setText('new town')
        plugin._address_edited('new town')
        until(lambda: plugin._search_reply is None)
        assert plugin.address_results.count() == 1, 'Stale suggestion ignored'
        plugin._suggest_timer.stop()
        plugin._search_last_at = 0
        plugin.search_address(automatic=True)
        until(lambda: plugin._search_reply is None)
        assert plugin.address_results.currentIndex() == 0, 'Suggestions never choose a site silently'
        app.processEvents()
        assert plugin.form.height() > initial_form_height, 'New suggestions must not hide the boundary controls'
        plugin.address_results.setCurrentIndex(1)
        assert plugin.country.currentData() == 'PL'
        assert plugin.language.currentData() == 'pl'
        assert Service.parcels == 0, 'A town match cannot choose an official parcel'
        assert not plugin.radius_button.isHidden()
        plugin.use_address_radius()
        assert plugin.circle['radius'] == 50
        plugin.address_input.setText('precise')
        plugin._address_edited('precise')
        plugin._suggest_timer.stop()
        plugin._search_last_at = 0
        plugin.search_address(automatic=True)
        until(lambda: plugin._search_reply is None)
        plugin.address_results.setCurrentIndex(1)
        until(lambda: not plugin.jobs)
        assert Service.parcels == 1
        assert plugin._geometry is None and not plugin.radius_button.isHidden()
        assert 'SOURCE_UNAVAILABLE' in plugin.progress.text()
        # Cache hit does not make another provider request.
        before = len(Service.queries)
        plugin.search_address(automatic=True)
        assert len(Service.queries) == before
        plugin.address_input.setText('slow')
        plugin._search_last_at = 0
        plugin.search_address()
        plugin._address_search_timeout()
        until(lambda: plugin._search_reply is None)
        assert 'Upłynął' in plugin.progress.text()
        plugin.auto_search.setChecked(False)
        plugin._address_edited('disabled suggestions')
        assert not plugin._suggest_timer.isActive()
        # Remote strings remain text; never images, scripts or automatic links.
        text = ReportText('<img src="https://example.org/tracker">\n\n<script>unsafe()</script>')
        assert '<img src=' in text.toPlainText() and '<script>' in text.toPlainText()
        assert '<img ' not in text.toHtml() and not text.openExternalLinks()
        plugin.zoom_site()  # No selected geometry: friendly validation, no exception.
        plugin.progress.setText('Report status')
        plugin._map_unavailable()
        assert plugin.progress.text() == 'Report status', 'A map outage cannot overwrite report status'
        print('PASS: empty-project OSM, attribution/unload, existing project preservation, deduplication, defaults off, stale suggestions, explicit result selection, precise-address parcel, radius fallback, cache, search timeout, escaped report text.')
    finally:
        plugin.unload()
        iface.canvas.setLayers([])
        iface.win.close()
        app.processEvents()
        project.clear()
        http.shutdown()
        http.server_close()


if __name__ == '__main__':
    main()
