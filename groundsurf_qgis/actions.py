"""Actions scoped to the selected site and report."""
import json
from urllib.parse import urlencode
from pathlib import Path

from qgis.PyQt.QtCore import Qt, QUrl, QSaveFile, QIODevice, QVariant
from qgis.PyQt.QtNetwork import QNetworkRequest, QNetworkReply
from qgis.PyQt.QtWidgets import QApplication, QFileDialog, QInputDialog
from qgis.core import (QgsCoordinateReferenceSystem, QgsCoordinateTransform, QgsFeature,
    QgsField, QgsGeometry, QgsNetworkAccessManager, QgsPointXY, QgsProject, QgsVectorLayer)
from .core import API_BASE, MAX_RESPONSE_BYTES, normalize_ring_latlon, report_url
from .report_view import ReportWindow, summary


class ReportActions:
    def tr2(self, english, polish):
        return polish if self.language.currentData() == "pl" else english

    def stop_services(self):
        pending = list(self.jobs.values())
        self.jobs.clear()
        for reply in pending:
            reply.abort()

    def service(self, key, path, payload, success, failure=None):
        failure = failure or self.progress.setText
        previous = self.jobs.pop(key, None)
        if previous:
            previous.abort()
        req = QNetworkRequest(QUrl(path if key=="station" else API_BASE + path))
        req.setTransferTimeout(55000)
        mgr = QgsNetworkAccessManager.instance()
        if payload is None:
            reply = mgr.get(req)
        else:
            req.setHeader(QNetworkRequest.ContentTypeHeader, "application/json")
            reply = mgr.post(req, json.dumps(payload, ensure_ascii=False).encode())
        self.jobs[key] = reply
        def finished():
            try:
                if self.jobs.get(key) is not reply:
                    return
                del self.jobs[key]
                status = reply.attribute(QNetworkRequest.HttpStatusCodeAttribute)
                if reply.error() != QNetworkReply.NoError:
                    raise ValueError("%s · HTTP %s · %s" % (key,status or "—",reply.errorString()))
                if reply.bytesAvailable() > MAX_RESPONSE_BYTES:
                    raise ValueError("Response exceeds size limit")
                data = json.loads(bytes(reply.readAll()))
                if not isinstance(data, dict):
                    raise ValueError("Invalid response")
                success(data)
            except (ValueError, KeyError, TypeError, RuntimeError) as exc:
                failure(str(exc))
            finally:
                reply.deleteLater()
        reply.finished.connect(finished)

    def reset_report(self):
        self.stop_services()
        if self._reply:
            self.cancel_analysis()
        if self.reader:
            self.reader.close()
            self.reader.deleteLater()
            self.reader = None
        layer = self.evidence_layer()
        if layer:
            QgsProject.instance().removeMapLayer(layer.id())
        self.layer_id = None
        self.report = None
        self._current_report_url = ""
        if hasattr(self,"open_button"):
            self.open_button.setEnabled(False)
            self.report_text.clear()

    def display(self, report):
        if not report_url(report) or not isinstance(report.get("report_data"), dict):
            raise ValueError(self.tr2("Invalid report or missing ID.","Niepoprawny raport lub brak identyfikatora."))
        self.site_toggle.setChecked(False)
        self.report = report
        self._current_report_url = report_url(report)
        self.report_text.setPlainText(summary(report))
        self.open_button.setEnabled(True)
        self.report_text.setFocus()
        self.dock.raise_()

    def open_report(self):
        if self.report:
            if self.reader is None:
                self.reader = ReportWindow(self,self.report)
                self.reader.overview.setPlainText(self.report_text.toPlainText())
            self.reader.show()
            self.reader.raise_()

    def cache_folder(self):
        from qgis.core import QgsApplication
        return Path(QgsApplication.qgisSettingsDirPath()) / "groundsurf_reports"

    def remember(self, report):
        try:
            folder = self.cache_folder()
            folder.mkdir(mode=0o700, exist_ok=True)
            output = QSaveFile(str(folder / (report["id"]+".json")))
            content = json.dumps(report,ensure_ascii=False).encode()
            if not output.open(QIODevice.WriteOnly) or output.write(content)!=len(content) or not output.commit():
                return
            for old in sorted(folder.glob("*.json"),key=lambda p:p.stat().st_mtime,reverse=True)[20:]:
                if report_url({"id":old.stem}):
                    old.unlink()
        except OSError as exc:
            self.progress.setToolTip(str(exc))

    def open_recent(self):
        try:
            files = sorted(self.cache_folder().glob("*.json"),key=lambda p:p.stat().st_mtime,reverse=True)
            names = [file.stem for file in files if report_url({"id":file.stem})]
            if not names:
                self.progress.setText(self.tr2("No saved reports yet.","Brak zapisanych raportów."))
                return
            name,ok = QInputDialog.getItem(self.dock,"GroundSurf",self.tr2("Recent reports","Ostatnie raporty"),names,0,False)
            if ok:
                with (self.cache_folder()/(name+".json")).open("rb") as source:
                    self.restore_record(json.loads(source.read(MAX_RESPONSE_BYTES)))
        except (ValueError,OSError,TypeError) as exc:
            self.progress.setText(str(exc))

    def save_record(self, checked=False, manifest=False):
        if not self.report:
            return
        payload = self.report
        name = self.report["id"]
        if manifest:
            from datetime import datetime, timezone
            from .manifest import evidence_manifest
            try:
                payload = evidence_manifest(self.report,self.language.currentData(),datetime.now(timezone.utc).isoformat())
            except ValueError as exc:
                self.progress.setText(str(exc))
                return
            name += "-evidence"
        path, _ = QFileDialog.getSaveFileName(self.dock,self.tr2("Save report","Zapisz raport"),name+".json","JSON (*.json)")
        if path:
            output = QSaveFile(path)
            content = json.dumps(payload, ensure_ascii=False, indent=2).encode()
            if not output.open(QIODevice.WriteOnly) or output.write(content) != len(content) or not output.commit():
                self.progress.setText(output.errorString())

    def load_record(self):
        path, _ = QFileDialog.getOpenFileName(self.dock,self.tr2("Open saved report","Otwórz zapisany raport"),"","JSON (*.json)")
        if path:
            try:
                with open(path,"rb") as source:
                    raw = source.read(MAX_RESPONSE_BYTES+1)
                if len(raw)>MAX_RESPONSE_BYTES:
                    raise ValueError("File exceeds size limit")
                self.restore_record(json.loads(raw))
            except (ValueError, OSError, TypeError) as exc:
                self.progress.setText(str(exc))

    def restore_record(self, report):
        if not report_url(report) or not isinstance(report.get("report_data"),dict):
            raise ValueError("Invalid GroundSurf report")
        self.reset_report()
        self._geometry = self._geometry_crs = self.parcel = self.circle = None
        if self._site_band:
            self._site_band.hide()
        country_index = self.country.findData(report.get("country_code"))
        self.country.setCurrentIndex(max(0,country_index))
        shape = report.get("selected_boundary") or report.get("boundary") or {}
        if not isinstance(shape,dict):
            shape = {}
        if shape.get("type")=="circle":
            center = shape.get("center")
            radius = shape.get("radius")
            if isinstance(center,list) and len(center)==2 and all(type(v) in (int,float) for v in center) and -90<=center[0]<=90 and -180<=center[1]<=180 and type(radius) in (int,float) and 0<radius<=100000:
                self.set_circle(*center,radius)
        if shape.get("type") == "polygon":
            try:
                ring = normalize_ring_latlon(shape["points"])
                self._set_site(self.polygon(ring),QgsCoordinateReferenceSystem("EPSG:4326"),self.tr2("Saved site","Zapisana lokalizacja"))
                self.zoom_site()
            except (TypeError, ValueError, KeyError, IndexError):
                pass
        kinds = {"drawn":self.tr2("Drawn boundary","Granica narysowana"),"imported":self.tr2("Imported polygon","Poligon z warstwy"),
                 "radius":self.tr2("Address screening radius","Promień analizy"),"official":self.tr2("Official parcel","Działka ewidencyjna")}
        self.site_kind = report.get("qgis_site_kind","stored")
        if self.site_kind not in kinds:
            self.site_kind = "stored"
        self.site_status.setText(report["id"]+" · "+kinds.get(self.site_kind,self.tr2("Boundary supplied with the stored report","Granica przekazana w zapisanym raporcie")))
        self.display(report)
        self.open_report()

    def reopen_id(self):
        rid, ok = QInputDialog.getText(self.dock,"GroundSurf","Report ID")
        rid = rid.strip()
        if ok and report_url({"id":rid}):
            self.service("open","/api/reports/"+rid,None,self.restore_record)

    def share(self, checked=False, embed=False):
        if not self.report:
            return
        rid = self.report["id"]
        def copy(data):
            if data.get("id") != rid or data.get("shareable") is not True:
                raise ValueError("Sharing unavailable")
            link = self._current_report_url
            if embed:
                from html import escape
                link += "&"+urlencode({"embed":"true","country":self.report.get("country_code",""),"lang":self.language.currentData(),"mode":"polygon"})
                link = '<iframe title="GroundSurf" width="100%" height="850" src="'+escape(link,quote=True)+'"></iframe>'
            QApplication.clipboard().setText(link)
            self.progress.setText(self.tr2("Share link copied.","Skopiowano link."))
        self.service("share","/api/reports/"+rid+"/share",{},copy)

    def polygon(self, points):
        ring = [QgsPointXY(lon,lat) for lat,lon in points]
        return QgsGeometry.fromPolygonXY([ring+[ring[0]]])

    def zoom_site(self):
        canvas = self.iface.mapCanvas()
        transform = QgsCoordinateTransform(self._geometry_crs,canvas.mapSettings().destinationCrs(),QgsProject.instance())
        bounds = transform.transformBoundingBox(self._geometry.boundingBox())
        bounds.scale(1.35)
        canvas.setExtent(bounds)
        canvas.refresh()

    def lookup(self, checked=False):
        self.lookup_at(self.address_results.currentData())

    def pick_parcel(self):
        from qgis.gui import QgsMapToolEmitPoint
        if not self.country.currentData():
            self.progress.setText(self.tr2("Choose country","Wybierz kraj"))
            return
        canvas = self.iface.mapCanvas()
        old = canvas.mapTool()
        if getattr(self,"picker",None) is old and old is not None:
            return
        self.picker = QgsMapToolEmitPoint(canvas)
        self.previous_picker_tool = old
        def chosen(point,button):
            if old:
                canvas.setMapTool(old)
            else:
                canvas.unsetMapTool(self.picker)
            if button != Qt.LeftButton:
                return
            transform = QgsCoordinateTransform(canvas.mapSettings().destinationCrs(),QgsCoordinateReferenceSystem("EPSG:4326"),QgsProject.instance())
            place = transform.transform(point)
            self.lookup_at({"lat":place.y(),"lon":place.x(),"country":self.country.currentData()})
        self.picker.canvasClicked.connect(chosen)
        canvas.setMapTool(self.picker)
        self.progress.setText(self.tr2("Click inside the parcel.","Kliknij wewnątrz działki."))

    def lookup_at(self,hit):
        if not hit or hit.get("country") != self.country.currentData():
            self.progress.setText(self.tr2("Choose an address in the selected country.","Wybierz adres w wybranym kraju."))
            return
        supported = "RE GP MQ GF YT MD AL AT AU BE BG CA CH CY CZ DE DK EE FI FR GB HR HU IE IS IT LU LV MT NL NO PL PT RO SI SK ES US HK".split()
        if hit["country"] not in supported:
            self.progress.setText(self.tr2("Parcel lookup unavailable here. Draw or import a boundary.","Brak obsługi działek w tym kraju. Narysuj lub zaimportuj granicę."))
            return
        fallback = self.tr2("Draw or import the boundary.","Narysuj lub zaimportuj granicę.")
        def accept(data):
            info = data.get("parcel") or {}
            rid = info.get("parcelNumber") or info.get("parcelId") or info.get("nationalCadastralReference") or data.get("parcelId")
            rings = [obj.get(key) for obj in (data,info) for key in ("geometryPoints","registryGeometryPoints")]
            ring = next((x for x in rings if isinstance(x,list) and x), None)
            if data.get("success") is not True or not ring:
                self.progress.setText(str(rid or data.get("reasonCode") or "—")+" · "+fallback)
                return
            geom = self.polygon(normalize_ring_latlon(ring))
            if not geom.isGeosValid() or not geom.contains(QgsPointXY(hit["lon"],hit["lat"])):
                raise ValueError(fallback)
            crs = QgsCoordinateReferenceSystem("EPSG:4326")
            if hit["country"] == "GB":
                from qgis.core import QgsDistanceArea
                measure = QgsDistanceArea()
                measure.setSourceCrs(crs,QgsProject.instance().transformContext())
                measure.setEllipsoid("WGS84")
                if measure.measureArea(geom)>5000:
                    raise ValueError(fallback)
            attribution = data.get("viewAttribution") or data.get("authority") or data.get("source") or info.get("cadastralSource")
            if not attribution and hit["country"]=="PL":
                attribution = "GUGiK · ULDK"
            label = " · ".join(str(x) for x in (rid,attribution,data.get("viewServiceUrl") or data.get("sourceUrl")) if x)
            self._set_site(geom, crs,self.tr2("Official parcel","Działka ewidencyjna")+" · "+label)
            self.site_kind = "official"
            self.parcel = {"parcelId":str(rid)} if rid else None
            self.zoom_site()
        self.progress.setText(self.tr2("Looking up parcel…","Wyszukiwanie działki…"))
        params = {"lat":hit["lat"],"lng":hit["lon"],"country":hit["country"]}
        if hit["country"] in ("DE","AU","CA","US") and hit.get("state"):
            params["state"] = hit["state"]
        if hit["country"] in ("CA","AL") and hit.get("municipality"):
            params["municipality"] = hit["municipality"]
        self.service("parcel","/api/cadastre/query?"+urlencode(params),None,accept,lambda msg:self.progress.setText(msg+" · "+fallback))

    def evidence_layer(self):
        return QgsProject.instance().mapLayer(self.layer_id) if self.layer_id else None

    def map_evidence(self, window):
        if self.evidence_layer():
            return
        station = next(((idx,item.get("value") or {}) for idx,item in enumerate(window.items)
                        if item.get("id")=="pl-pgi-groundwater-level"),None)
        if station and isinstance(station[1].get("monitoringId"),int):
            idx, value = station
            num = value["monitoringId"]
            params = urlencode({"f":"json","where":"ID=%d"%num,"outFields":"ID,NR_PKT_MONIT_ILOSC",
                                "returnGeometry":"true","outSR":4326})
            url = "https://cbdgmapa.pgi.gov.pl/arcgis/rest/services/hydrogeologia/mwp/MapServer/0/query?"+params
            def finish(data):
                points = []
                for feature in data.get("features",[]):
                    attr = feature.get("attributes",{})
                    geo = feature.get("geometry",{})
                    if attr.get("ID")==num and attr.get("NR_PKT_MONIT_ILOSC")==value.get("monitoringPoint"):
                        points.append((idx,geo.get("y"),geo.get("x"),value.get("monitoringPoint")))
                self._map_positions(window,points)
            self.service("station",url,None,finish,lambda msg:self._map_positions(window,[],msg))
        else:
            self._map_positions(window,[])

    def _map_positions(self, window, points, notice=""):
        if self.reader is not window or self.evidence_layer():
            return
        layer = QgsVectorLayer("Point?crs=EPSG:4326","GroundSurf · "+self.report["id"],"memory")
        provider = layer.dataProvider()
        fields = ["source","date","relationship","label","scale"]
        provider.addAttributes([QgsField("record",QVariant.Int)]+[QgsField(k,QVariant.String) for k in fields])
        layer.updateFields()
        for i,item in enumerate(window.items):
            value = item.get("value")
            if not isinstance(value,dict):
                continue
            if item.get("id")=="europe-eea-industrial-sites":
                for site in value.get("sites",[]):
                    if isinstance(site,dict):
                        points.append((i,site.get("latitude"),site.get("longitude"),site.get("name")))
            point = value.get("stationCoordinates") or value.get("observationCoordinates")
            if isinstance(point,dict):
                points.append((i,point.get("lat"),point.get("lon",point.get("lng")),item.get("id")))
            if "stationLatitude" in value:
                points.append((i,value["stationLatitude"],value.get("stationLongitude"),item.get("id")))
            geometry = item.get("geometry") or value.get("geometry")
            if isinstance(geometry,dict) and geometry.get("type")=="Point":
                coords = geometry.get("coordinates")
                if isinstance(coords,list) and len(coords)>=2:
                    points.append((i,coords[1],coords[0],item.get("id")))
        features = []
        for idx,lat,lon,label in points:
            if not all(type(x) in (float,int) for x in (lat,lon)) or not (-90<=lat<=90 and -180<=lon<=180):
                continue
            item = window.items[idx]
            value = item.get("value") or {}
            scale = value.get("scale") if isinstance(value,dict) else None
            feat = QgsFeature(layer.fields())
            feat.setGeometry(QgsGeometry.fromPointXY(QgsPointXY(lon,lat)))
            feat.setAttributes([idx,item.get("sourceName"),item.get("datasetDate"),item.get("spatialRelationship"),label,scale])
            features.append(feat)
        if not features:
            window.detail.setPlainText(notice+" "+self.tr2("No supported source positions in these records.","Brak współrzędnych źródłowych w obsługiwanym formacie."))
            return
        provider.addFeatures(features)
        layer.updateExtents()
        QgsProject.instance().addMapLayer(layer)
        self.layer_id = layer.id()
        if len(features)>1 and not layer.extent().isEmpty():
            canvas = self.iface.mapCanvas()
            transform = QgsCoordinateTransform(layer.crs(), canvas.mapSettings().destinationCrs(),QgsProject.instance())
            canvas.setExtent(transform.transformBoundingBox(layer.extent()))
        if len(features)==1:
            position = features[0].geometry().asPoint()
            canvas = self.iface.mapCanvas()
            canvas.setCenter(QgsCoordinateTransform(layer.crs(),canvas.mapSettings().destinationCrs(),QgsProject.instance()).transform(position))
        self.iface.mapCanvas().refresh()
        self.progress.setText(self.tr2("Mapped source positions","Pozycje źródłowe na mapie")+" · "+str(len(features)))
        def selected(ids,*unused):
            if ids and self.reader:
                idx = layer.getFeature(next(iter(ids)))["record"]
                window.search.clear()
                window.tabs.setCurrentIndex(1)
                window.list.setCurrentRow(idx)
        layer.selectionChanged.connect(selected)

    def highlight_record(self, idx):
        layer = self.evidence_layer()
        if layer:
            layer.blockSignals(True)
            try:
                layer.selectByIds([f.id() for f in layer.getFeatures() if f["record"]==idx])
            finally:
                layer.blockSignals(False)


    def add_overlay(self):
        from qgis.core import QgsRasterLayer
        layers = {
            "Topografia · GUGiK": ("arcgismapserver", "url='https://mapy.geoportal.gov.pl/gprest/services/G2_MOBILE_500/MapServer'"),
            "Działki · GUGiK": ("wms", "crs=EPSG:2180&format=image/png&layers=dzialki&styles=&url=https://integracja.gugik.gov.pl/cgi-bin/KrajowaIntegracjaEwidencjiGruntow"),
            "SMGP 1:50 000 · PIG-PIB": ("wms", "crs=EPSG:2180&format=image/png&layers=0&styles=&url=https://cbdgmapa.pgi.gov.pl/arcgis/services/kartografia/smgp50k/MapServer/WMSServer")
        }
        group_name = "GroundSurf · Polska"
        if self.report and self.report.get("country_code")=="FI" and 60.10<=self.report.get("latitude",0)<=60.26 and 24.79<=self.report.get("longitude",0)<=25.15:
            group_name = "GroundSurf · Helsinki"
            layers = {"Helsinki · "+year: ("wms","crs=EPSG:4326&format=image/png&styles=&layers=avoindata:"+name+"&url=https://kartta.hel.fi/ws/geoserver/avoindata/wms")
                      for year,name in [("1932","Ortoilmakuva_1932"),("2024","Ortoilmakuva_2024_5cm")]}
        if self.report and self.report.get("country_code")=="SE" and 59.26<=self.report.get("latitude",0)<=59.39 and 17.95<=self.report.get("longitude",0)<=18.20:
            group_name = "GroundSurf · Stockholm"
            layers = {"Skyfall 2024 · "+str(period): ("wms","crs=EPSG:4326&format=image/png&styles=&layers=skyfall:Skyfall_2024_%d_maxdjup&url=https://openstreetgs.stockholm.se/geoservice/api/wms"%period) for period in (100,500)}
        name, ok = QInputDialog.getItem(self.dock,"GroundSurf",group_name,list(layers),0,False)
        if ok:
            provider, uri = layers[name]
            layer = QgsRasterLayer(uri,name,provider)
            if not layer.isValid():
                self.progress.setText(self.tr2("Layer unavailable","Warstwa niedostępna")+" · "+name)
                return
            project = QgsProject.instance()
            root = project.layerTreeRoot()
            group = root.findGroup(group_name) or root.addGroup(group_name)
            project.addMapLayer(layer,False)
            group.insertLayer(len(group.children()) if provider=="arcgismapserver" else 0,layer)

    def point_radius(self):
        hit = self.address_results.currentData()
        if not hit or hit.get("country") != self.country.currentData():
            self.progress.setText(self.tr2("Choose an address first.","Najpierw wybierz adres."))
            return
        radius,ok = QInputDialog.getInt(self.dock,"GroundSurf",self.tr2("Screening radius (m)","Promień analizowanego obszaru (m)"),50,5,1000)
        if ok:
            self.set_circle(hit["lat"],hit["lon"],radius)

    def set_circle(self,lat,lon,radius):
        import math
        from qgis.core import QgsDistanceArea
        crs = QgsCoordinateReferenceSystem("EPSG:4326")
        metric = QgsDistanceArea()
        metric.setSourceCrs(crs,QgsProject.instance().transformContext())
        metric.setEllipsoid("WGS84")
        origin = QgsPointXY(lon,lat)
        points = [metric.computeSpheroidProject(origin,radius,math.radians(angle)) for angle in range(0,360,6)]
        geometry = QgsGeometry.fromPolygonXY([points+[points[0]]])
        self._set_site(geometry,crs,self.tr2("Address screening radius","Promień analizy wokół adresu")+" · %d m"%radius)
        self.site_kind = "radius"
        self.circle = {"type":"circle","center":[lat,lon],"radius":radius}
        self.zoom_site()

    def hk_lot(self):
        text,ok = QInputDialog.getText(self.dock,"Hong Kong",self.tr2("Exact lot reference","Dokładny identyfikator działki"))
        if not ok or not text.strip():
            return
        def accept(data):
            parcel = data.get("parcel") or {}
            ring = data.get("geometryPoints") or parcel.get("geometryPoints")
            if data.get("success") is not True or not ring:
                raise ValueError(self.tr2("No confirmed boundary. Draw a site.","Brak potwierdzonej granicy. Narysuj obszar."))
            rid = parcel.get("parcelId") or data.get("parcelId") or text.strip()
            geometry = self.polygon(normalize_ring_latlon(ring))
            if not geometry.isGeosValid():
                raise ValueError("Invalid lot boundary")
            self._set_site(geometry,QgsCoordinateReferenceSystem("EPSG:4326"),"Hong Kong · "+str(rid))
            self.site_kind = "official"
            self.parcel = {"parcelId":str(rid)}
            self.zoom_site()
        self.service("parcel","/api/cadastre/hk-lot?"+urlencode({"lot":text.strip()}),None,accept)
