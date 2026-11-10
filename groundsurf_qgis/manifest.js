"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var GroundSurfExport = function () {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = function __defNormalProp(obj, key, value) {
    return key in obj ? __defProp(obj, key, {
      enumerable: true,
      configurable: true,
      writable: true,
      value: value
    }) : obj[key] = value;
  };
  var __spreadValues = function __spreadValues(a, b) {
    for (var prop in b || (b = {})) if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols) {
      var _iterator = _createForOfIteratorHelper(__getOwnPropSymbols(b)),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var prop = _step.value;
          if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    return a;
  };
  var __spreadProps = function __spreadProps(a, b) {
    return __defProps(a, __getOwnPropDescs(b));
  };
  var __export = function __export(target, all) {
    for (var name in all) __defProp(target, name, {
      get: all[name],
      enumerable: true
    });
  };
  var __copyProps = function __copyProps(to, from, except, desc) {
    if (from && _typeof(from) === "object" || typeof from === "function") {
      var _iterator2 = _createForOfIteratorHelper(__getOwnPropNames(from)),
        _step2;
      try {
        var _loop = function _loop() {
          var key = _step2.value;
          if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: function get() {
              return from[key];
            },
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
          });
        };
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
    return to;
  };
  var __toCommonJS = function __toCommonJS(mod) {
    return __copyProps(__defProp({}, "__esModule", {
      value: true
    }), mod);
  };

  // src/lib/groundSurfEvidenceManifest.ts
  var groundSurfEvidenceManifest_exports = {};
  __export(groundSurfEvidenceManifest_exports, {
    GROUNDSURF_EVIDENCE_MANIFEST_NAME: function GROUNDSURF_EVIDENCE_MANIFEST_NAME() {
      return _GROUNDSURF_EVIDENCE_MANIFEST_NAME;
    },
    GROUNDSURF_EVIDENCE_MANIFEST_VERSION: function GROUNDSURF_EVIDENCE_MANIFEST_VERSION() {
      return _GROUNDSURF_EVIDENCE_MANIFEST_VERSION;
    },
    createGroundSurfEvidenceManifest: function createGroundSurfEvidenceManifest() {
      return _createGroundSurfEvidenceManifest;
    },
    groundSurfEvidenceManifestFilename: function groundSurfEvidenceManifestFilename() {
      return _groundSurfEvidenceManifestFilename;
    }
  });

  // src/lib/developmentScreening.ts
  var DEVELOPMENT_SCREENING_VERSION = "1.0.0";
  var DEVELOPMENT_TOPICS = [{
    id: "coal_mining",
    group: "ground",
    labels: ["Coal mining", "Kohlebergbau", "G\xF3rnictwo w\u0119gla"],
    match: /uk-mra-|coal[- _]?min|coalfield/i
  }, {
    id: "non_coal_mining",
    group: "ground",
    labels: ["Non-coal mining", "Sonstiger Bergbau", "G\xF3rnictwo inne ni\u017C w\u0119giel"],
    match: /non[- _]?coal|not.including.coal|noncoal/i
  }, {
    id: "other_mining",
    group: "ground",
    labels: ["Other or unspecified mining records", "Weitere oder nicht zugeordnete Bergbaudaten", "Inne lub nieokre\u015Blone dane g\xF3rnicze"],
    match: /mining|mine.workings|undermined|altbergbau|górnic|gornic/i
  }, {
    id: "natural_cavities",
    group: "ground",
    labels: ["Karst and natural cavities", "Karst und nat\xFCrliche Hohlr\xE4ume", "Kras i naturalne pustki"],
    match: /karst|soluble.rock|dissolution|natural.cavit/i
  }, {
    id: "artificial_cavities",
    group: "ground",
    labels: ["Underground quarries, cellars and tunnels", "Unterirdische Steinbr\xFCche, Keller und Tunnel", "Podziemne kamienio\u0142omy, piwnice i tunele"],
    match: /artificial.cavit|underground.quarr|cellar|military.tunnel/i
  }, {
    id: "shrink_swell",
    group: "ground",
    labels: ["Shrink\u2013swell clay", "Schrumpfen und Quellen von Ton", "Kurczenie i p\u0119cznienie grunt\xF3w ilastych"],
    match: /shrink.swell|retrait.gonflement/i
  }, {
    id: "compressible_ground",
    group: "ground",
    labels: ["Compressible ground and peat", "Zusammendr\xFCckbare B\xF6den und Torf", "Grunty \u015Bci\u015Bliwe i torfy"],
    match: /compressib|peat|organic.deposit/i
  }, {
    id: "made_ground",
    group: "ground",
    labels: ["Made ground and infilled excavations", "Auff\xFCllungen und verf\xFCllte Abgrabungen", "Nasypy i zasypane wyrobiska"],
    match: /made.ground|artificial.ground|infilled|reclaimed.land/i
  }, {
    id: "landslides",
    group: "ground",
    labels: ["Landslides and slope instability", "Rutschungen und Hanginstabilit\xE4t", "Osuwiska i stateczno\u015B\u0107 zboczy"],
    match: /landslide|slope.instability|osuwisk/i
  }, {
    id: "rockfall_avalanche",
    group: "ground",
    labels: ["Rockfall and avalanches", "Steinschlag und Lawinen", "Obrywy skalne i lawiny"],
    match: /rockfall|avalanche/i
  }, {
    id: "collapsible_ground",
    group: "ground",
    labels: ["Collapsible deposits", "Kollapsible B\xF6den", "Grunty zapadowe"],
    match: /collapsible|collapse.on.wetting|loess.collapse/i
  }, {
    id: "running_sand",
    group: "ground",
    labels: ["Running sand", "Flie\xDFsand", "Kurzawka"],
    match: /running.sand|flowing.sand/i
  }, {
    id: "earthquake",
    group: "ground",
    labels: ["Earthquake shaking", "Erdbebenersch\xFCtterungen", "Wstrz\u0105sy sejsmiczne"],
    match: /seismic|earthquake/i
  }, {
    id: "liquefaction",
    group: "ground",
    labels: ["Earthquake-induced liquefaction", "Erdbebenbedingte Bodenverfl\xFCssigung", "Up\u0142ynnienie gruntu podczas trz\u0119sie\u0144 ziemi"],
    match: /liquefaction/i
  }, {
    id: "aggressive_ground",
    group: "ground",
    labels: ["Aggressive ground chemistry", "Chemisch angreifender Baugrund", "Agresywno\u015B\u0107 chemiczna gruntu"],
    match: /sulfate|sulphate|sulfide|sulphide|aggressive.ground|corrosiv/i
  }, {
    id: "river_sea_flood",
    group: "water",
    labels: ["River and sea flooding", "Fluss- und K\xFCstenhochwasser", "Powodzie rzeczne i morskie"],
    match: /river.flood|coastal.flood|flood.zone|flood.hazard|flood.risk|floodplain/i
  }, {
    id: "surface_water_flood",
    group: "water",
    labels: ["Surface-water flooding", "\xDCberflutung durch Oberfl\xE4chenwasser", "Zalewanie wodami opadowymi"],
    match: /surface.water.flood|pluvial|surface-water/i
  }, {
    id: "groundwater",
    group: "water",
    labels: ["Groundwater and groundwater flooding", "Grundwasser und Grundwasser\xFCberflutung", "Wody gruntowe i podtopienia"],
    match: /groundwater|piezomet|water.table/i
  }, {
    id: "erosion",
    group: "water",
    labels: ["Coastal and riverbank erosion", "K\xFCsten- und Ufererosion", "Erozja wybrze\u017Cy i brzeg\xF3w rzek"],
    match: /coastal.erosion|riverbank.erosion|shoreline.retreat/i
  }, {
    id: "drainage",
    group: "development",
    labels: ["Drainage outlet and discharge rights", "Entw\xE4sserung und Einleitungsrechte", "Odp\u0142yw w\xF3d i prawo do odprowadzania"],
    confirmation: true
  }, {
    id: "contamination",
    group: "environment",
    labels: ["Contamination and historic land use", "Altlasten und fr\xFChere Nutzung", "Zanieczyszczenia i dawne u\u017Cytkowanie"],
    match: /contamin|brownfield|pollut|historic.land.use/i
  }, {
    id: "ground_gas",
    group: "environment",
    labels: ["Landfill and other ground gas", "Deponie- und sonstige Bodengase", "Gazy wysypiskowe i gruntowe"],
    match: /landfill|ground.gas|mine.gas|methane/i
  }, {
    id: "radon",
    group: "environment",
    labels: ["Radon", "Radon", "Radon"],
    match: /radon/i
  }, {
    id: "wildfire",
    group: "environment",
    labels: ["Wildfire", "Wald- und Vegetationsbrand", "Po\u017Cary las\xF3w i ro\u015Blinno\u015Bci"],
    match: /wildfire|forest.fire/i
  }, {
    id: "ecology",
    group: "environment",
    labels: ["Habitats, protected areas and species", "Lebensr\xE4ume, Schutzgebiete und Arten", "Siedliska, obszary i gatunki chronione"],
    match: /natura|protected.area|habitat|ecolog|protected.species|environmental.protection/i,
    confirmation: true
  }, {
    id: "heritage",
    group: "development",
    labels: ["Heritage and archaeology", "Denkmalschutz und Arch\xE4ologie", "Zabytki i archeologia"],
    match: /heritage|archaeolog|listed.building|monument/i,
    confirmation: true
  }, {
    id: "planning",
    group: "development",
    labels: ["Planning and development controls", "Planungs- und Baurecht", "Planowanie i warunki zabudowy"],
    match: /planning|zoning|local.plan|mpzp|bebau/i,
    confirmation: true
  }, {
    id: "legal_access",
    group: "development",
    labels: ["Legal access", "Rechtlich gesicherter Zugang", "Prawny dost\u0119p do dzia\u0142ki"],
    confirmation: true
  }, {
    id: "utilities",
    group: "development",
    labels: ["Utilities, capacity and connection rights", "Versorgung, Kapazit\xE4t und Anschlussrechte", "Media, przepustowo\u015B\u0107 i prawo przy\u0142\u0105czenia"],
    match: /utilit|electricity|sewer|water.supply|telecom/i,
    confirmation: true
  }, {
    id: "easements",
    group: "development",
    labels: ["Easements and infrastructure corridors", "Dienstbarkeiten und Leitungstrassen", "S\u0142u\u017Cebno\u015Bci i korytarze infrastruktury"],
    match: /easement|right.of.way|infrastructure.corridor|pipeline|power.line/i,
    confirmation: true
  }, {
    id: "neighbours",
    group: "environment",
    labels: ["Neighbouring noise, odour and industrial uses", "L\xE4rm, Ger\xFCche und benachbarte Gewerbenutzung", "Ha\u0142as, zapachy i s\u0105siedztwo przemys\u0142u"],
    match: /noise|odour|odor|industrial.use|dust.emission/i,
    confirmation: true
  }];
  function buildDevelopmentScreening() {
    var evidence = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var records = evidence.filter(function (item) {
      return item && typeof item.id === "string" && !/^(country-support-|development-screening-)/.test(item.id);
    });
    return {
      version: DEVELOPMENT_SCREENING_VERSION,
      items: DEVELOPMENT_TOPICS.map(function (topic) {
        var matches = topic.match ? records.filter(function (item) {
          var text = "".concat(item.id, " ").concat(typeof item.category === "string" ? item.category : "");
          var nonCoal = /non[- _]?coal|not.including.coal|noncoal/i.test(text);
          if (topic.id === "coal_mining" && nonCoal) return false;
          if (topic.id === "other_mining" && (nonCoal || /uk-mra-|coal[- _]?min|coalfield/i.test(text))) return false;
          return topic.match.test(text);
        }) : [];
        var related = matches.some(function (item) {
          var value = item.value && _typeof(item.value) === "object" ? item.value : {};
          return (item.status === "VERIFIED" || item.status === "MODELLED") && !value.reasonCode;
        });
        return {
          topicId: topic.id,
          group: topic.group,
          coverage: related ? "RELATED_EVIDENCE" : matches.length ? "SOURCE_CHECK_REQUIRED" : topic.confirmation ? "CONFIRMATION_REQUIRED" : "NOT_ASSESSED",
          evidenceIds: _toConsumableArray(new Set(matches.map(function (item) {
            return String(item.id);
          }))),
          confirmationRequired: Boolean(topic.confirmation),
          hazardConclusion: null,
          applicability: "NOT_DETERMINED"
        };
      })
    };
  }

  // src/i18n/reportNewLanguageCopy.ts
  var NEW_REPORT_LANGUAGE_COPY = {
    ro: {
      unavailable: "Date indisponibile",
      section: "Sec\u021Biunea",
      limitation: "Limitare",
      sourceCited: "Sursa citat\u0103 \xEEn analiz\u0103",
      back: "\xCEnapoi",
      subtitle: "Evaluare preliminar\u0103 a terenului \xB7 Prioritate pentru dovezi",
      embed: "\xCEncorporeaz\u0103",
      copied: "Copiat",
      share: "Distribuie",
      executive: "Rezumat executiv",
      assessment: "Evaluare preliminar\u0103 a terenului",
      summaryFallback: "Evaluarea se bazeaz\u0103 pe seturile de date ob\u021Binute pentru acest teren. Consulta\u021Bi registrul dovezilor pentru surse \u0219i limit\u0103ri.",
      evidence: "Dovezi",
      notScored: "Neevaluat",
      verified: "Verificat",
      modelled: "Modelat",
      needsVerification: "Necesit\u0103 verificare",
      site: "Locul \u0219i parcela",
      location: "Localizare",
      coordinates: "Coordonate",
      area: "Suprafa\u021B\u0103",
      cadastralParcel: "Parcel\u0103 cadastral\u0103",
      officialArea: "Suprafa\u021B\u0103 oficial\u0103",
      elevation: "Altitudine",
      slope: "Pant\u0103",
      aspect: "Orientare",
      parcelCaption: "Geometria parcelei este un reper spa\u021Bial. Titlul de proprietate, drepturile \u0219i sarcinile sunt \xEEn afara domeniului GroundSurf.",
      geology: "Dovezi geologice",
      geologicalUnit: "Unitate geologic\u0103",
      lithology: "Litologie",
      stratigraphicContext: "Context stratigrafic",
      groundwaterRegime: "Regim al apelor subterane",
      interpretation: "Clasificarea geologic\u0103 este preliminar\u0103 \u0219i regional\u0103; nu \xEEnlocuie\u0219te studiul geologic al parcelei.",
      pedologicalProfile: "Profil pedologic",
      depth: "Ad\xE2ncime",
      materialTexture: "Material / textur\u0103",
      mechanicalInterpretation: "Interpretare mecanic\u0103",
      sand: "Nisip",
      silt: "Praf",
      clay: "Argil\u0103",
      ground: "Condi\u021Bii geotehnice \u0219i funda\u021Bii",
      soilTexture: "Textura solului",
      bearingCapacity: "Capacitate portant\u0103",
      bearingNote: "Nu se deduce din SoilGrids; sunt necesare investiga\u021Bii geotehnice specifice amplasamentului.",
      frictionAngle: "Unghi de frecare",
      cohesion: "Coeziune",
      drainage: "Drenaj",
      hydraulicConductivity: "Conductivitate hidraulic\u0103",
      bulkDensity: "Densitate aparent\u0103",
      hazards: "Verificarea hazardelor geologice",
      noHazards: "Nu au fost returnate \xEEnregistr\u0103ri structurate de hazard. Aceasta nu dovede\u0219te absen\u021Ba pericolelor.",
      flood: "Inunda\u021Bii \u0219i hidrologie",
      groundwaterDepth: "Ad\xE2ncimea apelor subterane",
      groundwaterNotice: "Not\u0103 despre apele subterane",
      geologicalPortal: "Portal geologic",
      openSource: "Deschide sursa",
      floodEvidence: "Dovezi despre inunda\u021Bii / hidrologie",
      environment: "Mediu",
      surroundingLandUse: "Utilizarea terenurilor din jur",
      sourceRecords: "\xCEnregistr\u0103ri ale surselor",
      returnedRecords: "\xEEnregistr\u0103ri returnate",
      heritage: "Arheologie \u0219i patrimoniu",
      heritageSummary: "Verificarea patrimoniului se face \xEEn registrul na\u021Bional sau regional competent.",
      heritageDetail: "Acest raport nu reprezint\u0103 aviz arheologic. Consulta\u021Bi registrul oficial \xEEnainte de lucr\u0103ri asupra terenului.",
      heritageLimitation: "\xCEnregistr\u0103rile \u0219i obliga\u021Biile legale trebuie confirmate.",
      planning: "Restric\u021Bii de urbanism / dezvoltare",
      zoningDesignation: "Destina\u021Bie urbanistic\u0103",
      buildingCoverage: "Procent de ocupare",
      biologicallyActiveArea: "Suprafa\u021B\u0103 biologic activ\u0103",
      maximumHeight: "\xCEn\u0103l\u021Bime maxim\u0103",
      setbacks: "Retrageri",
      building: "Cerin\u021Be pentru construc\u021Bii",
      professional: "Parametrii urbanistici \u0219i de construire sunt preliminari. Verifica\u021Bi documentele oficiale actuale.",
      development: "Implica\u021Bii pentru dezvoltare",
      opportunities: "Oportunit\u0103\u021Bi posibile",
      constraints: "Restric\u021Bii \u0219i incertitudini principale",
      market: "Pia\u021Ba \u0219i valoarea terenului",
      indicativeRange: "Interval orientativ al valorii terenului",
      valuationNote: "Numai valoarea terenului; construc\u021Biile \u0219i amenaj\u0103rile sunt excluse. Referin\u021B\u0103 statistic\u0103, nu evaluare certificat\u0103.",
      medianUnit: "Valoare median\u0103 / unitate",
      valuationBasis: "Baza estim\u0103rii",
      comparableEvidence: "Date comparabile",
      investigations: "Investiga\u021Bii recomandate",
      high: "Ridicat",
      medium: "Mediu",
      suggestedAuthority: "Autoritate / specialist recomandat",
      noChecklist: "Nu a fost furnizat\u0103 o list\u0103 structurat\u0103 de investiga\u021Bii. Consulta\u021Bi limit\u0103rile \u0219i lipsurile de date.",
      sourceLibrary: "Registrul dovezilor \u0219i biblioteca de surse",
      directLinks: "linkuri directe c\u0103tre surse",
      sourceLibraryCaption: "Fiecare link duce la un serviciu oficial. Includerea unei surse nu \xEEnseamn\u0103 c\u0103 aceasta a returnat date pentru parcel\u0103.",
      sourceDescription: "Surs\u0103 oficial\u0103 pentru verificarea informa\u021Biilor specifice \u021B\u0103rii.",
      showFewer: "Arat\u0103 mai pu\u021Bine",
      showAll: "Arat\u0103 toate sursele",
      pipelineSources: "Surse returnate de analiz\u0103",
      providerMissing: "Furnizor nespecificat",
      statusMissing: "Stare nespecificat\u0103",
      disclaimerHeading: "Limit\u0103ri importante \u0219i avertisment profesional",
      disclaimerOne: "GroundSurf este un instrument de evaluare preliminar\u0103 bazat pe date publice. Nu \xEEnlocuie\u0219te investiga\u021Bia profesional\u0103 a terenului, o decizie oficial\u0103, un aviz juridic sau o evaluare certificat\u0103.",
      disclaimerTwo: "Absen\u021Ba unui pericol sau a unei restric\u021Bii \xEEnregistrate nu dovede\u0219te c\u0103 acesta nu exist\u0103.",
      disclaimerThree: "Datele cartografiate \u0219i modelate pot fi incomplete, dep\u0103\u0219ite sau generalizate. Deciziile privind parcela necesit\u0103 investiga\u021Bii corespunz\u0103toare.",
      generated: "Generat",
      footer: "Evaluare preliminar\u0103 GroundSurf"
    },
    is: {
      unavailable: "Engin g\xF6gn",
      section: "Hluti",
      limitation: "Takm\xF6rkun",
      sourceCited: "Heimild sem v\xEDsa\xF0 er til",
      back: "Til baka",
      subtitle: "Frummat \xE1 landi \xB7 G\xF6gn \xED fyrirr\xFAmi",
      embed: "Fella inn",
      copied: "Afrita\xF0",
      share: "Deila",
      executive: "Samantekt",
      assessment: "Frummat \xE1 landinu",
      summaryFallback: "Mati\xF0 byggir \xE1 \xFEeim gagnas\xF6fnum sem fengust fyrir \xFEennan sta\xF0. Sj\xE1 heimildaskr\xE1 fyrir uppruna og takmarkanir.",
      evidence: "G\xF6gn",
      notScored: "Ekki meti\xF0",
      verified: "Sta\xF0fest",
      modelled: "Hermt",
      needsVerification: "\xDEarf sta\xF0festingu",
      site: "Sta\xF0ur og l\xF3\xF0",
      location: "Sta\xF0setning",
      coordinates: "Hnit",
      area: "Flatarm\xE1l",
      cadastralParcel: "Fasteignaskr\xE1ning",
      officialArea: "Skr\xE1\xF0 flatarm\xE1l",
      elevation: "H\xE6\xF0 yfir sj\xF3",
      slope: "Halli",
      aspect: "Stefna",
      parcelCaption: "L\xF3\xF0am\xF6rk eru landfr\xE6\xF0ileg hj\xE1lparg\xF6gn. Eignarr\xE9ttur og kva\xF0ir falla utan umfangs GroundSurf.",
      geology: "Jar\xF0fr\xE6\xF0ig\xF6gn",
      geologicalUnit: "Jar\xF0fr\xE6\xF0ieining",
      lithology: "Berg- og jar\xF0vegsger\xF0",
      stratigraphicContext: "Jar\xF0lagasamhengi",
      groundwaterRegime: "Grunnvatnsa\xF0st\xE6\xF0ur",
      interpretation: "Jar\xF0fr\xE6\xF0iflokkun er sv\xE6\xF0isbundin frumsko\xF0un og kemur ekki \xED sta\xF0 ranns\xF3knar \xE1 l\xF3\xF0inni.",
      pedologicalProfile: "Jar\xF0vegssni\xF0",
      depth: "D\xFDpt",
      materialTexture: "Efni / kornast\xE6r\xF0",
      mechanicalInterpretation: "T\xE6knileg t\xFAlkun",
      sand: "Sandur",
      silt: "Silt",
      clay: "Leir",
      ground: "Jar\xF0vegur og undirst\xF6\xF0ur",
      soilTexture: "Jar\xF0vegsger\xF0",
      bearingCapacity: "Bur\xF0argeta",
      bearingNote: "Ekki \xE1lykta\xF0 \xFAt fr\xE1 SoilGrids; sta\xF0bundnar jar\xF0t\xE6kniranns\xF3knir eru nau\xF0synlegar.",
      frictionAngle: "N\xFAningshorn",
      cohesion: "Samlo\xF0un",
      drainage: "Fr\xE1rennsli",
      hydraulicConductivity: "Vatnslei\xF0ni",
      bulkDensity: "R\xFAm\xFEyngd",
      hazards: "Skimun jar\xF0v\xE1a",
      noHazards: "Engar skipulag\xF0ar h\xE6ttuskr\xE1ningar fengust. \xDEa\xF0 sannar ekki a\xF0 h\xE6tta s\xE9 ekki til sta\xF0ar.",
      flood: "Fl\xF3\xF0 og vatnafar",
      groundwaterDepth: "Grunnvatnsd\xFDpi",
      groundwaterNotice: "Uppl\xFDsingar um grunnvatn",
      geologicalPortal: "Jar\xF0fr\xE6\xF0ig\xE1tt",
      openSource: "Opna heimild",
      floodEvidence: "Fl\xF3\xF0a- og vatnafarsg\xF6gn",
      environment: "Umhverfi",
      surroundingLandUse: "Landnotkun \xED n\xE1grenni",
      sourceRecords: "Heimildaskr\xE1r",
      returnedRecords: "f\xE6rslur fundust",
      heritage: "Fornleifar og menningarminjar",
      heritageSummary: "Athuga skal opinberar skr\xE1r vi\xF0eigandi minjastofnunar.",
      heritageDetail: "\xDEessi sk\xFDrsla er ekki fornleifaleyfi. Athuga\xF0u opinbera minjaskr\xE1 \xE1\xF0ur en grafi\xF0 er.",
      heritageLimitation: "Sta\xF0festa \xFEarf opinberar heimildir og lagaskyldur.",
      planning: "Skipulags- og framkv\xE6mdatakmarkanir",
      zoningDesignation: "Skipulagsflokkur",
      buildingCoverage: "Byggingarhlutfall",
      biologicallyActiveArea: "\xD3byggt gr\xE6nt sv\xE6\xF0i",
      maximumHeight: "H\xE1marksh\xE6\xF0",
      setbacks: "Fjarl\xE6g\xF0arm\xF6rk",
      building: "Byggingarkr\xF6fur",
      professional: "Skipulags- og byggingarskilm\xE1lar eru br\xE1\xF0abirg\xF0auppl\xFDsingar. Sta\xF0festu gildandi opinber g\xF6gn.",
      development: "\xC1hrif \xE1 framkv\xE6mdir",
      opportunities: "M\xF6gulegir kostir",
      constraints: "Helstu takmarkanir og \xF3vissa",
      market: "Landver\xF0 og marka\xF0ur",
      indicativeRange: "\xC1\xE6tla\xF0 landver\xF0sbil",
      valuationNote: "Einungis landver\xF0; byggingar og mannvirki eru undanskilin. T\xF6lfr\xE6\xF0ilegt vi\xF0mi\xF0, ekki l\xF6ggilt ver\xF0mat.",
      medianUnit: "Mi\xF0gildi landver\xF0s / eining",
      valuationBasis: "Forsendur mats",
      comparableEvidence: "Samanbur\xF0arg\xF6gn",
      investigations: "R\xE1\xF0lag\xF0ar ranns\xF3knir",
      high: "H\xE1tt",
      medium: "Mi\xF0lungs",
      suggestedAuthority: "Vi\xF0eigandi stofnun / s\xE9rfr\xE6\xF0ingur",
      noChecklist: "Enginn skipulag\xF0ur ranns\xF3knarlisti barst. Far\xF0u yfir takmarkanir og gagnaskort.",
      sourceLibrary: "Gagnaskr\xE1 og heimildasafn",
      directLinks: "beinir tenglar \xE1 heimildir",
      sourceLibraryCaption: "Hver tengill v\xEDsar \xE1 opinbera \xFEj\xF3nustu. Skr\xE1\xF0 heimild \xFE\xFD\xF0ir ekki a\xF0 g\xF6gn hafi fundist fyrir l\xF3\xF0ina.",
      sourceDescription: "Opinber heimild fyrir landss\xE9rt\xE6k g\xF6gn og sta\xF0festingu.",
      showFewer: "S\xFDna f\xE6rra",
      showAll: "S\xFDna allar heimildir",
      pipelineSources: "Heimildir \xFAr greiningunni",
      providerMissing: "Gagnaveita ekki tilgreind",
      statusMissing: "Sta\xF0a \xF3tilgreind",
      disclaimerHeading: "Mikilv\xE6gar takmarkanir og faglegur fyrirvari",
      disclaimerOne: "GroundSurf er frumathugun sem byggir \xE1 opinberum g\xF6gnum. H\xFAn kemur ekki \xED sta\xF0 sta\xF0bundinnar fagranns\xF3knar, opinberrar \xE1kv\xF6r\xF0unar, l\xF6gfr\xE6\xF0ir\xE1\xF0gjafar e\xF0a l\xF6ggilts ver\xF0mats.",
      disclaimerTwo: "Skortur \xE1 skr\xE1\xF0ri h\xE6ttu e\xF0a takm\xF6rkun sannar ekki a\xF0 h\xFAn s\xE9 ekki til sta\xF0ar.",
      disclaimerThree: "Kortl\xF6g\xF0 og hermd g\xF6gn geta veri\xF0 \xF3fullkomin, \xFArelt e\xF0a alh\xE6f\xF0. \xC1kvar\xF0anir um l\xF3\xF0 krefjast vi\xF0eigandi ranns\xF3kna.",
      generated: "\xDAtb\xFAi\xF0",
      footer: "Frummat GroundSurf"
    },
    ca: {
      unavailable: "Sense dades",
      section: "Secci\xF3",
      limitation: "Limitaci\xF3",
      sourceCited: "Font citada per l\u2019an\xE0lisi",
      back: "Tornar",
      subtitle: "Avaluaci\xF3 preliminar del terreny \xB7 Primer les evid\xE8ncies",
      embed: "Insereix",
      copied: "Copiat",
      share: "Comparteix",
      executive: "Resum executiu",
      assessment: "Avaluaci\xF3 preliminar del terreny",
      summaryFallback: "L\u2019avaluaci\xF3 es basa en les dades recuperades per a aquest lloc. Consulteu el registre d\u2019evid\xE8ncies per veure les fonts i limitacions.",
      evidence: "Evid\xE8ncies",
      notScored: "Sense puntuaci\xF3",
      verified: "Verificat",
      modelled: "Modelitzat",
      needsVerification: "Cal verificar",
      site: "Empla\xE7ament i parcel\xB7la",
      location: "Ubicaci\xF3",
      coordinates: "Coordenades",
      area: "Superf\xEDcie",
      cadastralParcel: "Parcel\xB7la cadastral",
      officialArea: "Superf\xEDcie oficial",
      elevation: "Altitud",
      slope: "Pendent",
      aspect: "Orientaci\xF3",
      parcelCaption: "La geometria de la parcel\xB7la \xE9s una ajuda espacial. La titularitat i les c\xE0rregues legals queden fora de l\u2019abast de GroundSurf.",
      geology: "Dades geol\xF2giques",
      geologicalUnit: "Unitat geol\xF2gica",
      lithology: "Litologia",
      stratigraphicContext: "Context estratigr\xE0fic",
      groundwaterRegime: "R\xE8gim d\u2019aig\xFCes subterr\xE0nies",
      interpretation: "La classificaci\xF3 geol\xF2gica \xE9s preliminar i regional; no substitueix una investigaci\xF3 espec\xEDfica de la parcel\xB7la.",
      pedologicalProfile: "Perfil edafol\xF2gic",
      depth: "Profunditat",
      materialTexture: "Material / textura",
      mechanicalInterpretation: "Interpretaci\xF3 mec\xE0nica",
      sand: "Sorra",
      silt: "Llim",
      clay: "Argila",
      ground: "Condicions del terreny i fonaments",
      soilTexture: "Textura del s\xF2l",
      bearingCapacity: "Capacitat portant",
      bearingNote: "No es dedueix de SoilGrids; calen dades geot\xE8cniques espec\xEDfiques de l\u2019empla\xE7ament.",
      frictionAngle: "Angle de fricci\xF3",
      cohesion: "Cohesi\xF3",
      drainage: "Drenatge",
      hydraulicConductivity: "Conductivitat hidr\xE0ulica",
      bulkDensity: "Densitat aparent",
      hazards: "Cribratge de perills geol\xF2gics",
      noHazards: "No s\u2019han retornat registres estructurats de perill. Aix\xF2 no demostra que no hi hagi riscos.",
      flood: "Inundacions i hidrologia",
      groundwaterDepth: "Profunditat de l\u2019aigua subterr\xE0nia",
      groundwaterNotice: "Av\xEDs sobre les aig\xFCes subterr\xE0nies",
      geologicalPortal: "Portal geol\xF2gic",
      openSource: "Obre la font",
      floodEvidence: "Evid\xE8ncies d\u2019inundacions / hidrologia",
      environment: "Medi ambient",
      surroundingLandUse: "\xDAs del s\xF2l dels voltants",
      sourceRecords: "Registres de fonts",
      returnedRecords: "registres retornats",
      heritage: "Arqueologia i patrimoni",
      heritageSummary: "Cal consultar el registre oficial de patrimoni de l\u2019administraci\xF3 competent.",
      heritageDetail: "Aquest informe no constitueix una autoritzaci\xF3 arqueol\xF2gica. Consulteu el registre oficial abans de fer moviments de terra.",
      heritageLimitation: "Cal confirmar els registres oficials i els requisits legals.",
      planning: "Restriccions urban\xEDstiques i de desenvolupament",
      zoningDesignation: "Qualificaci\xF3 urban\xEDstica",
      buildingCoverage: "Ocupaci\xF3 m\xE0xima",
      biologicallyActiveArea: "Superf\xEDcie verda activa",
      maximumHeight: "Al\xE7ada m\xE0xima",
      setbacks: "Separacions m\xEDnimes",
      building: "Requisits de construcci\xF3",
      professional: "Els par\xE0metres urban\xEDstics i de construcci\xF3 s\xF3n preliminars. Confirmeu-los en la documentaci\xF3 oficial vigent.",
      development: "Implicacions per al desenvolupament",
      opportunities: "Possibles oportunitats",
      constraints: "Restriccions i incerteses principals",
      market: "Mercat i valor del s\xF2l",
      indicativeRange: "Interval orientatiu del valor del terreny",
      valuationNote: "Nom\xE9s valor del s\xF2l; s\u2019exclouen edificis i altres millores. Refer\xE8ncia estad\xEDstica, no taxaci\xF3 certificada.",
      medianUnit: "Valor mitj\xE0 del s\xF2l / unitat",
      valuationBasis: "Base de valoraci\xF3",
      comparableEvidence: "Dades comparables",
      investigations: "Investigacions recomanades",
      high: "Alt",
      medium: "Mitj\xE0",
      suggestedAuthority: "Administraci\xF3 / especialista recomanat",
      noChecklist: "No s\u2019ha rebut cap llista estructurada d\u2019investigacions. Reviseu les limitacions i les mancances de dades.",
      sourceLibrary: "Registre d\u2019evid\xE8ncies i biblioteca de fonts",
      directLinks: "enlla\xE7os directes a les fonts",
      sourceLibraryCaption: "Cada enlla\xE7 apunta a un servei oficial. Una font enumerada no implica que s\u2019hagin obtingut dades espec\xEDfiques de la parcel\xB7la.",
      sourceDescription: "Font oficial de dades i verificacions espec\xEDfiques del pa\xEDs.",
      showFewer: "Mostra\u2019n menys",
      showAll: "Mostra totes les fonts",
      pipelineSources: "Fonts retornades per l\u2019an\xE0lisi",
      providerMissing: "Prove\xEFdor no especificat",
      statusMissing: "Estat no especificat",
      disclaimerHeading: "Limitacions importants i advertiment professional",
      disclaimerOne: "GroundSurf \xE9s una eina de cribratge preliminar basada en dades p\xFAbliques. No substitueix una investigaci\xF3 professional, una decisi\xF3 oficial, assessorament jur\xEDdic o una valoraci\xF3 certificada.",
      disclaimerTwo: "L\u2019abs\xE8ncia d\u2019un perill o una restricci\xF3 registrats no demostra que no existeixin.",
      disclaimerThree: "Les dades cartografiades i modelitzades poden ser incompletes, antigues o generalitzades. Les decisions espec\xEDfiques requereixen investigacions adequades.",
      generated: "Generat",
      footer: "Avaluaci\xF3 preliminar GroundSurf"
    }
  };

  // src/i18n/reportPresentation.ts
  var en = {
    unavailable: "No data",
    section: "Section",
    limitation: "Limitation",
    sourceCited: "Source cited by analysis",
    back: "Back",
    subtitle: "Preliminary Site Assessment \xB7 Evidence first",
    embed: "Embed",
    copied: "Copied",
    share: "Share",
    executive: "Executive Summary",
    assessment: "Preliminary Site Assessment",
    summaryFallback: "The assessment is based on the datasets successfully retrieved for this site. See the evidence register for provenance and limitations.",
    evidence: "Evidence",
    notScored: "Not scored",
    verified: "Verified",
    modelled: "Modelled",
    needsVerification: "Needs verification",
    site: "Site & Parcel",
    location: "Location",
    coordinates: "Coordinates",
    area: "Area",
    cadastralParcel: "Cadastral parcel",
    officialArea: "Official area",
    elevation: "Elevation",
    slope: "Slope",
    aspect: "Aspect",
    parcelCaption: "Parcel geometry is a spatial evidence aid. Legal title, ownership and encumbrances are outside GroundSurf's scope.",
    geology: "Geological Evidence",
    geologicalUnit: "Geological unit",
    lithology: "Lithology",
    stratigraphicContext: "Stratigraphic context",
    groundwaterRegime: "Groundwater regime",
    interpretation: "The geological classification is preliminary and regional. It does not replace a site-specific geological investigation.",
    pedologicalProfile: "Pedological profile",
    depth: "Depth",
    materialTexture: "Material / texture",
    mechanicalInterpretation: "Mechanical interpretation",
    sand: "Sand",
    silt: "Silt",
    clay: "Clay",
    ground: "Ground & Foundation Conditions",
    soilTexture: "Soil texture",
    bearingCapacity: "Bearing capacity",
    bearingNote: "Not inferred from SoilGrids; site-specific engineering evidence is required",
    frictionAngle: "Friction angle",
    cohesion: "Cohesion",
    drainage: "Drainage",
    hydraulicConductivity: "Hydraulic conductivity",
    bulkDensity: "Bulk density",
    hazards: "Geohazard Screening",
    noHazards: "No structured hazard records were returned. This is not evidence that hazards are absent.",
    flood: "Flooding & Hydrology",
    groundwaterDepth: "Groundwater depth",
    groundwaterNotice: "Groundwater notice",
    geologicalPortal: "Geological portal",
    openSource: "Open source",
    floodEvidence: "Flood / hydrology evidence",
    environment: "Environment",
    surroundingLandUse: "Surrounding land use",
    sourceRecords: "Source records",
    returnedRecords: "returned records",
    heritage: "Archaeology & Heritage",
    heritageSummary: "Archaeological and heritage screening must use the competent national or regional register.",
    heritageDetail: "This report is not archaeological clearance. Check the official heritage register before ground disturbance.",
    heritageLimitation: "Official heritage records and legal requirements require confirmation.",
    planning: "Planning / Development Constraints",
    zoningDesignation: "Zoning designation",
    buildingCoverage: "Building coverage",
    biologicallyActiveArea: "Biologically active area",
    maximumHeight: "Maximum height",
    setbacks: "Setbacks",
    building: "Building & Regulatory Requirements",
    professional: "Planning and building parameters are preliminary. Confirm final requirements against current official documents and competent authorities.",
    development: "Development Implications",
    opportunities: "Potential opportunities",
    constraints: "Key constraints / uncertainties",
    market: "Land Market & Value Context",
    indicativeRange: "Indicative land-value range",
    valuationNote: "Land value only \u2014 buildings, structures and other improvements are excluded. Statistical benchmark, not a certified appraisal.",
    medianUnit: "Median land value / unit",
    valuationBasis: "Land valuation basis",
    comparableEvidence: "Comparable land evidence",
    investigations: "Recommended Investigations",
    high: "High",
    medium: "Medium",
    suggestedAuthority: "Suggested authority / expert",
    noChecklist: "No structured investigation checklist was returned. Review the limitations and evidence gaps above.",
    sourceLibrary: "Evidence Register & Source Library",
    directLinks: "direct source links",
    sourceLibraryCaption: "Each link below points to an authoritative national service. A listed source does not imply that every layer returned a site-specific feature.",
    sourceDescription: "Authoritative source for country-specific evidence and verification.",
    showFewer: "Show fewer",
    showAll: "Show all sources",
    pipelineSources: "Sources returned by the analysis pipeline",
    providerMissing: "Provider not specified",
    statusMissing: "Status not specified",
    disclaimerHeading: "Important limitations and professional disclaimer",
    disclaimerOne: "GroundSurf is a preliminary desktop screening and decision-support tool based on public datasets and automated spatial analysis. Any automated value shown is a land-only screening estimate: buildings, structures and other improvements are excluded. GroundSurf is not a professional site investigation, official decision, legal opinion, certified valuation or construction recommendation.",
    disclaimerTwo: "Absence of a recorded hazard, restriction or environmental issue is not evidence that it does not exist.",
    disclaimerThree: "Mapped and modelled information may be incomplete, outdated, spatially generalized or unavailable. Site-specific decisions require appropriate investigation and professional judgement.",
    generated: "Generated",
    footer: "GroundSurf preliminary assessment"
  };
  var sq = __spreadProps(__spreadValues({}, en), {
    unavailable: "Nuk ka t\xEB dh\xEBna",
    section: "Seksioni",
    limitation: "Kufizim",
    sourceCited: "Burimi i p\xEBrdorur n\xEB analiz\xEB",
    back: "Prapa",
    subtitle: "Vler\xEBsim paraprak i parcel\xEBs \xB7 S\xEB pari d\xEBshmit\xEB",
    executive: "P\xEBrmbledhje ekzekutive",
    assessment: "Vler\xEBsim paraprak i parcel\xEBs",
    summaryFallback: "Vler\xEBsimi bazohet n\xEB t\xEB dh\xEBnat q\xEB u mor\xEBn me sukses p\xEBr k\xEBt\xEB lokalizim. Burimi dhe kufizimet p\xEBrshkruhen n\xEB regjistrin e d\xEBshmive.",
    evidence: "D\xEBshmi",
    notScored: "Nuk vler\xEBsohet",
    verified: "E verifikuar",
    modelled: "E modeluar",
    needsVerification: "K\xEBrkon verifikim",
    site: "Lokalizimi dhe parcela",
    location: "Lokalizimi",
    coordinates: "Koordinatat",
    area: "Sip\xEBrfaqja",
    cadastralParcel: "Parcela kadastrale",
    officialArea: "Sip\xEBrfaqja zyrtare",
    elevation: "Lart\xEBsia",
    slope: "Pjerr\xEBsia",
    aspect: "Orientimi",
    parcelCaption: "Gjeometria e parcel\xEBs \xEBsht\xEB nj\xEB ndihm\xEB hap\xEBsinore. Titulli ligjor, pron\xEBsia dhe barrat nuk jan\xEB n\xEB objektin e GroundSurf.",
    geology: "D\xEBshmi gjeologjike",
    geologicalUnit: "Nj\xEBsia gjeologjike",
    lithology: "Litologjia",
    stratigraphicContext: "Konteksti stratigrafik",
    groundwaterRegime: "Kushtet e uj\xEBrave n\xEBntok\xEBsore",
    interpretation: "Klasifikimi gjeologjik \xEBsht\xEB paraprak dhe rajonal. Ai nuk z\xEBvend\xEBson nj\xEB studim gjeologjik specifik p\xEBr parcel\xEBn.",
    pedologicalProfile: "Profili pedologjik",
    depth: "Thell\xEBsia",
    materialTexture: "Materiali / tekstura",
    mechanicalInterpretation: "Interpretimi mekanik",
    sand: "R\xEBr\xEB",
    silt: "Silt",
    clay: "Argjil\xEB",
    ground: "Kushtet e truallit dhe themeleve",
    soilTexture: "Tekstura e tok\xEBs",
    bearingCapacity: "Aft\xEBsia mbajt\xEBse",
    bearingNote: "Nuk nxirret nga SoilGrids; k\xEBrkohen d\xEBshmi inxhinierike specifike p\xEBr parcel\xEBn",
    frictionAngle: "K\xEBndi i f\xEBrkimit",
    cohesion: "Kohezioni",
    drainage: "Drenazhimi",
    hydraulicConductivity: "P\xEBr\xE7ueshm\xEBria hidraulike",
    bulkDensity: "Dend\xEBsia v\xEBllimore",
    hazards: "Kontrolli i rreziqeve gjeologjike",
    noHazards: "Nuk u kthyen regjistra t\xEB strukturuar rreziku. Kjo nuk provon munges\xEBn e rreziqeve.",
    flood: "P\xEBrmbytjet dhe hidrologjia",
    groundwaterDepth: "Thell\xEBsia e uj\xEBrave n\xEBntok\xEBsore",
    groundwaterNotice: "Njoftim p\xEBr uj\xEBrat n\xEBntok\xEBsore",
    geologicalPortal: "Portali gjeologjik",
    openSource: "Hap burimin",
    floodEvidence: "D\xEBshmi p\xEBr p\xEBrmbytje / hidrologji",
    environment: "Mjedisi",
    surroundingLandUse: "P\xEBrdorimi i tok\xEBs p\xEBrreth",
    sourceRecords: "Regjistrat e burimeve",
    returnedRecords: "regjistra t\xEB kthyer",
    heritage: "Arkeologjia dhe trash\xEBgimia",
    heritageSummary: "Kontrolli arkeologjik dhe i trash\xEBgimis\xEB duhet t\xEB bazohet n\xEB regjistrin komb\xEBtar ose rajonal kompetent.",
    heritageDetail: "Ky raport nuk \xEBsht\xEB leje arkeologjike. Kontrolloni regjistrin zyrtar t\xEB trash\xEBgimis\xEB para punimeve n\xEB tok\xEB.",
    heritageLimitation: "Regjistrat zyrtar\xEB dhe k\xEBrkesat ligjore duhet t\xEB konfirmohen.",
    planning: "Planifikimi / kufizimet e zhvillimit",
    zoningDesignation: "P\xEBrcaktimi i p\xEBrdorimit",
    buildingCoverage: "Sip\xEBrfaqja e z\xEBn\xEB nga nd\xEBrtimi",
    biologicallyActiveArea: "Sip\xEBrfaqja biologjikisht aktive",
    maximumHeight: "Lart\xEBsia maksimale",
    setbacks: "Distancat nga kufijt\xEB",
    building: "K\xEBrkesat e nd\xEBrtimit dhe rregullatore",
    professional: "Parametrat e planifikimit dhe nd\xEBrtimit jan\xEB paraprak\xEB. K\xEBrkesat p\xEBrfundimtare duhet t\xEB konfirmohen n\xEB dokumentet zyrtare aktuale dhe nga autoritetet kompetente.",
    development: "Ndikimet p\xEBr zhvillimin",
    opportunities: "Mund\xEBsi t\xEB mundshme",
    constraints: "Kufizimet / pasigurit\xEB kryesore",
    market: "Tregu dhe konteksti i vler\xEBs s\xEB tok\xEBs",
    indicativeRange: "Interval orientues i vler\xEBs s\xEB tok\xEBs",
    valuationNote: "Vet\xEBm vlera e tok\xEBs \u2014 nd\xEBrtesat, strukturat dhe p\xEBrmir\xEBsimet e tjera p\xEBrjashtohen. Tregues statistikor, jo vler\xEBsim i certifikuar.",
    medianUnit: "Vlera mediane e tok\xEBs / nj\xEBsi",
    valuationBasis: "Baza e vler\xEBsimit t\xEB tok\xEBs",
    comparableEvidence: "D\xEBshmi krahasuese p\xEBr tok\xEBn",
    investigations: "Studimet e rekomanduara",
    high: "E lart\xEB",
    medium: "Mesatare",
    suggestedAuthority: "Autoriteti / specialisti i rekomanduar",
    noChecklist: "Nuk u kthye list\xEB e strukturuar e studimeve. Shqyrtoni kufizimet dhe boshll\xEBqet e d\xEBshmive m\xEB sip\xEBr.",
    sourceLibrary: "Regjistri i d\xEBshmive dhe biblioteka e burimeve",
    directLinks: "lidhje t\xEB drejtp\xEBrdrejta t\xEB burimeve",
    sourceLibraryCaption: "\xC7do lidhje m\xEB posht\xEB t\xEB \xE7on te nj\xEB sh\xEBrbim zyrtar. Prania e nj\xEB burimi nuk do t\xEB thot\xEB se \xE7do shtres\xEB ka kthyer nj\xEB objekt specifik p\xEBr parcel\xEBn.",
    sourceDescription: "Burim zyrtar p\xEBr d\xEBshmi dhe verifikim specifik p\xEBr vendin.",
    showFewer: "Shfaq m\xEB pak",
    showAll: "Shfaq t\xEB gjitha burimet",
    pipelineSources: "Burimet e kthyera nga analiza",
    providerMissing: "Ofruesi nuk \xEBsht\xEB specifikuar",
    statusMissing: "Statusi nuk \xEBsht\xEB specifikuar",
    disclaimerHeading: "Kufizime t\xEB r\xEBnd\xEBsishme dhe deklarat\xEB profesionale",
    disclaimerOne: "GroundSurf \xEBsht\xEB nj\xEB kontroll paraprak mbi t\xEB dh\xEBna publike dhe analiz\xEB hap\xEBsinore t\xEB automatizuar. \xC7do vler\xEB e paraqitur \xEBsht\xEB vet\xEBm nj\xEB tregues paraprak i tok\xEBs; nd\xEBrtesat dhe p\xEBrmir\xEBsimet e tjera p\xEBrjashtohen. GroundSurf nuk z\xEBvend\xEBson studimin profesional t\xEB parcel\xEBs, vendimin zyrtar, k\xEBshillimin ligjor, vler\xEBsimin e certifikuar ose rekomandimin e nd\xEBrtimit.",
    disclaimerTwo: "Mungesa e nj\xEB rreziku, kufizimi ose problemi mjedisor t\xEB regjistruar nuk provon se ai nuk ekziston.",
    disclaimerThree: "T\xEB dh\xEBnat e hart\xEBzuara dhe t\xEB modeluara mund t\xEB jen\xEB t\xEB paplota, t\xEB vjetruara, t\xEB p\xEBrgjith\xEBsuara ose t\xEB padisponueshme. Vendimet p\xEBr parcel\xEBn k\xEBrkojn\xEB studime t\xEB p\xEBrshtatshme dhe gjykim profesional.",
    generated: "Gjeneruar",
    footer: "Vler\xEBsim paraprak GroundSurf"
  });
  var pt = __spreadProps(__spreadValues({}, en), {
    unavailable: "Sem dados",
    section: "Sec\xE7\xE3o",
    limitation: "Limita\xE7\xE3o",
    sourceCited: "Fonte usada na an\xE1lise",
    back: "Voltar",
    subtitle: "Avalia\xE7\xE3o preliminar do local \xB7 Evid\xEAncia primeiro",
    executive: "Resumo executivo",
    assessment: "Avalia\xE7\xE3o preliminar do local",
    evidence: "Evid\xEAncia",
    notScored: "N\xE3o avaliado",
    verified: "Verificado",
    modelled: "Modelado",
    needsVerification: "Requer verifica\xE7\xE3o",
    site: "Local e terreno",
    location: "Localiza\xE7\xE3o",
    coordinates: "Coordenadas",
    area: "\xC1rea",
    cadastralParcel: "Parcela cadastral",
    officialArea: "\xC1rea oficial",
    elevation: "Altitude",
    slope: "Declive",
    aspect: "Orienta\xE7\xE3o",
    geology: "Evid\xEAncia geol\xF3gica",
    geologicalUnit: "Unidade geol\xF3gica",
    lithology: "Litologia",
    groundwaterRegime: "Regime de \xE1guas subterr\xE2neas",
    pedologicalProfile: "Perfil pedol\xF3gico",
    ground: "Condi\xE7\xF5es do terreno e funda\xE7\xF5es",
    soilTexture: "Textura do solo",
    bearingCapacity: "Capacidade de suporte",
    hazards: "Triagem de riscos geol\xF3gicos",
    noHazards: "N\xE3o foram devolvidos registos estruturados de risco. Isto n\xE3o prova a aus\xEAncia de riscos.",
    flood: "Inunda\xE7\xF5es e hidrologia",
    environment: "Ambiente",
    planning: "Condicionantes urban\xEDsticas",
    building: "Requisitos de constru\xE7\xE3o",
    development: "Implica\xE7\xF5es para o desenvolvimento",
    opportunities: "Poss\xEDveis oportunidades",
    constraints: "Principais limita\xE7\xF5es / incertezas",
    market: "Mercado e valor do terreno",
    investigations: "Investiga\xE7\xF5es recomendadas",
    high: "Alto",
    medium: "M\xE9dio",
    suggestedAuthority: "Autoridade / especialista recomendado",
    sourceLibrary: "Registo de evid\xEAncias e biblioteca de fontes",
    showFewer: "Mostrar menos",
    showAll: "Mostrar todas as fontes",
    disclaimerHeading: "Limita\xE7\xF5es importantes e aviso profissional",
    disclaimerOne: "O GroundSurf \xE9 uma ferramenta de triagem preliminar baseada em dados p\xFAblicos. N\xE3o substitui uma investiga\xE7\xE3o profissional do local, uma decis\xE3o oficial, aconselhamento jur\xEDdico ou uma avalia\xE7\xE3o certificada.",
    disclaimerTwo: "A aus\xEAncia de um risco ou restri\xE7\xE3o registado n\xE3o prova que este n\xE3o exista.",
    disclaimerThree: "Dados cartografados e modelados podem estar incompletos, desatualizados ou generalizados.",
    generated: "Gerado",
    footer: "Avalia\xE7\xE3o preliminar GroundSurf"
  });
  var et = __spreadProps(__spreadValues({}, en), {
    unavailable: "Andmed puuduvad",
    section: "Jaotis",
    limitation: "Piirang",
    sourceCited: "Anal\xFC\xFCsis kasutatud allikas",
    back: "Tagasi",
    subtitle: "Kinnistu esialgne hinnang \xB7 T\xF5endid esikohal",
    executive: "Kokkuv\xF5te",
    assessment: "Kinnistu esialgne hinnang",
    evidence: "T\xF5endid",
    notScored: "Ei hinnatud",
    verified: "Kontrollitud",
    modelled: "Modelleeritud",
    needsVerification: "Vajab kontrolli",
    site: "Asukoht ja kinnistu",
    location: "Asukoht",
    coordinates: "Koordinaadid",
    area: "Pindala",
    cadastralParcel: "Katastri\xFCksus",
    officialArea: "Ametlik pindala",
    elevation: "K\xF5rgus",
    slope: "Kalle",
    aspect: "K\xFClg",
    geology: "Geoloogilised t\xF5endid",
    geologicalUnit: "Geoloogiline \xFCksus",
    lithology: "Litoloogia",
    groundwaterRegime: "P\xF5hjaveere\u017Eiim",
    pedologicalProfile: "Mullaprofiil",
    ground: "Pinnas ja vundamenditingimused",
    soilTexture: "Pinnase tekstuur",
    bearingCapacity: "Kandev\xF5ime",
    hazards: "Geoloogiliste ohtude s\xF5eluuring",
    noHazards: "Struktureeritud ohurekordeid ei tagastatud. See ei t\xF5enda ohtude puudumist.",
    flood: "\xDCleujutus ja h\xFCdroloogia",
    environment: "Keskkond",
    planning: "Planeerimis- ja arenduspiirangud",
    building: "Ehitus- ja regulatiivsed n\xF5uded",
    development: "M\xF5ju arendusele",
    opportunities: "V\xF5imalikud v\xF5imalused",
    constraints: "Peamised piirangud / ebakindlused",
    market: "Maaturg ja v\xE4\xE4rtus",
    investigations: "Soovitatavad uuringud",
    high: "K\xF5rge",
    medium: "Keskmine",
    suggestedAuthority: "Soovitatud asutus / spetsialist",
    sourceLibrary: "T\xF5endite register ja allikate kogu",
    showFewer: "N\xE4ita v\xE4hem",
    showAll: "N\xE4ita k\xF5iki allikaid",
    disclaimerHeading: "Olulised piirangud ja ametialane m\xE4rkus",
    disclaimerOne: "GroundSurf on avalikel andmetel p\xF5hinev esmane s\xF5eluuringu ja otsusetoe t\xF6\xF6riist. See ei asenda kohapealset uuringut, ametlikku otsust, \xF5igusn\xF5u ega sertifitseeritud hindamist.",
    disclaimerTwo: "Registreeritud ohu v\xF5i piirangu puudumine ei t\xF5enda selle tegelikku puudumist.",
    disclaimerThree: "Kaardistatud ja modelleeritud andmed v\xF5ivad olla puudulikud, aegunud v\xF5i \xFCldistatud.",
    generated: "Koostatud",
    footer: "GroundSurfi esialgne hinnang"
  });
  var lv = __spreadProps(__spreadValues({}, en), {
    unavailable: "Nav datu",
    section: "Sada\u013Ca",
    limitation: "Ierobe\u017Eojums",
    sourceCited: "Anal\u012Bz\u0113 izmantotais avots",
    back: "Atpaka\u013C",
    subtitle: "S\u0101kotn\u0113jais zemesgabala nov\u0113rt\u0113jums \xB7 Pier\u0101d\u012Bjumi pirmaj\u0101 viet\u0101",
    executive: "Kopsavilkums",
    assessment: "S\u0101kotn\u0113jais zemesgabala nov\u0113rt\u0113jums",
    evidence: "Pier\u0101d\u012Bjumi",
    notScored: "Nav v\u0113rt\u0113ts",
    verified: "P\u0101rbaud\u012Bts",
    modelled: "Model\u0113ts",
    needsVerification: "Nepiecie\u0161ama p\u0101rbaude",
    site: "Vieta un zemesgabals",
    location: "Atra\u0161an\u0101s vieta",
    coordinates: "Koordin\u0101tas",
    area: "Plat\u012Bba",
    cadastralParcel: "Kadastra zemesgabals",
    officialArea: "Ofici\u0101l\u0101 plat\u012Bba",
    elevation: "Augstums",
    slope: "Sl\u012Bpums",
    aspect: "Ekspoz\u012Bcija",
    geology: "\u0122eolo\u0123iskie pier\u0101d\u012Bjumi",
    geologicalUnit: "\u0122eolo\u0123isk\u0101 vien\u012Bba",
    lithology: "Litolo\u0123ija",
    groundwaterRegime: "Grunts\u016Bde\u0146u re\u017E\u012Bms",
    pedologicalProfile: "Augsnes profils",
    ground: "Grunts un pamatu apst\u0101k\u013Ci",
    soilTexture: "Augsnes tekst\u016Bra",
    bearingCapacity: "Nestsp\u0113ja",
    hazards: "\u0122eolo\u0123isko risku s\u0101kotn\u0113j\u0101 p\u0101rbaude",
    noHazards: "Struktur\u0113ti riska ieraksti netika sa\u0146emti. Tas nav pier\u0101d\u012Bjums, ka risku nav.",
    flood: "Pl\u016Bdi un hidrolo\u0123ija",
    environment: "Vide",
    planning: "Teritorijas pl\u0101no\u0161anas un att\u012Bst\u012Bbas ierobe\u017Eojumi",
    building: "B\u016Bvniec\u012Bbas un normat\u012Bv\u0101s pras\u012Bbas",
    development: "Ietekme uz att\u012Bst\u012Bbu",
    opportunities: "Iesp\u0113jam\u0101s iesp\u0113jas",
    constraints: "B\u016Btisk\u0101kie ierobe\u017Eojumi / neskaidr\u012Bbas",
    market: "Zemes tirgus un v\u0113rt\u012Bbas konteksts",
    investigations: "Ieteicamie p\u0113t\u012Bjumi",
    high: "Augsts",
    medium: "Vid\u0113js",
    suggestedAuthority: "Ieteicam\u0101 iest\u0101de / speci\u0101lists",
    sourceLibrary: "Pier\u0101d\u012Bjumu re\u0123istrs un avotu bibliot\u0113ka",
    showFewer: "R\u0101d\u012Bt maz\u0101k",
    showAll: "R\u0101d\u012Bt visus avotus",
    disclaimerHeading: "Svar\u012Bgi ierobe\u017Eojumi un profesion\u0101la piez\u012Bme",
    disclaimerOne: "GroundSurf ir s\u0101kotn\u0113j\u0101s p\u0101rbaudes un l\u0113mumu atbalsta r\u012Bks, kas balst\u012Bts uz publiskiem datiem. Tas neaizst\u0101j vietas izp\u0113ti, ofici\u0101lu l\u0113mumu, juridisku konsult\u0101ciju vai sertific\u0113tu v\u0113rt\u0113jumu.",
    disclaimerTwo: "Re\u0123istr\u0113ta riska vai ierobe\u017Eojuma neesam\u012Bba nav pier\u0101d\u012Bjums, ka t\u0101 nav.",
    disclaimerThree: "Kart\u0113tie un model\u0113tie dati var b\u016Bt nepiln\u012Bgi, novecoju\u0161i vai visp\u0101rin\u0101ti.",
    generated: "Izveidots",
    footer: "GroundSurf s\u0101kotn\u0113jais nov\u0113rt\u0113jums"
  });
  var lt = __spreadProps(__spreadValues({}, en), {
    unavailable: "Duomen\u0173 n\u0117ra",
    section: "Skiltis",
    limitation: "Apribojimas",
    sourceCited: "Analiz\u0117je naudotas \u0161altinis",
    back: "Atgal",
    subtitle: "Preliminarus sklypo vertinimas \xB7 \u012Erodymai pirmiausia",
    executive: "Santrauka",
    assessment: "Preliminarus sklypo vertinimas",
    evidence: "\u012Erodymai",
    notScored: "Ne\u012Fvertinta",
    verified: "Patvirtinta",
    modelled: "Sumodeliuota",
    needsVerification: "Reikia patikrinti",
    site: "Vieta ir sklypas",
    location: "Vieta",
    coordinates: "Koordinat\u0117s",
    area: "Plotas",
    cadastralParcel: "Kadastrinis sklypas",
    officialArea: "Oficialus plotas",
    elevation: "Auk\u0161tis",
    slope: "Nuolydis",
    aspect: "Ekspozicija",
    geology: "Geologiniai \u012Frodymai",
    geologicalUnit: "Geologinis vienetas",
    lithology: "Litologija",
    groundwaterRegime: "Po\u017Eeminio vandens re\u017Eimas",
    pedologicalProfile: "Dirvo\u017Eemio profilis",
    ground: "Gruntas ir pamat\u0173 s\u0105lygos",
    soilTexture: "Dirvo\u017Eemio tekst\u016Bra",
    bearingCapacity: "Laikomoji geba",
    hazards: "Geologini\u0173 pavoj\u0173 patikra",
    noHazards: "Strukt\u016Brizuot\u0173 pavoj\u0173 \u012Fra\u0161\u0173 negauta. Tai ne\u012Frodo, kad pavoj\u0173 n\u0117ra.",
    flood: "Potvyniai ir hidrologija",
    environment: "Aplinka",
    planning: "Planavimo ir pl\u0117tros apribojimai",
    building: "Statybos ir reglamentavimo reikalavimai",
    development: "Poveikis pl\u0117trai",
    opportunities: "Galimos galimyb\u0117s",
    constraints: "Svarbiausi apribojimai / neapibr\u0117\u017Etumas",
    market: "\u017Dem\u0117s rinka ir vert\u0117s kontekstas",
    investigations: "Rekomenduojami tyrimai",
    high: "Auk\u0161tas",
    medium: "Vidutinis",
    suggestedAuthority: "Rekomenduojama institucija / specialistas",
    sourceLibrary: "\u012Erodym\u0173 registras ir \u0161altini\u0173 biblioteka",
    showFewer: "Rodyti ma\u017Eiau",
    showAll: "Rodyti visus \u0161altinius",
    disclaimerHeading: "Svarb\u016Bs apribojimai ir profesin\u0117 pastaba",
    disclaimerOne: "GroundSurf yra vie\u0161ais duomenimis pagr\u012Fstas preliminarios patikros ir sprendim\u0173 palaikymo \u012Frankis. Jis nepakei\u010Dia vietos tyrimo, oficialaus sprendimo, teisin\u0117s konsultacijos ar sertifikuoto vertinimo.",
    disclaimerTwo: "U\u017Eregistruotos rizikos ar apribojimo nebuvimas ne\u012Frodo, kad jo n\u0117ra.",
    disclaimerThree: "Kartografuoti ir modeliuoti duomenys gali b\u016Bti nei\u0161sam\u016Bs, pasen\u0119 arba apibendrinti.",
    generated: "Sugeneruota",
    footer: "Preliminarus GroundSurf vertinimas"
  });
  var uk = __spreadProps(__spreadValues({}, en), {
    unavailable: "\u041D\u0435\u043C\u0430\u0454 \u0434\u0430\u043D\u0438\u0445",
    section: "\u0420\u043E\u0437\u0434\u0456\u043B",
    limitation: "\u041E\u0431\u043C\u0435\u0436\u0435\u043D\u043D\u044F",
    sourceCited: "\u0414\u0436\u0435\u0440\u0435\u043B\u043E, \u0432\u0438\u043A\u043E\u0440\u0438\u0441\u0442\u0430\u043D\u0435 \u0432 \u0430\u043D\u0430\u043B\u0456\u0437\u0456",
    back: "\u041D\u0430\u0437\u0430\u0434",
    subtitle: "\u041F\u043E\u043F\u0435\u0440\u0435\u0434\u043D\u044F \u043E\u0446\u0456\u043D\u043A\u0430 \u0434\u0456\u043B\u044F\u043D\u043A\u0438 \xB7 \u0421\u043F\u043E\u0447\u0430\u0442\u043A\u0443 \u0434\u043E\u043A\u0430\u0437\u0438",
    executive: "\u041F\u0456\u0434\u0441\u0443\u043C\u043E\u043A",
    assessment: "\u041F\u043E\u043F\u0435\u0440\u0435\u0434\u043D\u044F \u043E\u0446\u0456\u043D\u043A\u0430 \u0434\u0456\u043B\u044F\u043D\u043A\u0438",
    evidence: "\u0414\u043E\u043A\u0430\u0437\u0438",
    verified: "\u041F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0436\u0435\u043D\u043E",
    modelled: "\u0417\u043C\u043E\u0434\u0435\u043B\u044C\u043E\u0432\u0430\u043D\u043E",
    needsVerification: "\u041F\u043E\u0442\u0440\u0435\u0431\u0443\u0454 \u043F\u0435\u0440\u0435\u0432\u0456\u0440\u043A\u0438",
    site: "\u041C\u0456\u0441\u0446\u0435 \u0442\u0430 \u0434\u0456\u043B\u044F\u043D\u043A\u0430",
    location: "\u041C\u0456\u0441\u0446\u0435",
    coordinates: "\u041A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442\u0438",
    area: "\u041F\u043B\u043E\u0449\u0430",
    cadastralParcel: "\u041A\u0430\u0434\u0430\u0441\u0442\u0440\u043E\u0432\u0430 \u0434\u0456\u043B\u044F\u043D\u043A\u0430",
    officialArea: "\u041E\u0444\u0456\u0446\u0456\u0439\u043D\u0430 \u043F\u043B\u043E\u0449\u0430",
    elevation: "\u0412\u0438\u0441\u043E\u0442\u0430",
    slope: "\u0423\u0445\u0438\u043B",
    aspect: "\u0415\u043A\u0441\u043F\u043E\u0437\u0438\u0446\u0456\u044F",
    geology: "\u0413\u0435\u043E\u043B\u043E\u0433\u0456\u0447\u043D\u0456 \u0434\u0430\u043D\u0456",
    geologicalUnit: "\u0413\u0435\u043E\u043B\u043E\u0433\u0456\u0447\u043D\u0430 \u043E\u0434\u0438\u043D\u0438\u0446\u044F",
    lithology: "\u041B\u0456\u0442\u043E\u043B\u043E\u0433\u0456\u044F",
    stratigraphicContext: "\u0421\u0442\u0440\u0430\u0442\u0438\u0433\u0440\u0430\u0444\u0456\u0447\u043D\u0438\u0439 \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442",
    groundwaterRegime: "\u0413\u0456\u0434\u0440\u043E\u0433\u0435\u043E\u043B\u043E\u0433\u0456\u0447\u043D\u0456 \u0443\u043C\u043E\u0432\u0438",
    interpretation: "\u0413\u0435\u043E\u043B\u043E\u0433\u0456\u0447\u043D\u0430 \u043A\u043B\u0430\u0441\u0438\u0444\u0456\u043A\u0430\u0446\u0456\u044F \u0454 \u043F\u043E\u043F\u0435\u0440\u0435\u0434\u043D\u044C\u043E\u044E \u0442\u0430 \u0440\u0435\u0433\u0456\u043E\u043D\u0430\u043B\u044C\u043D\u043E\u044E \u0456 \u043D\u0435 \u0437\u0430\u043C\u0456\u043D\u044E\u0454 \u0434\u043E\u0441\u043B\u0456\u0434\u0436\u0435\u043D\u043D\u044F \u043A\u043E\u043D\u043A\u0440\u0435\u0442\u043D\u043E\u0457 \u0434\u0456\u043B\u044F\u043D\u043A\u0438.",
    pedologicalProfile: "\u0490\u0440\u0443\u043D\u0442\u043E\u0432\u0438\u0439 \u043F\u0440\u043E\u0444\u0456\u043B\u044C",
    depth: "\u0413\u043B\u0438\u0431\u0438\u043D\u0430",
    materialTexture: "\u041C\u0430\u0442\u0435\u0440\u0456\u0430\u043B / \u0442\u0435\u043A\u0441\u0442\u0443\u0440\u0430",
    mechanicalInterpretation: "\u041C\u0435\u0445\u0430\u043D\u0456\u0447\u043D\u0430 \u0456\u043D\u0442\u0435\u0440\u043F\u0440\u0435\u0442\u0430\u0446\u0456\u044F",
    sand: "\u041F\u0456\u0441\u043E\u043A",
    silt: "\u041F\u0438\u043B\u0443\u0432\u0430\u0442\u0430 \u0444\u0440\u0430\u043A\u0446\u0456\u044F",
    clay: "\u0413\u043B\u0438\u043D\u0430",
    ground: "\u0490\u0440\u0443\u043D\u0442 \u0456 \u0444\u0443\u043D\u0434\u0430\u043C\u0435\u043D\u0442",
    soilTexture: "\u0422\u0435\u043A\u0441\u0442\u0443\u0440\u0430 \u0491\u0440\u0443\u043D\u0442\u0443",
    bearingCapacity: "\u041D\u0435\u0441\u0443\u0447\u0430 \u0437\u0434\u0430\u0442\u043D\u0456\u0441\u0442\u044C",
    hazards: "\u041F\u0435\u0440\u0435\u0432\u0456\u0440\u043A\u0430 \u0433\u0435\u043E\u043B\u043E\u0433\u0456\u0447\u043D\u0438\u0445 \u043D\u0435\u0431\u0435\u0437\u043F\u0435\u043A",
    flood: "\u041F\u043E\u0432\u0435\u043D\u0456 \u0442\u0430 \u0433\u0456\u0434\u0440\u043E\u043B\u043E\u0433\u0456\u044F",
    groundwaterDepth: "\u0413\u043B\u0438\u0431\u0438\u043D\u0430 \u0491\u0440\u0443\u043D\u0442\u043E\u0432\u0438\u0445 \u0432\u043E\u0434",
    groundwaterNotice: "\u0406\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0456\u044F \u043F\u0440\u043E \u0491\u0440\u0443\u043D\u0442\u043E\u0432\u0456 \u0432\u043E\u0434\u0438",
    geologicalPortal: "\u0413\u0435\u043E\u043B\u043E\u0433\u0456\u0447\u043D\u0438\u0439 \u043F\u043E\u0440\u0442\u0430\u043B",
    openSource: "\u0412\u0456\u0434\u043A\u0440\u0438\u0442\u0438 \u0434\u0436\u0435\u0440\u0435\u043B\u043E",
    environment: "\u0414\u043E\u0432\u043A\u0456\u043B\u043B\u044F",
    surroundingLandUse: "\u0417\u0435\u043C\u043B\u0435\u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u043D\u043D\u044F \u043D\u0430\u0432\u043A\u043E\u043B\u043E",
    sourceRecords: "\u0417\u0430\u043F\u0438\u0441\u0438 \u0434\u0436\u0435\u0440\u0435\u043B",
    heritage: "\u0410\u0440\u0445\u0435\u043E\u043B\u043E\u0433\u0456\u044F \u0442\u0430 \u0441\u043F\u0430\u0434\u0449\u0438\u043D\u0430",
    planning: "\u041F\u043B\u0430\u043D\u0443\u0432\u0430\u043D\u043D\u044F \u0442\u0430 \u043E\u0431\u043C\u0435\u0436\u0435\u043D\u043D\u044F \u0437\u0430\u0431\u0443\u0434\u043E\u0432\u0438",
    zoningDesignation: "\u041C\u0456\u0441\u0442\u043E\u0431\u0443\u0434\u0456\u0432\u043D\u0435 \u043F\u0440\u0438\u0437\u043D\u0430\u0447\u0435\u043D\u043D\u044F",
    building: "\u0411\u0443\u0434\u0456\u0432\u0435\u043B\u044C\u043D\u0456 \u0442\u0430 \u0440\u0435\u0433\u0443\u043B\u044F\u0442\u043E\u0440\u043D\u0456 \u0432\u0438\u043C\u043E\u0433\u0438",
    development: "\u041D\u0430\u0441\u043B\u0456\u0434\u043A\u0438 \u0434\u043B\u044F \u0437\u0430\u0431\u0443\u0434\u043E\u0432\u0438",
    opportunities: "\u041C\u043E\u0436\u043B\u0438\u0432\u0456 \u043C\u043E\u0436\u043B\u0438\u0432\u043E\u0441\u0442\u0456",
    constraints: "\u041E\u0441\u043D\u043E\u0432\u043D\u0456 \u043E\u0431\u043C\u0435\u0436\u0435\u043D\u043D\u044F / \u043D\u0435\u0432\u0438\u0437\u043D\u0430\u0447\u0435\u043D\u043E\u0441\u0442\u0456",
    market: "\u0420\u0438\u043D\u043E\u043A \u0442\u0430 \u0432\u0430\u0440\u0442\u0456\u0441\u0442\u044C \u0437\u0435\u043C\u043B\u0456",
    indicativeRange: "\u041E\u0440\u0456\u0454\u043D\u0442\u043E\u0432\u043D\u0438\u0439 \u0434\u0456\u0430\u043F\u0430\u0437\u043E\u043D \u0432\u0430\u0440\u0442\u043E\u0441\u0442\u0456 \u0437\u0435\u043C\u043B\u0456",
    valuationNote: "\u041B\u0438\u0448\u0435 \u0432\u0430\u0440\u0442\u0456\u0441\u0442\u044C \u0437\u0435\u043C\u043B\u0456; \u0431\u0443\u0434\u0456\u0432\u043B\u0456 \u0442\u0430 \u0456\u043D\u0448\u0456 \u043F\u043E\u043B\u0456\u043F\u0448\u0435\u043D\u043D\u044F \u043D\u0435 \u0432\u0440\u0430\u0445\u043E\u0432\u0430\u043D\u0456. \u0426\u0435 \u0441\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u0447\u043D\u0438\u0439 \u043E\u0440\u0456\u0454\u043D\u0442\u0438\u0440, \u0430 \u043D\u0435 \u0441\u0435\u0440\u0442\u0438\u0444\u0456\u043A\u043E\u0432\u0430\u043D\u0430 \u043E\u0446\u0456\u043D\u043A\u0430.",
    investigations: "\u0420\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u043E\u0432\u0430\u043D\u0456 \u0434\u043E\u0441\u043B\u0456\u0434\u0436\u0435\u043D\u043D\u044F",
    high: "\u0412\u0438\u0441\u043E\u043A\u0438\u0439",
    medium: "\u0421\u0435\u0440\u0435\u0434\u043D\u0456\u0439",
    suggestedAuthority: "\u0420\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u043E\u0432\u0430\u043D\u0438\u0439 \u043E\u0440\u0433\u0430\u043D / \u0444\u0430\u0445\u0456\u0432\u0435\u0446\u044C",
    sourceLibrary: "\u0420\u0435\u0454\u0441\u0442\u0440 \u0434\u043E\u043A\u0430\u0437\u0456\u0432 \u0456 \u0431\u0456\u0431\u043B\u0456\u043E\u0442\u0435\u043A\u0430 \u0434\u0436\u0435\u0440\u0435\u043B",
    directLinks: "\u043F\u0440\u044F\u043C\u0456 \u043F\u043E\u0441\u0438\u043B\u0430\u043D\u043D\u044F \u043D\u0430 \u0434\u0436\u0435\u0440\u0435\u043B\u0430",
    showFewer: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u0438 \u043C\u0435\u043D\u0448\u0435",
    showAll: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u0438 \u0432\u0441\u0456 \u0434\u0436\u0435\u0440\u0435\u043B\u0430",
    pipelineSources: "\u0414\u0436\u0435\u0440\u0435\u043B\u0430, \u043F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u0456 \u0430\u043D\u0430\u043B\u0456\u0437\u043E\u043C",
    providerMissing: "\u041F\u043E\u0441\u0442\u0430\u0447\u0430\u043B\u044C\u043D\u0438\u043A \u043D\u0435 \u0432\u043A\u0430\u0437\u0430\u043D\u0438\u0439",
    statusMissing: "\u0421\u0442\u0430\u0442\u0443\u0441 \u043D\u0435 \u0432\u043A\u0430\u0437\u0430\u043D\u0438\u0439",
    disclaimerHeading: "\u0412\u0430\u0436\u043B\u0438\u0432\u0456 \u043E\u0431\u043C\u0435\u0436\u0435\u043D\u043D\u044F \u0442\u0430 \u043F\u0440\u043E\u0444\u0435\u0441\u0456\u0439\u043D\u0435 \u0437\u0430\u0441\u0442\u0435\u0440\u0435\u0436\u0435\u043D\u043D\u044F",
    disclaimerOne: "GroundSurf \u0454 \u043F\u043E\u043F\u0435\u0440\u0435\u0434\u043D\u0456\u043C \u0456\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u043E\u043C \u0430\u043D\u0430\u043B\u0456\u0437\u0443 \u0432\u0456\u0434\u043A\u0440\u0438\u0442\u0438\u0445 \u0434\u0430\u043D\u0438\u0445. \u0412\u0456\u043D \u043D\u0435 \u0437\u0430\u043C\u0456\u043D\u044E\u0454 \u043E\u0444\u0456\u0446\u0456\u0439\u043D\u043E\u0433\u043E \u0440\u0456\u0448\u0435\u043D\u043D\u044F, \u044E\u0440\u0438\u0434\u0438\u0447\u043D\u043E\u0457 \u0434\u0443\u043C\u043A\u0438, \u0441\u0435\u0440\u0442\u0438\u0444\u0456\u043A\u043E\u0432\u0430\u043D\u043E\u0457 \u043E\u0446\u0456\u043D\u043A\u0438 \u0447\u0438 \u043F\u0440\u043E\u0444\u0435\u0441\u0456\u0439\u043D\u043E\u0433\u043E \u0434\u043E\u0441\u043B\u0456\u0434\u0436\u0435\u043D\u043D\u044F \u0434\u0456\u043B\u044F\u043D\u043A\u0438.",
    disclaimerTwo: "\u0412\u0456\u0434\u0441\u0443\u0442\u043D\u0456\u0441\u0442\u044C \u0437\u0430\u0444\u0456\u043A\u0441\u043E\u0432\u0430\u043D\u043E\u0457 \u043D\u0435\u0431\u0435\u0437\u043F\u0435\u043A\u0438 \u0430\u0431\u043E \u043E\u0431\u043C\u0435\u0436\u0435\u043D\u043D\u044F \u043D\u0435 \u0434\u043E\u0432\u043E\u0434\u0438\u0442\u044C \u0457\u0445 \u0432\u0456\u0434\u0441\u0443\u0442\u043D\u043E\u0441\u0442\u0456.",
    disclaimerThree: "\u041A\u0430\u0440\u0442\u043E\u0433\u0440\u0430\u0444\u0456\u0447\u043D\u0456 \u0442\u0430 \u043C\u043E\u0434\u0435\u043B\u044C\u043E\u0432\u0430\u043D\u0456 \u0434\u0430\u043D\u0456 \u043C\u043E\u0436\u0443\u0442\u044C \u0431\u0443\u0442\u0438 \u043D\u0435\u043F\u043E\u0432\u043D\u0438\u043C\u0438, \u0437\u0430\u0441\u0442\u0430\u0440\u0456\u043B\u0438\u043C\u0438 \u0430\u0431\u043E \u0443\u0437\u0430\u0433\u0430\u043B\u044C\u043D\u0435\u043D\u0438\u043C\u0438. \u0420\u0456\u0448\u0435\u043D\u043D\u044F \u0449\u043E\u0434\u043E \u043A\u043E\u043D\u043A\u0440\u0435\u0442\u043D\u043E\u0457 \u0434\u0456\u043B\u044F\u043D\u043A\u0438 \u043F\u043E\u0442\u0440\u0435\u0431\u0443\u044E\u0442\u044C \u043D\u0430\u043B\u0435\u0436\u043D\u0438\u0445 \u0434\u043E\u0441\u043B\u0456\u0434\u0436\u0435\u043D\u044C.",
    generated: "\u0421\u0442\u0432\u043E\u0440\u0435\u043D\u043E",
    footer: "\u041F\u043E\u043F\u0435\u0440\u0435\u0434\u043D\u044F \u043E\u0446\u0456\u043D\u043A\u0430 GroundSurf"
  });
  var it = __spreadProps(__spreadValues({}, en), {
    unavailable: "Non disponibile",
    section: "Sezione",
    limitation: "Limite del dato",
    sourceCited: "Fonte citata",
    back: "Indietro",
    subtitle: "Analisi preliminare del terreno \xB7 Dati prima delle ipotesi",
    executive: "Sintesi",
    assessment: "Valutazione preliminare del terreno",
    summaryFallback: "La valutazione si basa sui dati pubblici effettivamente recuperati per questa posizione. Consultare il registro delle evidenze per verificare fonti e limiti.",
    embed: "Incorpora",
    copied: "Copiato",
    share: "Condividi",
    evidence: "Evidenze",
    notScored: "Non valutato",
    verified: "Verificato",
    modelled: "Modellato",
    needsVerification: "Da verificare",
    site: "Terreno e particella",
    location: "Localit\xE0",
    coordinates: "Coordinate",
    area: "Superficie",
    cadastralParcel: "Particella catastale",
    officialArea: "Superficie ufficiale",
    elevation: "Quota",
    slope: "Pendenza",
    aspect: "Esposizione",
    parcelCaption: "La geometria catastale \xE8 un riferimento cartografico. Titolarit\xE0, servit\xF9 e vincoli richiedono la consultazione dei registri ufficiali.",
    geology: "Geologia",
    geologicalUnit: "Unit\xE0 geologica",
    lithology: "Litologia",
    stratigraphicContext: "Et\xE0 e contesto stratigrafico",
    groundwaterRegime: "Contesto idrogeologico",
    interpretation: "La cartografia geologica \xE8 un dato regionale: non sostituisce la verifica geotecnica sul terreno.",
    pedologicalProfile: "Profilo pedologico",
    depth: "Profondit\xE0",
    materialTexture: "Materiale / tessitura",
    mechanicalInterpretation: "Interpretazione geotecnica",
    sand: "Sabbia",
    silt: "Limo",
    clay: "Argilla",
    ground: "Condizioni del terreno e fondazioni",
    soilTexture: "Tessitura del suolo",
    bearingCapacity: "Capacit\xE0 portante",
    bearingNote: "Non ricavabile da SoilGrids; servono prove geotecniche riferite al progetto.",
    frictionAngle: "Angolo di attrito",
    cohesion: "Coesione",
    drainage: "Drenaggio",
    hydraulicConductivity: "Conducibilit\xE0 idraulica",
    bulkDensity: "Densit\xE0 apparente",
    hazards: "Verifica preliminare dei pericoli geologici",
    noHazards: "Non sono stati restituiti risultati verificati per le categorie di pericolo. Questo non dimostra che i pericoli siano assenti.",
    flood: "Alluvioni e idrologia",
    groundwaterDepth: "Profondit\xE0 della falda",
    groundwaterNotice: "Nota sulle acque sotterranee",
    geologicalPortal: "Portale geologico",
    openSource: "Apri la fonte",
    floodEvidence: "Evidenze idrologiche e alluvionali",
    environment: "Ambiente",
    surroundingLandUse: "Uso del suolo circostante",
    sourceRecords: "Record delle fonti",
    returnedRecords: "record restituiti",
    heritage: "Archeologia e beni culturali",
    heritageSummary: "La verifica del patrimonio archeologico richiede la consultazione degli archivi delle autorit\xE0 competenti.",
    heritageDetail: "Questa analisi non costituisce un nulla osta archeologico: verificare gli archivi ufficiali prima di effettuare scavi.",
    heritageLimitation: "Vincoli e prescrizioni devono essere confermati dagli organi competenti.",
    planning: "Urbanistica e vincoli edificatori",
    zoningDesignation: "Destinazione urbanistica",
    buildingCoverage: "Rapporto di copertura",
    biologicallyActiveArea: "Superficie permeabile",
    maximumHeight: "Altezza massima",
    setbacks: "Distanze dai confini",
    building: "Requisiti urbanistici ed edilizi",
    professional: "Gli indici e i requisiti edilizi sono preliminari: verificare gli strumenti urbanistici vigenti e le indicazioni degli uffici competenti.",
    development: "Implicazioni per il progetto",
    opportunities: "Aspetti favorevoli",
    constraints: "Vincoli e incertezze principali",
    market: "Mercato e valore del terreno",
    indicativeRange: "Intervallo indicativo del valore del terreno",
    valuationNote: "Il valore riguarda soltanto il terreno, senza edifici o migliorie; \xE8 un riferimento statistico, non una perizia.",
    medianUnit: "Valore mediano per unit\xE0 di superficie",
    valuationBasis: "Base della stima",
    comparableEvidence: "Dati di confronto",
    investigations: "Verifiche consigliate",
    high: "Alta",
    medium: "Media",
    suggestedAuthority: "Ente o professionista competente",
    noChecklist: "Non sono state restituite verifiche strutturate. Consultare le lacune e i limiti dei dati indicati sopra.",
    sourceLibrary: "Registro delle evidenze e fonti",
    directLinks: "collegamenti alle fonti",
    sourceLibraryCaption: "I collegamenti rimandano alle fonti. La presenza di una fonte non significa che ogni livello abbia restituito un risultato specifico per questo terreno.",
    sourceDescription: "Fonte ufficiale per i dati territoriali e le verifiche specifiche.",
    showFewer: "Mostra meno",
    showAll: "Mostra tutte le fonti",
    pipelineSources: "Fonti consultate durante l\u2019analisi",
    providerMissing: "Ente non indicato",
    statusMissing: "Stato non indicato",
    disclaimerHeading: "Limiti importanti e avvertenze",
    disclaimerOne: "GroundSurf \xE8 uno strumento preliminare basato su dati pubblici. Non sostituisce indagini professionali, certificati ufficiali, consulenze legali o perizie di stima.",
    disclaimerTwo: "L\u2019assenza di una criticit\xE0 registrata non dimostra l\u2019assenza di un rischio o di un vincolo.",
    disclaimerThree: "I dati cartografici e modellati possono essere incompleti, datati o generalizzati. Le scelte progettuali richiedono verifiche riferite al sito.",
    generated: "Generato il",
    footer: "Valutazione preliminare GroundSurf"
  });
  var ro = __spreadValues(__spreadValues({}, en), NEW_REPORT_LANGUAGE_COPY.ro);
  var is = __spreadValues(__spreadValues({}, en), NEW_REPORT_LANGUAGE_COPY.is);
  var ca = __spreadValues(__spreadValues({}, en), NEW_REPORT_LANGUAGE_COPY.ca);
  var enumLabels = {
    it: {
      NEGLIGIBLE: "Trascurabile",
      LOW: "Bassa",
      MODERATE: "Moderata",
      HIGH: "Alta",
      MODELLED: "Modellato",
      VERIFIED: "Verificato",
      REQUIRES_VERIFICATION: "Da verificare"
    },
    en: {
      NEGLIGIBLE: "Negligible",
      LOW: "Low",
      MODERATE: "Moderate",
      HIGH: "High",
      MODELLED: "Modelled",
      VERIFIED: "Verified",
      REQUIRES_VERIFICATION: "Requires verification"
    },
    de: {
      NEGLIGIBLE: "Vernachl\xE4ssigbar",
      LOW: "Gering",
      MODERATE: "M\xE4\xDFig",
      HIGH: "Hoch",
      MODELLED: "Modelliert",
      VERIFIED: "Verifiziert",
      REQUIRES_VERIFICATION: "Pr\xFCfung erforderlich"
    },
    pl: {
      NEGLIGIBLE: "Znikome",
      LOW: "Niskie",
      MODERATE: "Umiarkowane",
      HIGH: "Wysokie",
      MODELLED: "Modelowane",
      VERIFIED: "Zweryfikowane",
      REQUIRES_VERIFICATION: "Wymaga weryfikacji"
    },
    nl: {
      NEGLIGIBLE: "Verwaarloosbaar",
      LOW: "Laag",
      MODERATE: "Matig",
      HIGH: "Hoog",
      MODELLED: "Gemodelleerd",
      VERIFIED: "Geverifieerd",
      REQUIRES_VERIFICATION: "Verificatie vereist"
    },
    fr: {
      NEGLIGIBLE: "N\xE9gligeable",
      LOW: "Faible",
      MODERATE: "Mod\xE9r\xE9",
      HIGH: "\xC9lev\xE9",
      MODELLED: "Mod\xE9lis\xE9",
      VERIFIED: "V\xE9rifi\xE9",
      REQUIRES_VERIFICATION: "V\xE9rification requise"
    },
    es: {
      NEGLIGIBLE: "Despreciable",
      LOW: "Bajo",
      MODERATE: "Moderado",
      HIGH: "Alto",
      MODELLED: "Modelado",
      VERIFIED: "Verificado",
      REQUIRES_VERIFICATION: "Requiere verificaci\xF3n"
    },
    fi: {
      NEGLIGIBLE: "Merkitykset\xF6n",
      LOW: "Matala",
      MODERATE: "Kohtalainen",
      HIGH: "Korkea",
      MODELLED: "Mallinnettu",
      VERIFIED: "Vahvistettu",
      REQUIRES_VERIFICATION: "Vaatii tarkistuksen"
    },
    hr: {
      NEGLIGIBLE: "Zanemariv",
      LOW: "Nizak",
      MODERATE: "Umjeren",
      HIGH: "Visok",
      MODELLED: "Modelirano",
      VERIFIED: "Provjereno",
      REQUIRES_VERIFICATION: "Potrebna provjera"
    },
    pt: {
      NEGLIGIBLE: "Negligenci\xE1vel",
      LOW: "Baixo",
      MODERATE: "Moderado",
      HIGH: "Elevado",
      MODELLED: "Modelado",
      VERIFIED: "Verificado",
      REQUIRES_VERIFICATION: "Requer verifica\xE7\xE3o"
    },
    et: {
      NEGLIGIBLE: "V\xE4ga v\xE4ike",
      LOW: "Madal",
      MODERATE: "M\xF5\xF5dukas",
      HIGH: "K\xF5rge",
      MODELLED: "Modelleeritud",
      VERIFIED: "Kontrollitud",
      REQUIRES_VERIFICATION: "Vajab kontrolli"
    },
    lv: {
      NEGLIGIBLE: "Neb\u016Btisks",
      LOW: "Zems",
      MODERATE: "M\u0113rens",
      HIGH: "Augsts",
      MODELLED: "Model\u0113ts",
      VERIFIED: "P\u0101rbaud\u012Bts",
      REQUIRES_VERIFICATION: "Nepiecie\u0161ama p\u0101rbaude"
    },
    lt: {
      NEGLIGIBLE: "Nereik\u0161minga",
      LOW: "Ma\u017Ea",
      MODERATE: "Vidutin\u0117",
      HIGH: "Didel\u0117",
      MODELLED: "Sumodeliuota",
      VERIFIED: "Patvirtinta",
      REQUIRES_VERIFICATION: "Reikia patikrinti"
    },
    sq: {
      NEGLIGIBLE: "E pap\xEBrfillshme",
      LOW: "E ul\xEBt",
      MODERATE: "E moderuar",
      HIGH: "E lart\xEB",
      MODELLED: "E modeluar",
      VERIFIED: "E verifikuar",
      REQUIRES_VERIFICATION: "K\xEBrkon verifikim"
    },
    ro: {
      NEGLIGIBLE: "Neglijabil",
      LOW: "Sc\u0103zut",
      MODERATE: "Moderat",
      HIGH: "Ridicat",
      MODELLED: "Modelat",
      VERIFIED: "Verificat",
      REQUIRES_VERIFICATION: "Necesit\u0103 verificare"
    },
    is: {
      NEGLIGIBLE: "\xD3verulegt",
      LOW: "L\xE1gt",
      MODERATE: "Mi\xF0lungs",
      HIGH: "H\xE1tt",
      MODELLED: "Hermt",
      VERIFIED: "Sta\xF0fest",
      REQUIRES_VERIFICATION: "\xDEarf sta\xF0festingu"
    },
    ca: {
      NEGLIGIBLE: "Insignificant",
      LOW: "Baix",
      MODERATE: "Moderat",
      HIGH: "Alt",
      MODELLED: "Modelitzat",
      VERIFIED: "Verificat",
      REQUIRES_VERIFICATION: "Cal verificar"
    }
  };
  var fallbackValues = /* @__PURE__ */new Set(["not available", "no data", "unknown", "unavailable", "not assessed", "not measured", "requires verification", "unknown / requires municipal confirmation", "niet beschikbaar", "geen gegevens", "onbekend", "verificatie vereist", "non disponible", "aucune donn\xE9e", "v\xE9rification requise", "no disponible", "sin datos", "requiere verificaci\xF3n", "ei saatavilla", "ei tietoja", "vaatii tarkistuksen", "non disponibile", "da verificare", "nema podataka", "nepoznato", "potrebna provjera", "nuk ka t\xEB dh\xEBna", "nuk disponohet", "k\xEBrkon verifikim"]);
  var presentationLocale = function presentationLocale(language) {
    var code = String(language || "").toLowerCase().split("-")[0];
    return ["en", "de", "pl", "nl", "fr", "es", "fi", "hr", "pt", "et", "lv", "lt", "uk", "sl", "sq", "it", "ro", "is", "ca"].includes(code) ? code : "en";
  };
  function isUnavailablePresentationValue(value) {
    return value === void 0 || value === null || value === "" || typeof value === "number" && !Number.isFinite(value) || fallbackValues.has(String(value).trim().toLowerCase());
  }
  var unavailableLabels = {
    en: "No data",
    de: "Keine Daten",
    pl: "Brak danych",
    nl: "Geen gegevens",
    fr: "Aucune donn\xE9e",
    es: "Sin datos",
    fi: "Ei tietoja",
    hr: "Nema podataka",
    pt: "Sem dados",
    et: "Andmed puuduvad",
    lv: "Nav datu",
    lt: "Duomen\u0173 n\u0117ra",
    uk: "\u041D\u0435\u043C\u0430\u0454 \u0434\u0430\u043D\u0438\u0445",
    sl: "Ni podatkov",
    sq: "Nuk ka t\xEB dh\xEBna",
    it: "Non disponibile",
    ro: "Date indisponibile",
    is: "Engin g\xF6gn",
    ca: "Sense dades"
  };
  function localizeSlovenianReportText(text) {
    var geological = text.match(/^GeoZS’s 1:250,000 geological map maps the selected coordinate as Flysch: alternating marl, claystone and sandstone, with intercalations of limestone breccia; mapped age: Middle Eocene\.$/i);
    if (geological) return "Geolo\u0161ka karta GeoZS v merilu 1 : 250.000 za izbrano koordinato prikazuje fli\u0161: izmenjavanje laporja, glinavca in pe\u0161\u010Denjaka z vlo\u017Eki apnen\u010Deve bre\u010De, datirano v srednji eocen.";
    var aquifer = text.match(/^The official ARSO\/GeoZS regional hydrogeological map places the selected coordinate in LAWA class ([IVX]+) — Fissured aquifers \(Silicate\/Carbonate\)\.$/i);
    if (aquifer) return "Uradna regionalna hidrogeolo\u0161ka karta ARSO/GeoZS za izbrano koordinato prikazuje razred LAWA ".concat(aquifer[1], " \u2014 razpoklinski vodonosnik silikatno-karbonatnega tipa. To ni meritev gladine podzemne vode.");
    if (/^The official DRSV\/GeoZS\/SAZU landslide-prone-area layer maps the selected coordinate as /i.test(text)) return "Uradna karta dovzetnosti za plazenje DRSV/GeoZS/SAZU izbrano koordinato uvr\u0161\u010Da v razred \xBBZelo velika verjetnost pojavljanja plazov\xAB. To ozna\u010Duje kartirano dovzetnost, ne dokaza aktivnega plazu.";
    if (/^The Slovenian Water Directorate publishes official flood-hazard maps for the area of significant flood impact Piran,/i.test(text)) return "Direkcija Republike Slovenije za vode objavlja uradne karte poplavne nevarnosti za \u0161ir\u0161e obmo\u010Dje pomembnega vpliva poplav Piran, vklju\u010Dno s scenariji 10-, 100- in 500-letnih voda. Presek kart s posamezno parcelo \u0161e ni potrjen, zato poplavnega razreda ni mogo\u010De dolo\u010Diti.";
    var gurs = text.match(/^GURS cadastral parcel (.+) was identified at the selected location\.$/i);
    if (gurs) return "Na izbrani lokaciji je bila identificirana katastrska parcela GURS ".concat(gurs[1], ".");
    var partial = text.replace(/Flysch \(GeoZS map unit (\d+)\)/g, "fli\u0161 (kartirana enota GeoZS $1)").replace(/Local municipal planning instrument/g, "veljavni ob\u010Dinski prostorski akt").replace(/Regional fissured aquifer — silicate\/carbonate \(LAWA class ([IVX]+)\)/gi, "regionalni razpoklinski vodonosnik silikatno-karbonatnega tipa (razred LAWA $1)");
    var exact = {
      "Very Steep (>20\xB0)": "Zelo strm teren (>20\xB0)",
      "Steep (10-20\xB0)": "Strm teren (10\u201320\xB0)",
      "Middle Eocene": "srednji eocen",
      "North": "sever",
      "South": "jug",
      "East": "vzhod",
      "West": "zahod",
      "Northeast": "severovzhod",
      "Northwest": "severozahod",
      "Southeast": "jugovzhod",
      "Southwest": "jugozahod",
      "The available mapped geology cannot by itself establish parcel-scale foundation conditions.": "Razpolo\u017Eljiva kartirana geologija sama po sebi ne dolo\u010Da razmer za temeljenje na parceli.",
      "Nearby ground investigations provide useful local context. They do not establish the ground conditions beneath this parcel and should be followed by site-specific investigation where needed.": "Bli\u017Enje raziskave tal ponujajo koristen lokalni kontekst, ne dolo\u010Dajo pa razmer neposredno pod to parcelo. Po potrebi so potrebne raziskave na lokaciji."
    };
    var exactTranslation = exact[partial] || exact[partial.trim()];
    if (exactTranslation) return exactTranslation;
    var direction = partial.match(/^(North|South|East|West|Northeast|Northwest|Southeast|Southwest) \((\d+(?:\.\d+)?)°\)$/i);
    if (direction) return "".concat(exact[direction[1]] || direction[1].toLowerCase(), " (").concat(direction[2], "\xB0)");
    return partial;
  }
  function localizePresentationValue(value, language) {
    var _a, _b, _c;
    var locale = presentationLocale(language);
    if (value && _typeof(value) === "object" && !Array.isArray(value)) {
      var localized2 = (_a = value[locale]) != null ? _a : value.en;
      if (typeof localized2 === "string") return localized2;
    }
    if (isUnavailablePresentationValue(value)) return unavailableLabels[locale];
    var raw = String(value).trim();
    var text = locale === "sl" ? localizeSlovenianReportText(raw) : raw;
    var enumLabel = (_b = enumLabels[locale]) == null ? void 0 : _b[text.toUpperCase()];
    if (enumLabel) return enumLabel;
    var knownPhrases = {
      en: {
        "LOW TO VERY LOW": "Low to very low",
        "ISRIC SOIL TEXTURE NOT AVAILABLE": "SoilGrids texture unavailable",
        "SANDY LOAM": "Sandy loam",
        "LOAM": "Loam",
        "CLAY LOAM": "Clay loam",
        "SILT LOAM": "Silt loam",
        FARMLAND: "Farmland",
        RESIDENTIAL: "Residential",
        FOREST: "Forest",
        MEADOW: "Meadow",
        ORCHARD: "Orchard",
        INDUSTRIAL: "Industrial",
        COMMERCIAL: "Commercial",
        CONSTRUCTION: "Construction site",
        BROWNFIELD: "Brownfield",
        QUARRY: "Quarry / extraction area",
        GRASS: "Grassland",
        RETAIL: "Retail",
        ALLOTMENTS: "Allotments",
        VINEYARD: "Vineyard",
        FARMYARD: "Farmyard",
        RECREATION_GROUND: "Recreation ground",
        MILITARY: "Military area",
        CEMETERY: "Cemetery",
        LANDFILL: "Landfill",
        GREENFIELD: "Greenfield",
        RAILWAY: "Railway land"
      },
      de: {
        "LOW TO VERY LOW": "Gering bis sehr gering",
        "ISRIC SOIL TEXTURE NOT AVAILABLE": "SoilGrids-Textur nicht verf\xFCgbar",
        "SANDY LOAM": "Sandiger Lehm",
        "LOAM": "Lehm",
        "CLAY LOAM": "Toniger Lehm",
        "SILT LOAM": "Schluffiger Lehm",
        "TERRAIN & TOPOGRAPHY": "Gel\xE4nde und Topografie",
        "CROSS-BORDER HYDROLOGY CONTEXT": "Grenz\xFCberschreitender hydrologischer Kontext",
        "GEOLOGY & SOIL MECHANICS": "Geologie und Bodenmechanik",
        "INFRASTRUCTURE & ACCESS": "Infrastruktur und Erschlie\xDFung",
        "ENVIRONMENTAL & CONSERVATION": "Umwelt und Naturschutz",
        "MARKET VALUATION & ECONOMICS": "Markt und Bodenwertermittlung",
        "PEDOLOGICAL SPATIAL CONTEXT": "R\xE4umlicher bodenkundlicher Kontext",
        "MAPPED GEOLOGY": "Kartierte Geologie",
        "HYDROGEOLOGICAL CONTEXT": "Hydrogeologischer Kontext",
        "GROUND HAZARDS": "Geogefahren",
        "CADASTRE & IDENTIFICATION": "Kataster und Identifikation",
        "BELGIAN REGIONAL ROUTING": "Belgischer regionaler Kontext",
        "LAND MARKET VALUATION": "Grundst\xFCcksmarkt und Bodenwert",
        "PLANNING / DEVELOPMENT CONSTRAINTS": "Planungs- und Entwicklungsbeschr\xE4nkungen",
        "GROUNDWATER": "Grundwasser",
        "GROUNDWATER CONTEXT": "Grundwasserkontext",
        "GROUNDWATER OBSERVATIONS": "Grundwasserbeobachtungen",
        "FLOOD RISK": "Hochwasserrisiko",
        "FLOODING": "Hochwasser",
        "FLOOD": "Hochwasser",
        "LANDSLIDE": "Erdrutsch",
        "LANDSLIDES": "Erdrutsche",
        "CONTAMINATION": "Kontamination / Altlasten",
        "SOIL CONTAMINATION": "Bodenverunreinigung",
        "SUBSIDENCE": "Bodensenkung",
        "MINE SUBSIDENCE": "Bergbaubedingte Bodensenkung",
        "SINKHOLE": "Erdfall",
        "SINKHOLES": "Erdf\xE4lle",
        "KARST": "Karst",
        "MINING": "Bergbau",
        "EROSION": "Erosion",
        "SOIL": "Boden",
        "SOIL TEXTURE": "Bodentextur",
        "TERRAIN": "Gel\xE4nde",
        "GROUND CONDITIONS": "Baugrundverh\xE4ltnisse",
        "SEISMICITY": "Seismizit\xE4t",
        "EARTHQUAKE": "Erdbeben",
        "EARTHQUAKES": "Erdbeben",
        "PROTECTED AREAS": "Schutzgebiete",
        "CONSERVATION": "Naturschutz",
        "WATER": "Wasser",
        "ENVIRONMENT": "Umwelt",
        "DRAINAGE": "Entw\xE4sserung",
        "FLOOD / HYDROLOGY": "Hochwasser / Hydrologie",
        "RADON": "Radon",
        FARMLAND: "Acker- und Landwirtschaftsfl\xE4che",
        RESIDENTIAL: "Wohngebiet",
        FOREST: "Wald",
        MEADOW: "Wiese",
        ORCHARD: "Obstanlage",
        INDUSTRIAL: "Industriegebiet",
        COMMERCIAL: "Gewerbegebiet",
        CONSTRUCTION: "Baustelle",
        BROWNFIELD: "Brach-/Konversionsfl\xE4che",
        QUARRY: "Steinbruch / Abbaufl\xE4che",
        GRASS: "Gr\xFCnland",
        RETAIL: "Einzelhandelsgebiet",
        ALLOTMENTS: "Kleing\xE4rten",
        VINEYARD: "Weinberg",
        FARMYARD: "Hof-/Betriebsfl\xE4che",
        RECREATION_GROUND: "Freizeitfl\xE4che",
        MILITARY: "Milit\xE4rgel\xE4nde",
        CEMETERY: "Friedhof",
        LANDFILL: "Deponie",
        GREENFIELD: "Unbebaute Entwicklungsfl\xE4che",
        RAILWAY: "Bahnfl\xE4che"
      },
      pl: {
        "LOW TO VERY LOW": "Niskie do bardzo niskiego",
        "ISRIC SOIL TEXTURE NOT AVAILABLE": "Tekstura SoilGrids jest niedost\u0119pna",
        "SANDY LOAM": "glina piaszczysta",
        "LOAM": "glina",
        "CLAY LOAM": "glina ilasta",
        "SILT LOAM": "glina pylasta",
        "TERRAIN & TOPOGRAPHY": "Teren i topografia",
        "CROSS-BORDER HYDROLOGY CONTEXT": "Regionalny kontekst hydrologiczny",
        "GEOLOGY & SOIL MECHANICS": "Geologia i mechanika grunt\xF3w",
        "INFRASTRUCTURE & ACCESS": "Infrastruktura i dost\u0119p",
        "ENVIRONMENTAL & CONSERVATION": "\u015Arodowisko i ochrona przyrody",
        "MARKET VALUATION & ECONOMICS": "Rynek i wycena gruntu",
        "PEDOLOGICAL SPATIAL CONTEXT": "Przestrzenny kontekst glebowy",
        "MAPPED GEOLOGY": "Geologia kartowana",
        "HYDROGEOLOGICAL CONTEXT": "Kontekst hydrogeologiczny",
        "GROUND HAZARDS": "Zagro\u017Cenia geologiczne",
        "CADASTRE & IDENTIFICATION": "Kataster i identyfikacja",
        "BELGIAN REGIONAL ROUTING": "Belgijski kontekst regionalny",
        "LAND MARKET VALUATION": "Rynek i warto\u015B\u0107 gruntu",
        FARMLAND: "grunty rolne",
        RESIDENTIAL: "zabudowa mieszkaniowa",
        FOREST: "las",
        MEADOW: "\u0142\u0105ka",
        ORCHARD: "sad",
        INDUSTRIAL: "teren przemys\u0142owy",
        COMMERCIAL: "teren us\u0142ugowo-handlowy",
        CONSTRUCTION: "teren budowy",
        BROWNFIELD: "teren poprzemys\u0142owy / zdegradowany",
        QUARRY: "kamienio\u0142om / obszar wydobywczy",
        GRASS: "teren trawiasty",
        RETAIL: "teren handlowy",
        ALLOTMENTS: "ogr\xF3dki dzia\u0142kowe",
        VINEYARD: "winnica",
        FARMYARD: "teren gospodarstwa",
        RECREATION_GROUND: "teren rekreacyjny",
        MILITARY: "teren wojskowy",
        CEMETERY: "cmentarz",
        LANDFILL: "sk\u0142adowisko odpad\xF3w",
        GREENFIELD: "niezabudowany teren rozwojowy",
        RAILWAY: "teren kolejowy"
      },
      nl: {
        "LOW TO VERY LOW": "Laag tot zeer laag",
        "ISRIC SOIL TEXTURE NOT AVAILABLE": "SoilGrids-textuur niet beschikbaar",
        "SANDY LOAM": "Zandige leem",
        "LOAM": "Leem",
        "CLAY LOAM": "Kleiige leem",
        "SILT LOAM": "Siltige leem",
        FARMLAND: "Landbouwgrond",
        RESIDENTIAL: "Woongebied",
        FOREST: "Bos",
        MEADOW: "Weide",
        ORCHARD: "Boomgaard",
        INDUSTRIAL: "Industriegebied",
        COMMERCIAL: "Bedrijfs-/commercieel gebied",
        CONSTRUCTION: "Bouwterrein",
        BROWNFIELD: "Braakliggend / herontwikkelingsgebied",
        QUARRY: "Groeve / winningsgebied",
        GRASS: "Grasland",
        RETAIL: "Winkelgebied",
        ALLOTMENTS: "Volkstuinen",
        VINEYARD: "Wijngaard",
        FARMYARD: "Agrarisch erf",
        RECREATION_GROUND: "Recreatieterrein",
        MILITARY: "Militair terrein",
        CEMETERY: "Begraafplaats",
        LANDFILL: "Stortplaats",
        GREENFIELD: "Onbebouwd ontwikkelingsgebied",
        RAILWAY: "Spoorwegterrein"
      },
      fr: {
        "LOW TO VERY LOW": "Faible \xE0 tr\xE8s faible",
        "ISRIC SOIL TEXTURE NOT AVAILABLE": "Texture SoilGrids indisponible",
        "SANDY LOAM": "Loam sableux",
        "LOAM": "Loam",
        "CLAY LOAM": "Loam argileux",
        "SILT LOAM": "Loam limoneux",
        FARMLAND: "Terres agricoles",
        RESIDENTIAL: "Zone r\xE9sidentielle",
        FOREST: "For\xEAt",
        MEADOW: "Prairie",
        ORCHARD: "Verger",
        INDUSTRIAL: "Zone industrielle",
        COMMERCIAL: "Zone commerciale",
        CONSTRUCTION: "Chantier",
        BROWNFIELD: "Friche",
        QUARRY: "Carri\xE8re / zone d\u2019extraction",
        GRASS: "Prairie herbac\xE9e",
        RETAIL: "Commerce de d\xE9tail",
        ALLOTMENTS: "Jardins familiaux",
        VINEYARD: "Vignoble",
        FARMYARD: "Cour agricole",
        RECREATION_GROUND: "Zone de loisirs",
        MILITARY: "Zone militaire",
        CEMETERY: "Cimeti\xE8re",
        LANDFILL: "D\xE9charge",
        GREENFIELD: "Terrain non b\xE2ti",
        RAILWAY: "Emprise ferroviaire"
      },
      es: {
        "LOW TO VERY LOW": "Bajo a muy bajo",
        "ISRIC SOIL TEXTURE NOT AVAILABLE": "Textura SoilGrids no disponible",
        "SANDY LOAM": "franco arenoso",
        "LOAM": "franco",
        "CLAY LOAM": "franco arcilloso",
        "SILT LOAM": "franco limoso",
        "TERRAIN & TOPOGRAPHY": "Terreno y topograf\xEDa",
        "CROSS-BORDER HYDROLOGY CONTEXT": "Contexto hidrol\xF3gico regional",
        "GEOLOGY & SOIL MECHANICS": "Geolog\xEDa y mec\xE1nica del suelo",
        "INFRASTRUCTURE & ACCESS": "Infraestructura y acceso",
        "ENVIRONMENTAL & CONSERVATION": "Medio ambiente y conservaci\xF3n",
        "MARKET VALUATION & ECONOMICS": "Mercado y valoraci\xF3n del suelo",
        "PEDOLOGICAL SPATIAL CONTEXT": "Contexto edafol\xF3gico espacial",
        "MAPPED GEOLOGY": "Geolog\xEDa cartografiada",
        "HYDROGEOLOGICAL CONTEXT": "Contexto hidrogeol\xF3gico",
        "GROUND HAZARDS": "Riesgos geol\xF3gicos",
        "CADASTRE & IDENTIFICATION": "Catastro e identificaci\xF3n",
        "BELGIAN REGIONAL ROUTING": "Contexto regional belga",
        "LAND MARKET VALUATION": "Mercado y valor del suelo",
        FARMLAND: "Suelo agr\xEDcola",
        RESIDENTIAL: "Zona residencial",
        FOREST: "Bosque",
        MEADOW: "Pradera",
        ORCHARD: "Huerto",
        INDUSTRIAL: "Zona industrial",
        COMMERCIAL: "Zona comercial",
        CONSTRUCTION: "Obra",
        BROWNFIELD: "Suelo previamente desarrollado",
        QUARRY: "Cantera / zona de extracci\xF3n",
        GRASS: "Pastizal",
        RETAIL: "Comercio",
        ALLOTMENTS: "Huertos urbanos",
        VINEYARD: "Vi\xF1edo",
        FARMYARD: "Explotaci\xF3n agr\xEDcola",
        RECREATION_GROUND: "Zona recreativa",
        MILITARY: "Zona militar",
        CEMETERY: "Cementerio",
        LANDFILL: "Vertedero",
        GREENFIELD: "Suelo no desarrollado",
        RAILWAY: "Suelo ferroviario"
      },
      fi: {
        "LOW TO VERY LOW": "Matala tai eritt\xE4in matala",
        "ISRIC SOIL TEXTURE NOT AVAILABLE": "SoilGrids-tekstuuria ei saatavilla",
        "SANDY LOAM": "Hietainen hiesu",
        "LOAM": "Hiesu",
        "CLAY LOAM": "Savisekainen hiesu",
        "SILT LOAM": "Hienohiesu",
        FARMLAND: "Maatalousmaa",
        RESIDENTIAL: "Asuinalue",
        FOREST: "Mets\xE4",
        MEADOW: "Niitty",
        ORCHARD: "Hedelm\xE4viljelm\xE4",
        INDUSTRIAL: "Teollisuusalue",
        COMMERCIAL: "Liikealue",
        CONSTRUCTION: "Rakennusty\xF6maa",
        BROWNFIELD: "Aiemmin rakennettu / uudistettava alue",
        QUARRY: "Louhos / ottoalue",
        GRASS: "Nurmialue",
        RETAIL: "V\xE4hitt\xE4iskaupan alue",
        ALLOTMENTS: "Siirtolapuutarha",
        VINEYARD: "Viinitarha",
        FARMYARD: "Maatilan piha",
        RECREATION_GROUND: "Virkistysalue",
        MILITARY: "Sotilasalue",
        CEMETERY: "Hautausmaa",
        LANDFILL: "Kaatopaikka",
        GREENFIELD: "Rakentamaton kehitysalue",
        RAILWAY: "Rautatiealue"
      },
      hr: {
        "LOW TO VERY LOW": "Nizak do vrlo nizak",
        "ISRIC SOIL TEXTURE NOT AVAILABLE": "Tekstura SoilGridsa nije dostupna",
        "HOLOCENE MAPPED": "Kartirano podru\u010Dje holocenske starosti",
        "EXACT POINT": "To\u010Dno na odabranoj to\u010Dki",
        "SCREENED": "Preliminarno provjereno",
        "HOLOCENE \u2014 SEDIMENTARY MATERIAL": "Holocen \u2014 sedimentni materijal",
        "SANDY LOAM": "Pjeskovita ilova\u010Da",
        "LOAM": "Ilova\u010Da",
        "CLAY LOAM": "Glinasta ilova\u010Da",
        "SILT LOAM": "Pra\u0161kasta ilova\u010Da",
        "TERRAIN & TOPOGRAPHY": "Teren i topografija",
        "CROSS-BORDER HYDROLOGY CONTEXT": "Regionalni hidrolo\u0161ki kontekst",
        "GEOLOGY & SOIL MECHANICS": "Geologija i mehanika tla",
        "INFRASTRUCTURE & ACCESS": "Infrastruktura i pristup",
        "ENVIRONMENTAL & CONSERVATION": "Okoli\u0161 i za\u0161tita prirode",
        "MARKET VALUATION & ECONOMICS": "Tr\u017Ei\u0161te i vrijednost zemlji\u0161ta",
        "PEDOLOGICAL SPATIAL CONTEXT": "Prostorni pedolo\u0161ki kontekst",
        "MAPPED GEOLOGY": "Kartirana geologija",
        "HYDROGEOLOGICAL CONTEXT": "Hidrogeolo\u0161ki kontekst",
        "GROUND HAZARDS": "Opasnosti vezane uz tlo",
        "CADASTRE & IDENTIFICATION": "Katastar i identifikacija",
        "LAND MARKET VALUATION": "Tr\u017Ei\u0161te i vrijednost zemlji\u0161ta",
        FARMLAND: "Poljoprivredno zemlji\u0161te",
        RESIDENTIAL: "Stambeno podru\u010Dje",
        FOREST: "\u0160uma",
        MEADOW: "Livada",
        ORCHARD: "Vo\u0107njak",
        INDUSTRIAL: "Industrijsko podru\u010Dje",
        COMMERCIAL: "Poslovno podru\u010Dje",
        CONSTRUCTION: "Gradili\u0161te",
        BROWNFIELD: "Brownfield / ranije kori\u0161teno zemlji\u0161te",
        QUARRY: "Kamenolom / podru\u010Dje iskopa",
        GRASS: "Travnjaci",
        RETAIL: "Maloprodajno podru\u010Dje",
        ALLOTMENTS: "Vrtne parcele",
        VINEYARD: "Vinograd",
        FARMYARD: "Poljoprivredno gospodarstvo",
        RECREATION_GROUND: "Rekreacijsko podru\u010Dje",
        MILITARY: "Vojno podru\u010Dje",
        CEMETERY: "Groblje",
        LANDFILL: "Odlagali\u0161te otpada",
        GREENFIELD: "Neizgra\u0111eno razvojno podru\u010Dje",
        RAILWAY: "\u017Deljezni\u010Dko zemlji\u0161te"
      },
      sl: {
        "LOW TO VERY LOW": "Nizko do zelo nizko",
        "SANDY LOAM": "pe\u0161\u010Dena ilovica",
        "LOAM": "ilovica",
        "CLAY LOAM": "glinasta ilovica",
        "SILT LOAM": "meljasta ilovica",
        "TERRAIN & TOPOGRAPHY": "Teren in topografija",
        "CROSS-BORDER HYDROLOGY CONTEXT": "Regionalni hidrolo\u0161ki podatki",
        "GEOLOGY & SOIL MECHANICS": "Geologija in lastnosti tal",
        "INFRASTRUCTURE & ACCESS": "Infrastruktura in dostop",
        "ENVIRONMENTAL & CONSERVATION": "Okolje in varstvo narave",
        "MARKET VALUATION & ECONOMICS": "Tr\u017Ena vrednost zemlji\u0161\u010Da",
        "PEDOLOGICAL SPATIAL CONTEXT": "Prostorski podatki o tleh",
        "MAPPED GEOLOGY": "Kartirana geologija",
        "HYDROGEOLOGICAL CONTEXT": "Hidrogeolo\u0161ki podatki",
        "GROUND HAZARDS": "Geolo\u0161ke nevarnosti",
        "CADASTRE & IDENTIFICATION": "Kataster in identifikacija",
        "LAND MARKET VALUATION": "Trg in vrednost zemlji\u0161\u010Da",
        "GROUNDWATER": "Podzemna voda",
        "GROUNDWATER CONTEXT": "Podatki o podzemni vodi",
        "FLOOD RISK": "Poplavna nevarnost",
        "FLOODING": "Poplave",
        "LANDSLIDES": "Plazovi",
        "LANDSLIDE": "Zemeljski plaz",
        "SOIL": "Tla",
        "SOIL TEXTURE": "Tekstura tal",
        "TERRAIN": "Teren",
        "GROUND CONDITIONS": "Razmere v tleh",
        "DRAINAGE": "Odvodnjavanje",
        "PLANNING / DEVELOPMENT CONSTRAINTS": "Omejitve prostorskega na\u010Drtovanja in razvoja",
        "FARMLAND": "kmetijsko zemlji\u0161\u010De",
        "RESIDENTIAL": "stanovanjsko obmo\u010Dje",
        "FOREST": "gozd",
        "MEADOW": "travnik",
        "ORCHARD": "sadovnjak",
        "INDUSTRIAL": "industrijsko obmo\u010Dje",
        "COMMERCIAL": "poslovno obmo\u010Dje",
        "CONSTRUCTION": "gradbi\u0161\u010De",
        "QUARRY": "kamnolom",
        "GRASS": "travnata povr\u0161ina",
        "VINEYARD": "vinograd",
        "RETAIL": "trgovsko obmo\u010Dje",
        "LANDFILL": "odlagali\u0161\u010De",
        "RAILWAY": "\u017Eelezni\u0161ko zemlji\u0161\u010De"
      },
      sq: {
        "LOW TO VERY LOW": "E ul\xEBt deri shum\xEB e ul\xEBt",
        "ISRIC SOIL TEXTURE NOT AVAILABLE": "Tekstura SoilGrids nuk disponohet",
        "SANDY LOAM": "Tok\xEB ranore",
        "LOAM": "Tok\xEB e p\xEBrzier",
        "CLAY LOAM": "Tok\xEB argjilo-llumore",
        "SILT LOAM": "Tok\xEB lymore",
        FARMLAND: "Tok\xEB bujq\xEBsore",
        RESIDENTIAL: "Zon\xEB banimi",
        FOREST: "Pyje",
        MEADOW: "Livadhe",
        ORCHARD: "Pemishte",
        INDUSTRIAL: "Zon\xEB industriale",
        COMMERCIAL: "Zon\xEB tregtare",
        CONSTRUCTION: "Kantier nd\xEBrtimi",
        BROWNFIELD: "Zon\xEB e braktisur / p\xEBr rizhvillim",
        QUARRY: "Gurore / zon\xEB nxjerrjeje",
        GRASS: "Kullot\xEB / barishte",
        RETAIL: "Zon\xEB tregtare",
        CEMETERY: "Varrez\xEB",
        LANDFILL: "Vendgrumbullim mbetjesh",
        GREENFIELD: "Tok\xEB e pand\xEBrtuar p\xEBr zhvillim",
        "CADASTRE & IDENTIFICATION": "Kadast\xEBr dhe identifikim",
        "CROSS-BORDER HYDROLOGY CONTEXT": "Kontekst hidrologjik nd\xEBrkufitar",
        "MAPPED GEOLOGY": "Gjeologji e hart\xEBzuar",
        "HYDROGEOLOGICAL CONTEXT": "Kontekst hidrogeologjik",
        "GROUND HAZARDS": "Rreziqe gjeologjike",
        "INFRASTRUCTURE & ACCESS": "Infrastruktur\xEB dhe akses"
      }
    };
    var known = (_c = knownPhrases[locale]) == null ? void 0 : _c[text.toUpperCase()];
    if (known) return known;
    var meanElevation = text.match(/^Mean elevation ([\d.,-]+) m a\.s\.l\. with slope gradient of ([\d.,-]+)° \((.+)\)$/i);
    if (meanElevation && locale === "pl") return "\u015Arednia wysoko\u015B\u0107 ".concat(meanElevation[1], " m n.p.m. przy nachyleniu ").concat(meanElevation[2], "\xB0 (").concat(meanElevation[3].replace(/^Flat/i, "P\u0142aski").replace(/^Gentle/i, "\u0141agodny").replace(/^Moderate/i, "Umiarkowany").replace(/^Steep/i, "Stromy").replace(/^Very steep/i, "Bardzo stromy"), ")");
    if (meanElevation && locale === "es") return "Altitud media ".concat(meanElevation[1], " m s. n. m. con una pendiente de ").concat(meanElevation[2], "\xB0 (").concat(meanElevation[3].replace(/^Flat/i, "Plano").replace(/^Gentle/i, "Suave").replace(/^Moderate/i, "Moderada").replace(/^Steep/i, "Pronunciada").replace(/^Very steep/i, "Muy pronunciada"), ")");
    var soilClaim = text.match(/^Soil Texture: (.+?) \(Sand ([\d.,]+)%, Silt ([\d.,]+)%, Clay ([\d.,]+)%, Mean Density ([\d.,]+) g\/cm³, pH ([\d.,]+)\) \[MODELLED\]$/i);
    if (soilClaim && locale === "pl") return "Tekstura gleby: ".concat(localizePresentationValue(soilClaim[1], "pl"), " (piasek ").concat(soilClaim[2], "%, py\u0142 ").concat(soilClaim[3], "%, i\u0142 ").concat(soilClaim[4], "%, \u015Brednia g\u0119sto\u015B\u0107 ").concat(soilClaim[5], " g/cm\xB3, pH ").concat(soilClaim[6], ") [MODELOWANE]");
    if (soilClaim && locale === "es") return "Textura del suelo: ".concat(localizePresentationValue(soilClaim[1], "es"), " (arena ").concat(soilClaim[2], "%, limo ").concat(soilClaim[3], "%, arcilla ").concat(soilClaim[4], "%, densidad media ").concat(soilClaim[5], " g/cm\xB3, pH ").concat(soilClaim[6], ") [MODELADO]");
    if (/^Hydrology proximity data is not available because the spatial query did not complete/i.test(text)) {
      if (locale === "de") return "Daten zur N\xE4he hydrologischer Elemente sind nicht verf\xFCgbar, weil die r\xE4umliche Abfrage nicht abgeschlossen wurde. Es wurde keine Hochwasserrisikoklassifizierung abgeleitet.";
      if (locale === "pl") return "Dane o blisko\u015Bci element\xF3w hydrologicznych s\u0105 niedost\u0119pne, poniewa\u017C zapytanie przestrzenne nie zosta\u0142o uko\u0144czone. Nie wyprowadzono klasy ryzyka powodziowego.";
      if (locale === "es") return "Los datos de proximidad hidrol\xF3gica no est\xE1n disponibles porque la consulta espacial no se complet\xF3. No se dedujo ninguna clasificaci\xF3n de riesgo de inundaci\xF3n.";
    }
    var mvBoreholes = text.match(/^The official Mecklenburg-Vorpommern Landesbohrdatenspeicher contains (\d+) borehole records? within 1\.5 km of the selected coordinate; the nearest records include (.+)\.$/i);
    if (mvBoreholes && locale === "de") {
      return "Der offizielle Landesbohrdatenspeicher Mecklenburg-Vorpommerns enth\xE4lt ".concat(mvBoreholes[1], " Bohrungsnachweise innerhalb von 1,5 km um die ausgew\xE4hlte Koordinate; die n\xE4chstgelegenen Nachweise umfassen ").concat(mvBoreholes[2], ".");
    }
    var mvGroundwaterDepth = text.match(/^The official Mecklenburg-Vorpommern hydrogeological map places the selected coordinate in a mapped groundwater-depth class of (.+)\.$/i);
    if (mvGroundwaterDepth && locale === "de") {
      return "Die amtliche hydrogeologische Karte Mecklenburg-Vorpommerns ordnet die ausgew\xE4hlte Koordinate einer kartierten Grundwasserflurabstandsklasse von ".concat(mvGroundwaterDepth[1], " zu.");
    }
    var mvHuk250 = text.match(/^The nationwide HÜK250 places the site in a relatively permeable hydrogeological setting \((.+?)\)\. If groundwater is present within the excavation depth, the formation can allow water to enter or move through an excavation comparatively readily\. The map does not establish groundwater depth at the property\.$/i);
    if (mvHuk250 && locale === "de") {
      return "Die bundesweite H\xDCK250 weist f\xFCr den Standort ein vergleichsweise durchl\xE4ssiges hydrogeologisches Umfeld aus (".concat(mvHuk250[1], "). Wenn Grundwasser innerhalb der Aushubtiefe vorhanden ist, k\xF6nnen solche Schichten den Wasserzutritt und die Wasserbewegung in einer Baugrube vergleichsweise beg\xFCnstigen. Die Karte legt jedoch keine konkrete Grundwassertiefe am Grundst\xFCck fest.");
    }
    var mvGroundwaterDynamics = text.match(/^LUNG M-V groundwater-elevation contours for the uppermost aquifer indicate an interpolated groundwater elevation of approximately ([\d.,-]+) m NHN at the selected site, between the ([\d.,-]+) m and ([\d.,-]+) m NHN contours \(([\d.,-]+) m and ([\d.,-]+) m from the site\)\. Compared with the modelled site elevation of ([\d.,-]+) m NHN, (.+); this is a (high|moderate|lower)-priority model-based groundwater-depth screening indicator, not a groundwater observation or confirmation that water will enter excavations\. The regional groundwater-surface model and the mapped Grundwasserflurabstand class may refer to different hydrogeological horizons and must not be treated as interchangeable\.$/i);
    if (mvGroundwaterDynamics && locale === "de") {
      var priority = mvGroundwaterDynamics[8].toLowerCase() === "high" ? "hoch" : mvGroundwaterDynamics[8].toLowerCase() === "moderate" ? "mittel" : "gering";
      var relation = mvGroundwaterDynamics[7].replace(/the interpolated groundwater elevation is approximately ([\d.,-]+) m above the modelled site surface/i, "liegt die interpolierte Grundwasserh\xF6he etwa $1 m \xFCber der modellierten Gel\xE4ndeh\xF6he").replace(/the interpolated groundwater elevation is approximately ([\d.,-]+) m below the modelled site surface/i, "liegt die interpolierte Grundwasserh\xF6he etwa $1 m unter der modellierten Gel\xE4ndeh\xF6he");
      return "Die Grundwasserh\xF6hengleichen des obersten Grundwasserleiters in Mecklenburg-Vorpommern ergeben f\xFCr den Standort eine interpolierte Grundwasserh\xF6he von etwa ".concat(mvGroundwaterDynamics[1], " m NHN, zwischen den H\xF6henlinien von ").concat(mvGroundwaterDynamics[2], " m und ").concat(mvGroundwaterDynamics[3], " m NHN (").concat(mvGroundwaterDynamics[4], " m bzw. ").concat(mvGroundwaterDynamics[5], " m vom Standort entfernt). Im Vergleich zur modellierten Gel\xE4ndeh\xF6he von ").concat(mvGroundwaterDynamics[6], " m NHN ").concat(relation, ". Diese regionale Modellabsch\xE4tzung wird in der internen Vorsorgekategorie \xBB").concat(priority, "\xAB gef\xFChrt; sie ist weder eine \xF6rtliche Grundwasserstandsmessung noch der Nachweis eines Wasserzutritts in Baugruben. Die regionalen Modellfl\xE4chen und die kartierte Grundwasserflurabstandsklasse k\xF6nnen verschiedene Grundwasserstockwerke oder Bezugshorizonte abbilden.");
    }
    var mvGroundwaterSpatial = text.match(/^Nearest adjacent groundwater-elevation contours: ([\d.,-]+) m and ([\d.,-]+) m NHN; site elevation ([\d.,-]+) m NHN$/i);
    if (mvGroundwaterSpatial && locale === "de") {
      return "N\xE4chstgelegene benachbarte Grundwasserh\xF6hengleichen: ".concat(mvGroundwaterSpatial[1], " m und ").concat(mvGroundwaterSpatial[2], " m NHN; Gel\xE4ndeh\xF6he am Standort ").concat(mvGroundwaterSpatial[3], " m NHN");
    }
    var mvGroundwaterDepthSpatial = text.match(/^Selected coordinate queried against the LUNG M-V t7_flurabstand layer$/i);
    if (mvGroundwaterDepthSpatial && locale === "de") return "Ausgew\xE4hlte Koordinate gegen die LUNG-M-V-Ebene t7_flurabstand abgefragt.";
    var mvBoreholeSpatial = text.match(/^(\d+) registered borehole observations within 1\.5 km; nearest ([\d.,-]+) m$/i);
    if (mvBoreholeSpatial && locale === "de") return "".concat(mvBoreholeSpatial[1], " registrierte Bohrungsnachweise innerhalb von 1,5 km; n\xE4chster Nachweis ").concat(mvBoreholeSpatial[2], " m entfernt");
    if (/^LUNG M-V WFS 1\.1\.0 bohrdaten query in EPSG:5650; straight-line distance from the selected coordinate; nearest records retained as contextual evidence$/i.test(text) && locale === "de") {
      return "LUNG-M-V-WFS-Abfrage (1.1.0) des Datensatzes bohrdaten in EPSG:5650; Luftliniendistanz von der ausgew\xE4hlten Koordinate; die n\xE4chstgelegenen Nachweise werden als Kontextdaten beibehalten.";
    }
    if (/^Nearby boreholes are contextual observations, not parcel-specific ground truth\./i.test(text) && locale === "de") {
      return "Nahe Bohrungen sind kontextbezogene Beobachtungen und kein standortbezogener Nachweis f\xFCr das Flurst\xFCck. Bohrtiefe, Profile und Stratigrafie unterscheiden sich je Bohrung; das Fehlen eines nahegelegenen Nachweises belegt nicht das Fehlen von Untergrundbedingungen. Ingenieurtechnische Kennwerte m\xFCssen durch eine standortbezogene Untersuchung bestimmt werden.";
    }
    var mvGroundwaterDepthMethod = text.match(/^WMS 1\.3\.0 GetFeatureInfo point query in EPSG:4326; returned groundwater-depth class parsed from the official layer$/i);
    if (mvGroundwaterDepthMethod && locale === "de") return "WMS-1.3.0-GetFeatureInfo-Punktabfrage in EPSG:4326; die Grundwasserflurabstandsklasse wurde aus der amtlichen Ebene ausgelesen.";
    if (/^Grundwasserflurabstand is a regional hydrogeological screening layer\./i.test(text) && locale === "de") {
      return "Grundwasserflurabstand ist eine regionale hydrogeologische Screeningebene. LUNG definiert ihn bei unbedeckten Aquiferen als Abstand von der Grundwasseroberfl\xE4che zur Gel\xE4ndeoberfl\xE4che; bei bedeckten Aquiferen entspricht er dem Abstand von der Gel\xE4ndeoberfl\xE4che zur Untergrenze der \xFCberlagernden Deckschicht. Er ist keine Standortmessung und legt nicht den saisonal h\xF6chsten Grundwasserstand f\xFCr die endg\xFCltige Gr\xFCndungs- oder Abdichtungsplanung fest.";
    }
    if (/^450 m spatial query buffer around parcel$/i.test(text) && locale === "de") return "450 m r\xE4umlicher Abfragepuffer um das Flurst\xFCck";
    var hydroProximity = text.match(/^Proximity vector to nearest mapped open watercourse: ([\d.,-]+) m$/i);
    if (hydroProximity && locale === "de") return "Entfernung zum n\xE4chsten kartierten offenen Gew\xE4sser: ".concat(hydroProximity[1], " m");
    if (/^Spatial distance transform to nearest mapped hydrology vectors$/i.test(text) && locale === "de") return "R\xE4umliche Distanzberechnung zum n\xE4chsten kartierten Gew\xE4sserverlauf.";
    if (/^Nearest public road corridor unconfirmed in open dataset$/i.test(text)) {
      if (locale === "pl") return "Najbli\u017Cszy korytarz drogi publicznej nie zosta\u0142 potwierdzony w otwartym zbiorze danych.";
      if (locale === "es") return "No se confirm\xF3 el corredor viario p\xFAblico m\xE1s cercano en el conjunto de datos abierto.";
    }
    if (/^Environmental spatial query unavailable; no protected-area overlap or distance conclusion was inferred\.?$/i.test(text)) {
      if (locale === "pl") return "Zapytanie przestrzenne dotycz\u0105ce \u015Brodowiska by\u0142o niedost\u0119pne; nie wyprowadzono wniosku o przeci\u0119ciu z obszarem chronionym ani o odleg\u0142o\u015Bci.";
      if (locale === "es") return "La consulta espacial ambiental no estuvo disponible; no se dedujo ninguna conclusi\xF3n sobre solapamiento o distancia respecto de \xE1reas protegidas.";
    }
    var soilSamples = text.match(/^SoilGrids returned (\d+) usable model samples across the selected geometry and vicinity\.?$/i);
    if (soilSamples) {
      if (locale === "pl") return "SoilGrids zwr\xF3ci\u0142 ".concat(soilSamples[1], " u\u017Cytecznych pr\xF3bek modelowych dla wybranej geometrii i jej otoczenia.");
      if (locale === "es") return "SoilGrids devolvi\xF3 ".concat(soilSamples[1], " muestras de modelo utilizables para la geometr\xEDa seleccionada y su entorno.");
    }
    var pedologicalTexture = text.match(/^Pedological texture only: (.+?) \(not a geological lithology classification\)$/i);
    if (pedologicalTexture && locale === "pl") return "Wy\u0142\u0105cznie tekstura gleby: ".concat(localizePresentationValue(pedologicalTexture[1], "pl"), " (nie jest to klasyfikacja litologii geologicznej)");
    if (pedologicalTexture && locale === "es") return "Solo textura edafol\xF3gica: ".concat(localizePresentationValue(pedologicalTexture[1], "es"), " (no es una clasificaci\xF3n litol\xF3gica geol\xF3gica)");
    var belgianCadastre = text.match(/^Belgian federal cadastral mapping identifies parcel (.+?)(?: with registered area approximately (.+?) m²)?\.$/i);
    if (belgianCadastre && locale === "pl") return belgianCadastre[2] ? "Belgijska federalna mapa katastralna wskazuje dzia\u0142k\u0119 ".concat(belgianCadastre[1], " o zarejestrowanej powierzchni oko\u0142o ").concat(belgianCadastre[2], " m\xB2.") : "Belgijska federalna mapa katastralna wskazuje dzia\u0142k\u0119 ".concat(belgianCadastre[1], ".");
    if (belgianCadastre && locale === "es") return belgianCadastre[2] ? "La cartograf\xEDa catastral federal belga identifica la parcela ".concat(belgianCadastre[1], " con una superficie registrada aproximada de ").concat(belgianCadastre[2], " m\xB2.") : "La cartograf\xEDa catastral federal belga identifica la parcela ".concat(belgianCadastre[1], ".");
    if (/^Walloon geological mapping could not be queried\.?$/i.test(text)) {
      if (locale === "pl") return "Nie uda\u0142o si\u0119 pobra\u0107 danych z walo\u0144skiej mapy geologicznej.";
      if (locale === "es") return "No se pudo consultar la cartograf\xEDa geol\xF3gica de Valonia.";
    }
    if (/^The selected coordinate was routed to Walloon official geodata services\.?$/i.test(text)) {
      if (locale === "pl") return "Wybran\u0105 lokalizacj\u0119 przypisano do oficjalnych walo\u0144skich serwis\xF3w geodanych.";
      if (locale === "es") return "La ubicaci\xF3n seleccionada se asign\xF3 a los servicios oficiales de geodatos de Valonia.";
    }
    if (/^The selected coordinate was routed to Flemish official geodata services\.?$/i.test(text)) {
      if (locale === "pl") return "Wybran\u0105 lokalizacj\u0119 przypisano do oficjalnych flamandzkich serwis\xF3w geodanych.";
      if (locale === "es") return "La ubicaci\xF3n seleccionada se asign\xF3 a los servicios oficiales de geodatos de Flandes.";
    }
    var marketContext = text.match(/^Market\s+context only: (.+?)\. The selected area \((.+?) m²\) exceeds GroundSurf's ([\d,]+) m² total-value calibration guard, so the benchmark is not extrapolated to a whole-site total\.$/i);
    if (marketContext && locale === "pl") return "Wy\u0142\u0105cznie kontekst rynkowy: ".concat(marketContext[1], ". Wybrana powierzchnia (").concat(marketContext[2], " m\xB2) przekracza limit kalibracji GroundSurf wynosz\u0105cy ").concat(marketContext[3].replace(",", " "), " m\xB2, dlatego wska\u017Anik nie jest ekstrapolowany do \u0142\u0105cznej warto\u015Bci ca\u0142ego terenu.");
    if (marketContext && locale === "es") return "Solo contexto de mercado: ".concat(marketContext[1], ". El \xE1rea seleccionada (").concat(marketContext[2], " m\xB2) supera el l\xEDmite de calibraci\xF3n de GroundSurf de ").concat(marketContext[3].replace(",", "."), " m\xB2, por lo que la referencia no se extrapola al valor total del terreno.");
    if (text === "Regional and municipal spatial planning / zoning instrument") {
      if (locale === "pl") return "Regionalny i gminny instrument planowania przestrzennego";
      if (locale === "es") return "Instrumento regional y municipal de planeamiento y zonificaci\xF3n";
    }
    if (text === "No generic land-price fallback \u2014 calibrated country-specific land evidence required") {
      if (locale === "pl") return "Brak og\xF3lnego zast\u0119pczego modelu cen gruntu \u2014 wymagane s\u0105 skalibrowane dane w\u0142a\u015Bciwe dla danego kraju";
      if (locale === "es") return "Sin modelo gen\xE9rico sustitutivo de precios del suelo \u2014 se requieren datos calibrados espec\xEDficos del pa\xEDs";
    }
    if (/^Indicative Valuation Benchmark:/i.test(text)) {
      if (locale === "pl") return text.replace(/^Indicative Valuation Benchmark:/i, "Orientacyjny benchmark warto\u015Bci:").replace(/\[0 Direct Comparable Deeds Verified\]/gi, "[0 zweryfikowanych bezpo\u015Brednich transakcji por\xF3wnawczych]").replace(/voivodeship transaction benchmark with parcel-size, road-access and terrain adjustments; no generic municipality uplift/gi, "benchmark transakcyjny wojew\xF3dztwa z korektami powierzchni dzia\u0142ki, dost\u0119pu drogowego i terenu; bez og\xF3lnej korekty gminnej").replace(/Automated statistical estimate without direct deed verification\./gi, "Automatyczna estymacja statystyczna bez bezpo\u015Bredniej weryfikacji akt\xF3w transakcyjnych.").replace(/A land-price benchmark does not establish parcel buildability\./gi, "Benchmark cen gruntu nie potwierdza mo\u017Cliwo\u015Bci zabudowy dzia\u0142ki.").replace(/A professional appraisal requires current local comparable evidence and a suitably qualified valuer\./gi, "Profesjonalna wycena wymaga aktualnych lokalnych danych por\xF3wnawczych i odpowiednio wykwalifikowanego rzeczoznawcy.");
      if (locale === "es") return text.replace(/^Indicative Valuation Benchmark:/i, "Referencia indicativa de valoraci\xF3n:").replace(/\[0 Direct Comparable Deeds Verified\]/gi, "[0 compraventas comparables directas verificadas]");
    }
    if (/^Lithogenetic Map of Poland \(MLP\): approved source route could not be validated\.?$/i.test(text) && locale === "pl") return "Mapa Litogenetyczna Polski (MLP): nie uda\u0142o si\u0119 zweryfikowa\u0107 zatwierdzonej \u015Bcie\u017Cki dost\u0119pu do \u017Ar\xF3d\u0142a.";
    if (/^SoilGrids 2\.0 — 250 m raster; available mean depth values$/i.test(text)) {
      if (locale === "pl") return "SoilGrids 2.0 \u2014 raster 250 m; dost\u0119pne \u015Brednie warto\u015Bci dla g\u0142\u0119boko\u015Bci";
      if (locale === "es") return "SoilGrids 2.0 \u2014 r\xE1ster de 250 m; valores medios disponibles por profundidad";
    }
    var localized = text;
    if (locale === "pl") localized = localized.replace(/^(.+?) Spatial Planning Authority/i, "$1 \u2014 w\u0142a\u015Bciwy organ planowania przestrzennego").replace(/^(.+?) competent local planning authority$/i, "$1 \u2014 w\u0142a\u015Bciwy organ planowania przestrzennego");
    if (locale === "es") localized = localized.replace(/^(.+?) Spatial Planning Authority/i, "$1 \u2014 autoridad de planeamiento").replace(/^(.+?) competent local planning authority$/i, "$1 \u2014 autoridad urban\xEDstica competente");
    if (localized !== text) return localized;
    var composite = text.match(/^(.*)\((Low to Very Low|Low|Moderate|High)\)(.*)$/i);
    if (composite) return "".concat(composite[1], "(").concat(knownPhrases[locale][composite[2].toUpperCase()] || enumLabels[locale][composite[2].toUpperCase()] || composite[2], ")").concat(composite[3]);
    return text.replace(/<\/?svg\b[^>]*>/gi, "").replace(/\bsvg\b/gi, "").trim();
  }

  // src/lib/groundSurfEvidenceManifest.ts
  var _GROUNDSURF_EVIDENCE_MANIFEST_VERSION = "1.2.0";
  var _GROUNDSURF_EVIDENCE_MANIFEST_NAME = "GroundSurf Evidence Manifest";
  var OMITTED_VALUE_KEYS = /* @__PURE__ */new Set(["geometry", "geometrypoints", "geometrywkt", "features", "featurecollection", "records", "observations", "rawresponse", "response", "sourceimageurl", "bgs_sources", "bgssources"]);
  var MAX_VALUE_DEPTH = 4;
  var MAX_ARRAY_ITEMS = 20;
  var MAX_STRING_LENGTH = 3e3;
  var MANIFEST_SEMANTICS_COPY = {
    zh: {
      "purpose": "\u672C\u62A5\u544A\u7684\u53D1\u73B0\u3001\u6765\u6E90\u3001\u7A7A\u95F4\u5173\u7CFB\u3001\u65B9\u6CD5\u3001\u8BC4\u4F30\u4E0E\u5C40\u9650\u7684\u673A\u5668\u53EF\u8BFB\u8BB0\u5F55\u3002",
      "statusNote": "GroundSurf\u72B6\u6001\u6807\u7B7E\u662F\u5185\u90E8\u5206\u7C7B\uFF0C\u4E0D\u4EE3\u8868\u7B2C\u4E09\u65B9\u72EC\u7ACB\u8BA4\u8BC1\u6216\u786E\u8BA4\u3002",
      "verified": "GroundSurf\u5728\u5176\u8BC1\u636E\u6A21\u578B\u4E2D\u5C06\u6B64\u6761\u76EE\u5206\u7C7B\u4E3A\u5DF2\u6838\u5B9E\u3002\u8BF7\u67E5\u770B\u6765\u6E90\u3001\u65B9\u6CD5\u548C\u5C40\u9650\u3002",
      "modelled": "\u6B64\u6761\u76EE\u4F9D\u8D56\u6A21\u578B\u3001\u4F30\u7B97\u6216\u63A8\u5BFC\u5206\u6790\uFF0C\u5E76\u975E\u4EC5\u6765\u81EA\u76F4\u63A5\u89C2\u6D4B\u3002",
      "requiresVerification": "\u6B64\u6761\u76EE\u6216\u53C2\u6570\u9700\u8981\u8FDB\u4E00\u6B65\u786E\u8BA4\u3002\u8BF7\u67E5\u770B\u6765\u6E90\u8BE6\u60C5\u4E0E\u5C40\u9650\u3002",
      "retrievalNote": "\u4EC5\u5728\u6765\u6E90\u660E\u786E\u63D0\u4F9B\u65F6\u5217\u51FA\u83B7\u53D6\u65F6\u95F4\uFF1B\u8BE5\u65F6\u95F4\u4E0D\u7B49\u4E8E\u62A5\u544A\u751F\u6210\u65F6\u95F4\u3002"
    },
    it: {
      purpose: "Riepilogo leggibile dalle macchine dei risultati, delle fonti, del contesto spaziale, dei metodi, delle valutazioni e dei limiti di questo rapporto.",
      statusNote: "Le etichette di stato GroundSurf sono classificazioni interne e non una certificazione o conferma indipendente di terzi.",
      verified: "GroundSurf ha classificato questo elemento come verificato nel proprio modello di evidenze. Controllare fonte, metodo e limiti.",
      modelled: "Questo elemento deriva da un modello, una stima o un\u2019analisi, non soltanto da osservazione diretta.",
      requiresVerification: "Questo elemento o parametro richiede ulteriori conferme. Controllare fonte e limitazioni.",
      retrievalNote: "L\u2019ora di acquisizione della fonte compare solo quando \xE8 esplicitamente disponibile. Non coincide con l\u2019ora di generazione del rapporto."
    },
    en: {
      purpose: "Machine-readable snapshot of the findings, sources, spatial context, methods, assessments and limitations attached to this report.",
      statusNote: "GroundSurf status labels are internal classifications. They are not independent certification or confirmation by a third party.",
      verified: "GroundSurf classified this finding as verified within its own evidence model. Check the source, method and limitation.",
      modelled: "This finding depends on a model, estimate or derived analysis, not solely on a direct source observation.",
      requiresVerification: "This finding or parameter needs further confirmation. Check the source details and limitation.",
      retrievalNote: "A source retrieval time is included only when the evidence item explicitly supplies one. Report generation time is not a source retrieval time."
    },
    sq: {
      purpose: "P\xEBrmbledhje e lexueshme nga makinat e gjetjeve, burimeve, kontekstit hap\xEBsinor, metodave, vler\xEBsimeve dhe kufizimeve t\xEB k\xEBtij raporti.",
      statusNote: "Etiketat e statusit t\xEB GroundSurf jan\xEB klasifikime t\xEB brendshme. Ato nuk jan\xEB certifikim i pavarur ose konfirmim nga pal\xEB e tret\xEB.",
      verified: "GroundSurf e ka klasifikuar k\xEBt\xEB gjetje si t\xEB verifikuar sipas modelit t\xEB vet t\xEB provave. Kontrolloni burimin, metod\xEBn dhe kufizimin.",
      modelled: "Kjo gjetje mb\xEBshtetet n\xEB model, vler\xEBsim ose analiz\xEB t\xEB prejardhur, jo vet\xEBm n\xEB v\xEBzhgim t\xEB drejtp\xEBrdrejt\xEB t\xEB burimit.",
      requiresVerification: "Kjo gjetje ose paramet\xEBr k\xEBrkon konfirmim t\xEB m\xEBtejsh\xEBm. Kontrolloni holl\xEBsit\xEB e burimit dhe kufizimet.",
      retrievalNote: "Koha e marrjes s\xEB t\xEB dh\xEBnave sh\xEBnohet vet\xEBm kur jepet shprehimisht n\xEB elementin e prov\xEBs. Koha e krijimit t\xEB raportit nuk \xEBsht\xEB koha e marrjes s\xEB burimit."
    },
    de: {
      purpose: "Maschinenlesbare Zusammenfassung der in diesem Bericht enthaltenen Ergebnisse, Quellen, r\xE4umlichen Bez\xFCge, Methoden, Bewertungen und Einschr\xE4nkungen.",
      statusNote: "GroundSurf-Statusangaben sind interne Klassifizierungen. Sie sind keine unabh\xE4ngige Zertifizierung oder Best\xE4tigung durch Dritte.",
      verified: "GroundSurf hat diesen Befund innerhalb seines eigenen Evidenzmodells als verifiziert eingestuft. Quelle, Methode und Einschr\xE4nkung pr\xFCfen.",
      modelled: "Dieser Befund beruht auf einem Modell, einer Sch\xE4tzung oder einer abgeleiteten Analyse und nicht ausschlie\xDFlich auf einer direkten Quellenbeobachtung.",
      requiresVerification: "Dieser Befund oder Parameter muss weiter best\xE4tigt werden. Quelldetails und Einschr\xE4nkungen pr\xFCfen.",
      retrievalNote: "Ein Abrufzeitpunkt wird nur angegeben, wenn er ausdr\xFCcklich im Evidenzelement enthalten ist. Die Berichtserstellung ist nicht der Abrufzeitpunkt der Quelle."
    },
    pl: {
      purpose: "Zapis maszynowy ustale\u0144, \u017Ar\xF3de\u0142, kontekstu przestrzennego, metod, ocen i ogranicze\u0144 zawartych w tym raporcie.",
      statusNote: "Statusy GroundSurf to wewn\u0119trzne klasyfikacje. Nie s\u0105 niezale\u017Cn\u0105 certyfikacj\u0105 ani potwierdzeniem przez stron\u0119 trzeci\u0105.",
      verified: "GroundSurf sklasyfikowa\u0142 to ustalenie jako zweryfikowane w ramach w\u0142asnego modelu dowod\xF3w. Sprawd\u017A \u017Ar\xF3d\u0142o, metod\u0119 i ograniczenia.",
      modelled: "Ustalenie opiera si\u0119 na modelu, oszacowaniu lub analizie pochodnej, a nie wy\u0142\u0105cznie na bezpo\u015Bredniej obserwacji \u017Ar\xF3d\u0142owej.",
      requiresVerification: "To ustalenie lub parametr wymaga dalszego potwierdzenia. Sprawd\u017A szczeg\xF3\u0142y \u017Ar\xF3d\u0142a i ograniczenia.",
      retrievalNote: "Czas pobrania \u017Ar\xF3d\u0142a jest podawany tylko wtedy, gdy zosta\u0142 jawnie zapisany w elemencie dowodowym. Czas utworzenia raportu nie oznacza czasu pobrania danych."
    },
    nl: {
      purpose: "Machineleesbare momentopname van bevindingen, bronnen, ruimtelijke context, methoden, beoordelingen en beperkingen in dit rapport.",
      statusNote: "GroundSurf-statuslabels zijn interne classificaties. Ze zijn geen onafhankelijke certificering of bevestiging door derden.",
      verified: "GroundSurf heeft deze bevinding binnen het eigen bewij model als geverifieerd geclassificeerd. Controleer bron, methode en beperking.",
      modelled: "Deze bevinding berust op een model, schatting of afgeleide analyse en niet uitsluitend op een directe bronwaarneming.",
      requiresVerification: "Deze bevinding of parameter moet verder worden bevestigd. Controleer brongegevens en beperkingen.",
      retrievalNote: "Een ophaaltijd wordt alleen opgenomen als die expliciet bij het bewijs staat. De rapporttijd is niet de ophaaltijd van de bron."
    },
    cs: {
      purpose: "Strojov\u011B \u010Diteln\xFD p\u0159ehled zji\u0161t\u011Bn\xED, zdroj\u016F, prostorov\xFDch souvislost\xED, metod, hodnocen\xED a omezen\xED uveden\xFDch v t\xE9to zpr\xE1v\u011B.",
      statusNote: "Stavov\xE9 \u0161t\xEDtky GroundSurf jsou intern\xED klasifikace. Nejde o nez\xE1vislou certifikaci ani potvrzen\xED t\u0159et\xED stranou.",
      verified: "GroundSurf ozna\u010Dil toto zji\u0161t\u011Bn\xED jako ov\u011B\u0159en\xE9 v r\xE1mci vlastn\xEDho modelu d\u016Fkaz\u016F. Zkontrolujte zdroj, metodu a omezen\xED.",
      modelled: "Zji\u0161t\u011Bn\xED z\xE1vis\xED na modelu, odhadu nebo odvozen\xE9 anal\xFDze, nikoli pouze na p\u0159\xEDm\xE9m pozorov\xE1n\xED zdroje.",
      requiresVerification: "Toto zji\u0161t\u011Bn\xED nebo parametr vy\u017Eaduje dal\u0161\xED potvrzen\xED. Zkontrolujte podrobnosti zdroje a omezen\xED.",
      retrievalNote: "\u010Cas z\xEDsk\xE1n\xED zdroje se uv\xE1d\xED pouze tehdy, pokud je v\xFDslovn\u011B sou\u010D\xE1st\xED d\u016Fkazn\xED polo\u017Eky. \u010Cas vytvo\u0159en\xED zpr\xE1vy nen\xED \u010Dasem z\xEDsk\xE1n\xED zdroje."
    },
    da: {
      purpose: "Maskinl\xE6sbar oversigt over rapportens fund, kilder, geografiske sammenh\xE6nge, metoder, vurderinger og begr\xE6nsninger.",
      statusNote: "GroundSurfs statusm\xE6rker er interne klassifikationer. De er ikke uafh\xE6ngig certificering eller bekr\xE6ftelse fra tredjepart.",
      verified: "GroundSurf har klassificeret dette fund som verificeret i sin egen evidensmodel. Kontroll\xE9r kilde, metode og begr\xE6nsning.",
      modelled: "Fundet bygger p\xE5 en model, et sk\xF8n eller en afledt analyse og ikke udelukkende p\xE5 en direkte kildeobservation.",
      requiresVerification: "Fundet eller parameteren kr\xE6ver yderligere bekr\xE6ftelse. Kontroll\xE9r kildeoplysninger og begr\xE6nsninger.",
      retrievalNote: "Hentetidspunkt medtages kun, hvis det udtrykkeligt findes p\xE5 evidenselementet. Rapportens oprettelsestid er ikke kildens hentetid."
    },
    sv: {
      purpose: "Maskinl\xE4sbar \xF6versikt \xF6ver rapportens resultat, k\xE4llor, rumsliga sammanhang, metoder, bed\xF6mningar och begr\xE4nsningar.",
      statusNote: "GroundSurfs statusetiketter \xE4r interna klassificeringar. De \xE4r inte oberoende certifiering eller bekr\xE4ftelse fr\xE5n tredje part.",
      verified: "GroundSurf har klassificerat detta resultat som verifierat enligt sin egen evidensmodell. Kontrollera k\xE4lla, metod och begr\xE4nsning.",
      modelled: "Resultatet bygger p\xE5 en modell, uppskattning eller h\xE4rledd analys och inte enbart p\xE5 en direkt k\xE4llobservation.",
      requiresVerification: "Resultatet eller parametern beh\xF6ver bekr\xE4ftas ytterligare. Kontrollera k\xE4lluppgifter och begr\xE4nsningar.",
      retrievalNote: "H\xE4mtningstid anges endast n\xE4r den uttryckligen finns i evidensposten. Rapportens skapandetid \xE4r inte k\xE4llans h\xE4mtningstid."
    },
    no: {
      purpose: "Maskinlesbar oversikt over funn, kilder, romlig kontekst, metoder, vurderinger og begrensninger i rapporten.",
      statusNote: "GroundSurfs statusetiketter er interne klassifiseringer. De er ikke uavhengig sertifisering eller bekreftelse fra tredjepart.",
      verified: "GroundSurf har klassifisert funnet som verifisert innenfor sin egen evidensmodell. Kontroller kilde, metode og begrensning.",
      modelled: "Funnet bygger p\xE5 en modell, et estimat eller en avledet analyse, ikke bare en direkte kildeobservasjon.",
      requiresVerification: "Funnet eller parameteren m\xE5 bekreftes n\xE6rmere. Kontroller kildeopplysninger og begrensninger.",
      retrievalNote: "Hentetidspunkt tas bare med hvis det uttrykkelig er oppgitt p\xE5 evidensposten. Rapportens opprettelsestid er ikke kildens hentetid."
    },
    fr: {
      purpose: "Instantan\xE9 lisible par machine des constats, sources, contextes spatiaux, m\xE9thodes, \xE9valuations et limites de ce rapport.",
      statusNote: "Les statuts GroundSurf sont des classifications internes. Ils ne constituent ni une certification ind\xE9pendante ni une confirmation par un tiers.",
      verified: "GroundSurf a class\xE9 ce constat comme v\xE9rifi\xE9 selon son propre mod\xE8le de preuves. Consultez la source, la m\xE9thode et la limite.",
      modelled: "Ce constat d\xE9pend d\u2019un mod\xE8le, d\u2019une estimation ou d\u2019une analyse d\xE9riv\xE9e, et pas uniquement d\u2019une observation directe de la source.",
      requiresVerification: "Ce constat ou param\xE8tre doit \xEAtre confirm\xE9 davantage. Consultez les d\xE9tails de la source et les limites.",
      retrievalNote: "La date de r\xE9cup\xE9ration n\u2019est incluse que si elle est explicitement fournie avec l\u2019\xE9l\xE9ment de preuve. La date de g\xE9n\xE9ration du rapport n\u2019est pas celle de r\xE9cup\xE9ration de la source."
    },
    es: {
      purpose: "Instant\xE1nea legible por m\xE1quina de los hallazgos, fuentes, contexto espacial, m\xE9todos, evaluaciones y limitaciones de este informe.",
      statusNote: "Los estados de GroundSurf son clasificaciones internas. No constituyen certificaci\xF3n independiente ni confirmaci\xF3n de terceros.",
      verified: "GroundSurf ha clasificado este hallazgo como verificado seg\xFAn su propio modelo de evidencias. Revise la fuente, el m\xE9todo y la limitaci\xF3n.",
      modelled: "El hallazgo depende de un modelo, una estimaci\xF3n o un an\xE1lisis derivado, no solo de una observaci\xF3n directa de la fuente.",
      requiresVerification: "Este hallazgo o par\xE1metro necesita confirmaci\xF3n adicional. Revise los detalles de la fuente y las limitaciones.",
      retrievalNote: "La fecha de recuperaci\xF3n solo se incluye cuando figura expresamente en el elemento de evidencia. La fecha de generaci\xF3n del informe no es la fecha de recuperaci\xF3n de la fuente."
    },
    fi: {
      purpose: "Koneellisesti luettava yhteenveto t\xE4m\xE4n raportin havainnoista, l\xE4hteist\xE4, paikkatiedoista, menetelmist\xE4, arvioista ja rajoituksista.",
      statusNote: "GroundSurfin tilamerkinn\xE4t ovat sis\xE4isi\xE4 luokituksia. Ne eiv\xE4t ole riippumatonta sertifiointia tai kolmannen osapuolen vahvistuksia.",
      verified: "GroundSurf luokitteli havainnon varmennetuksi oman n\xE4ytt\xF6mallinsa perusteella. Tarkista l\xE4hde, menetelm\xE4 ja rajoitus.",
      modelled: "Havainto perustuu malliin, arvioon tai johdettuun analyysiin, ei yksinomaan suoraan l\xE4hdehavaintoon.",
      requiresVerification: "Havainto tai parametri vaatii lis\xE4varmistusta. Tarkista l\xE4hdetiedot ja rajoitukset.",
      retrievalNote: "L\xE4hteen hakuaika sis\xE4llytet\xE4\xE4n vain, jos se on nimenomaisesti kirjattu n\xE4ytt\xF6kohteeseen. Raportin luontiaika ei ole l\xE4hteen hakuaika."
    },
    sk: {
      purpose: "Strojovo \u010Ditate\u013En\xFD preh\u013Ead zisten\xED, zdrojov, priestorov\xFDch s\xFAvislost\xED, met\xF3d, hodnoten\xED a obmedzen\xED v tejto spr\xE1ve.",
      statusNote: "Stavov\xE9 ozna\u010Denia GroundSurf s\xFA intern\xE9 klasifik\xE1cie. Nejde o nez\xE1visl\xFA certifik\xE1ciu ani potvrdenie tre\u0165ou stranou.",
      verified: "GroundSurf ozna\u010Dil toto zistenie za overen\xE9 v r\xE1mci vlastn\xE9ho modelu d\xF4kazov. Skontrolujte zdroj, met\xF3du a obmedzenie.",
      modelled: "Zistenie z\xE1vis\xED od modelu, odhadu alebo odvodenej anal\xFDzy, nie iba od priameho pozorovania zdroja.",
      requiresVerification: "Toto zistenie alebo parameter si vy\u017Eaduje \u010Fal\u0161ie potvrdenie. Skontrolujte podrobnosti zdroja a obmedzenia.",
      retrievalNote: "\u010Cas z\xEDskania zdroja sa uv\xE1dza iba vtedy, ak je v\xFDslovne s\xFA\u010Das\u0165ou d\xF4kazovej polo\u017Eky. \u010Cas vytvorenia spr\xE1vy nie je \u010Dasom z\xEDskania zdroja."
    },
    hr: {
      purpose: "Strojno \u010Ditljiv pregled nalaza, izvora, prostornih odnosa, metoda, procjena i ograni\u010Denja u ovom izvje\u0161\u0107u.",
      statusNote: "Statusne oznake GroundSurf interne su klasifikacije. Nisu neovisna certifikacija ni potvrda tre\u0107e strane.",
      verified: "GroundSurf je ovaj nalaz klasificirao kao provjeren unutar vlastitog modela dokaza. Provjerite izvor, metodu i ograni\u010Denje.",
      modelled: "Nalaz se temelji na modelu, procjeni ili izvedenoj analizi, a ne samo na izravnom opa\u017Eanju izvora.",
      requiresVerification: "Ovaj nalaz ili parametar zahtijeva dodatnu potvrdu. Provjerite pojedinosti izvora i ograni\u010Denja.",
      retrievalNote: "Vrijeme dohva\u0107anja navodi se samo ako je izri\u010Dito zapisano uz dokaz. Vrijeme izrade izvje\u0161\u0107a nije vrijeme dohva\u0107anja izvora."
    },
    pt: {
      purpose: "Registo leg\xEDvel por m\xE1quinas das conclus\xF5es, fontes, contexto espacial, m\xE9todos, avalia\xE7\xF5es e limita\xE7\xF5es deste relat\xF3rio.",
      statusNote: "Os estados GroundSurf s\xE3o classifica\xE7\xF5es internas. N\xE3o constituem certifica\xE7\xE3o independente nem confirma\xE7\xE3o por terceiros.",
      verified: "O GroundSurf classificou esta conclus\xE3o como verificada segundo o seu pr\xF3prio modelo de evid\xEAncia. Consulte a fonte, o m\xE9todo e a limita\xE7\xE3o.",
      modelled: "A conclus\xE3o depende de um modelo, estimativa ou an\xE1lise derivada, e n\xE3o apenas de uma observa\xE7\xE3o direta da fonte.",
      requiresVerification: "Esta conclus\xE3o ou par\xE2metro necessita de confirma\xE7\xE3o adicional. Consulte os detalhes da fonte e as limita\xE7\xF5es.",
      retrievalNote: "A data de obten\xE7\xE3o da fonte s\xF3 \xE9 inclu\xEDda quando consta expressamente no elemento de evid\xEAncia. A data de gera\xE7\xE3o do relat\xF3rio n\xE3o \xE9 a data de obten\xE7\xE3o da fonte."
    },
    et: {
      purpose: "Masinloetav \xFClevaade aruandes sisalduvatest j\xE4reldustest, allikatest, ruumilisest kontekstist, meetoditest, hinnangutest ja piirangutest.",
      statusNote: "GroundSurfi olekusildid on ettev\xF5ttesisesed klassifikatsioonid. Need ei ole s\xF5ltumatu sertifikaat ega kolmanda osapoole kinnitus.",
      verified: "GroundSurf klassifitseeris selle leiu oma t\xF5endusmudeli alusel kontrollituks. Kontrollige allikat, meetodit ja piirangut.",
      modelled: "Leid p\xF5hineb mudelil, hinnangul v\xF5i tuletatud anal\xFC\xFCsil, mitte \xFCksnes otsesel allikavaatlusel.",
      requiresVerification: "See leid v\xF5i parameeter vajab t\xE4iendavat kinnitamist. Kontrollige allika \xFCksikasju ja piiranguid.",
      retrievalNote: "Allika p\xE4ringu aeg lisatakse ainult siis, kui see on t\xF5endikirjes selges\xF5naliselt olemas. Aruande loomisaeg ei ole allika p\xE4ringu aeg."
    },
    lv: {
      purpose: "Ma\u0161\u012Bnlas\u0101ms p\u0101rskats par \u0161\u012B zi\u0146ojuma konstat\u0113jumiem, avotiem, telpisko kontekstu, metod\u0113m, nov\u0113rt\u0113jumiem un ierobe\u017Eojumiem.",
      statusNote: "GroundSurf statusa apz\u012Bm\u0113jumi ir iek\u0161\u0113jas klasifik\u0101cijas. Tie nav neatkar\u012Bga sertifik\u0101cija vai tre\u0161\u0101s puses apstiprin\u0101jums.",
      verified: "GroundSurf \u0161o konstat\u0113jumu klasific\u0113ja k\u0101 p\u0101rbaud\u012Btu sav\u0101 pier\u0101d\u012Bjumu model\u012B. P\u0101rbaudiet avotu, metodi un ierobe\u017Eojumu.",
      modelled: "Konstat\u0113jums balst\u0101s uz modeli, apl\u0113si vai atvasin\u0101tu anal\u012Bzi, nevis tikai tie\u0161u avota nov\u0113rojumu.",
      requiresVerification: "\u0160im konstat\u0113jumam vai parametram vajadz\u012Bgs papildu apstiprin\u0101jums. P\u0101rbaudiet avota deta\u013Cas un ierobe\u017Eojumus.",
      retrievalNote: "Avota ieg\u016B\u0161anas laiks tiek iek\u013Cauts tikai tad, ja tas ir skaidri nor\u0101d\u012Bts pier\u0101d\u012Bjuma ierakst\u0101. Zi\u0146ojuma izveides laiks nav avota ieg\u016B\u0161anas laiks."
    },
    lt: {
      purpose: "Ma\u0161ininiu b\u016Bdu nuskaitoma \u0161ios ataskaitos i\u0161vad\u0173, \u0161altini\u0173, erdvinio konteksto, metod\u0173, vertinim\u0173 ir apribojim\u0173 santrauka.",
      statusNote: "GroundSurf b\u016Bsen\u0173 \u017Eymos yra vidin\u0117s klasifikacijos. Tai n\u0117ra nepriklausomas sertifikavimas ar tre\u010Diosios \u0161alies patvirtinimas.",
      verified: "GroundSurf \u0161i\u0105 i\u0161vad\u0105 savo \u012Frodym\u0173 modelyje priskyr\u0117 patvirtintoms. Patikrinkite \u0161altin\u012F, metod\u0105 ir apribojim\u0105.",
      modelled: "I\u0161vada paremta modeliu, \u012Fver\u010Diu ar i\u0161vestine analize, o ne vien tiesioginiu \u0161altinio steb\u0117jimu.",
      requiresVerification: "\u0160i\u0105 i\u0161vad\u0105 arba parametr\u0105 reikia papildomai patvirtinti. Patikrinkite \u0161altinio informacij\u0105 ir apribojimus.",
      retrievalNote: "\u0160altinio gavimo laikas nurodomas tik tada, kai jis ai\u0161kiai \u012Fra\u0161ytas \u012Frodymo \u012Fra\u0161e. Ataskaitos suk\u016Brimo laikas n\u0117ra \u0161altinio gavimo laikas."
    },
    uk: {
      purpose: "\u041C\u0430\u0448\u0438\u043D\u043E\u0447\u0438\u0442\u0430\u043D\u0438\u0439 \u0437\u043D\u0456\u043C\u043E\u043A \u0432\u0438\u0441\u043D\u043E\u0432\u043A\u0456\u0432, \u0434\u0436\u0435\u0440\u0435\u043B, \u043F\u0440\u043E\u0441\u0442\u043E\u0440\u043E\u0432\u043E\u0433\u043E \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442\u0443, \u043C\u0435\u0442\u043E\u0434\u0456\u0432, \u043E\u0446\u0456\u043D\u043E\u043A \u0442\u0430 \u043E\u0431\u043C\u0435\u0436\u0435\u043D\u044C \u0446\u044C\u043E\u0433\u043E \u0437\u0432\u0456\u0442\u0443.",
      statusNote: "\u0421\u0442\u0430\u0442\u0443\u0441\u0438 GroundSurf \u0454 \u0432\u043D\u0443\u0442\u0440\u0456\u0448\u043D\u0456\u043C\u0438 \u043A\u043B\u0430\u0441\u0438\u0444\u0456\u043A\u0430\u0446\u0456\u044F\u043C\u0438. \u0412\u043E\u043D\u0438 \u043D\u0435 \u0454 \u043D\u0435\u0437\u0430\u043B\u0435\u0436\u043D\u043E\u044E \u0441\u0435\u0440\u0442\u0438\u0444\u0456\u043A\u0430\u0446\u0456\u0454\u044E \u0447\u0438 \u043F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0436\u0435\u043D\u043D\u044F\u043C \u0442\u0440\u0435\u0442\u044C\u043E\u0457 \u0441\u0442\u043E\u0440\u043E\u043D\u0438.",
      verified: "GroundSurf \u043A\u043B\u0430\u0441\u0438\u0444\u0456\u043A\u0443\u0432\u0430\u0432 \u0446\u0435\u0439 \u0432\u0438\u0441\u043D\u043E\u0432\u043E\u043A \u044F\u043A \u043F\u0435\u0440\u0435\u0432\u0456\u0440\u0435\u043D\u0438\u0439 \u0443 \u043C\u0435\u0436\u0430\u0445 \u0432\u043B\u0430\u0441\u043D\u043E\u0457 \u043C\u043E\u0434\u0435\u043B\u0456 \u0434\u043E\u043A\u0430\u0437\u0456\u0432. \u041F\u0435\u0440\u0435\u0432\u0456\u0440\u0442\u0435 \u0434\u0436\u0435\u0440\u0435\u043B\u043E, \u043C\u0435\u0442\u043E\u0434 \u0456 \u043E\u0431\u043C\u0435\u0436\u0435\u043D\u043D\u044F.",
      modelled: "\u0412\u0438\u0441\u043D\u043E\u0432\u043E\u043A \u0437\u0430\u043B\u0435\u0436\u0438\u0442\u044C \u0432\u0456\u0434 \u043C\u043E\u0434\u0435\u043B\u0456, \u043E\u0446\u0456\u043D\u043A\u0438 \u0430\u0431\u043E \u043F\u043E\u0445\u0456\u0434\u043D\u043E\u0433\u043E \u0430\u043D\u0430\u043B\u0456\u0437\u0443, \u0430 \u043D\u0435 \u043B\u0438\u0448\u0435 \u0432\u0456\u0434 \u0431\u0435\u0437\u043F\u043E\u0441\u0435\u0440\u0435\u0434\u043D\u044C\u043E\u0433\u043E \u0441\u043F\u043E\u0441\u0442\u0435\u0440\u0435\u0436\u0435\u043D\u043D\u044F \u0434\u0436\u0435\u0440\u0435\u043B\u0430.",
      requiresVerification: "\u0426\u0435\u0439 \u0432\u0438\u0441\u043D\u043E\u0432\u043E\u043A \u0430\u0431\u043E \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440 \u043F\u043E\u0442\u0440\u0435\u0431\u0443\u0454 \u0434\u043E\u0434\u0430\u0442\u043A\u043E\u0432\u043E\u0433\u043E \u043F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0436\u0435\u043D\u043D\u044F. \u041F\u0435\u0440\u0435\u0432\u0456\u0440\u0442\u0435 \u0434\u0436\u0435\u0440\u0435\u043B\u043E \u0442\u0430 \u043E\u0431\u043C\u0435\u0436\u0435\u043D\u043D\u044F.",
      retrievalNote: "\u0427\u0430\u0441 \u043E\u0442\u0440\u0438\u043C\u0430\u043D\u043D\u044F \u0434\u0436\u0435\u0440\u0435\u043B\u0430 \u0432\u043A\u0430\u0437\u0443\u0454\u0442\u044C\u0441\u044F \u043B\u0438\u0448\u0435 \u0442\u043E\u0434\u0456, \u043A\u043E\u043B\u0438 \u0432\u0456\u043D \u044F\u0432\u043D\u043E \u0437\u0430\u043F\u0438\u0441\u0430\u043D\u0438\u0439 \u0443 \u0434\u043E\u043A\u0430\u0437\u0456. \u0427\u0430\u0441 \u0441\u0442\u0432\u043E\u0440\u0435\u043D\u043D\u044F \u0437\u0432\u0456\u0442\u0443 \u043D\u0435 \u0454 \u0447\u0430\u0441\u043E\u043C \u043E\u0442\u0440\u0438\u043C\u0430\u043D\u043D\u044F \u0434\u0436\u0435\u0440\u0435\u043B\u0430."
    },
    sl: {
      purpose: "Strojno berljiv posnetek ugotovitev, virov, prostorskega konteksta, metod, ocen in omejitev v tem poro\u010Dilu.",
      statusNote: "Oznake stanja GroundSurf so interne klasifikacije. Ne predstavljajo neodvisnega certificiranja ali potrditve tretje osebe.",
      verified: "GroundSurf je ugotovitev v svojem modelu dokazov razvrstil kot preverjeno. Preverite vir, metodo in omejitev.",
      modelled: "Ugotovitev je odvisna od modela, ocene ali izpeljane analize in ne zgolj od neposrednega opa\u017Eanja vira.",
      requiresVerification: "Ugotovitev ali parameter potrebuje dodatno potrditev. Preverite podrobnosti vira in omejitve.",
      retrievalNote: "\u010Cas pridobitve vira se navede samo, kadar je izrecno zapisan pri dokazu. \u010Cas izdelave poro\u010Dila ni \u010Das pridobitve vira."
    },
    hu: {
      purpose: "A jelent\xE9sben szerepl\u0151 meg\xE1llap\xEDt\xE1sok, forr\xE1sok, t\xE9rbeli \xF6sszef\xFCgg\xE9sek, m\xF3dszerek, \xE9rt\xE9kel\xE9sek \xE9s korl\xE1toz\xE1sok g\xE9ppel olvashat\xF3 pillanatk\xE9pe.",
      statusNote: "A GroundSurf st\xE1tuszjel\xF6l\xE9sei bels\u0151 besorol\xE1sok. Nem jelentenek f\xFCggetlen tan\xFAs\xEDt\xE1st vagy harmadik f\xE9l \xE1ltali meger\u0151s\xEDt\xE9st.",
      verified: "A GroundSurf saj\xE1t bizony\xEDt\xE9kmodellje alapj\xE1n ellen\u0151rz\xF6ttnek min\u0151s\xEDtette ezt a meg\xE1llap\xEDt\xE1st. Ellen\u0151rizze a forr\xE1st, a m\xF3dszert \xE9s a korl\xE1toz\xE1st.",
      modelled: "A meg\xE1llap\xEDt\xE1s modellre, becsl\xE9sre vagy sz\xE1rmaztatott elemz\xE9sre t\xE1maszkodik, nem kiz\xE1r\xF3lag k\xF6zvetlen forr\xE1smegfigyel\xE9sre.",
      requiresVerification: "A meg\xE1llap\xEDt\xE1s vagy param\xE9ter tov\xE1bbi meger\u0151s\xEDt\xE9st ig\xE9nyel. Ellen\u0151rizze a forr\xE1s r\xE9szleteit \xE9s a korl\xE1toz\xE1sokat.",
      retrievalNote: "A forr\xE1s lek\xE9rdez\xE9si ideje csak akkor szerepel, ha azt a bizony\xEDt\xE9k kifejezetten tartalmazza. A jelent\xE9s l\xE9trehoz\xE1si ideje nem a forr\xE1s lek\xE9rdez\xE9si ideje."
    },
    ro: {
      purpose: "Instantaneu lizibil automat al constat\u0103rilor, surselor, contextului spa\u021Bial, metodelor, evalu\u0103rilor \u0219i limit\u0103rilor din raport.",
      statusNote: "Etichetele de stare GroundSurf sunt clasific\u0103ri interne. Nu reprezint\u0103 certificare independent\u0103 sau confirmare din partea unei ter\u021Be p\u0103r\u021Bi.",
      verified: "GroundSurf a clasificat aceast\u0103 constatare ca verificat\u0103 \xEEn propriul model de dovezi. Verifica\u021Bi sursa, metoda \u0219i limitarea.",
      modelled: "Constatarea depinde de un model, o estimare sau o analiz\u0103 derivat\u0103, nu doar de o observa\u021Bie direct\u0103 a sursei.",
      requiresVerification: "Aceast\u0103 constatare sau acest parametru necesit\u0103 confirmare suplimentar\u0103. Verifica\u021Bi detaliile sursei \u0219i limit\u0103rile.",
      retrievalNote: "Data prelu\u0103rii sursei este inclus\u0103 numai dac\u0103 apare explicit \xEEn elementul de dovezi. Data gener\u0103rii raportului nu este data prelu\u0103rii sursei."
    },
    is: {
      purpose: "V\xE9lr\xE6nt l\xE6silegt yfirlit yfir ni\xF0urst\xF6\xF0ur, heimildir, sta\xF0bundi\xF0 samhengi, a\xF0fer\xF0ir, mat og takmarkanir \xED sk\xFDrslunni.",
      statusNote: "St\xF6\xF0umerkingar GroundSurf eru innri flokkun. \xDE\xE6r eru ekki \xF3h\xE1\xF0 vottun e\xF0a sta\xF0festing \xFEri\xF0ja a\xF0ila.",
      verified: "GroundSurf flokka\xF0i \xFEessa ni\xF0urst\xF6\xF0u sem sta\xF0festa samkv\xE6mt eigin gagnal\xEDkani. Athuga\xF0u heimild, a\xF0fer\xF0 og takm\xF6rkun.",
      modelled: "Ni\xF0ursta\xF0an byggist \xE1 l\xEDkani, mati e\xF0a afleiddri greiningu, ekki eing\xF6ngu beinni athugun \xED heimild.",
      requiresVerification: "\xDEessa ni\xF0urst\xF6\xF0u e\xF0a f\xE6ribreytu \xFEarf a\xF0 sta\xF0festa frekar. Athuga\xF0u uppl\xFDsingar um heimild og takmarkanir.",
      retrievalNote: "S\xF3knart\xEDmi heimildar er a\xF0eins tekinn me\xF0 \xFEegar hann er sk\xFDrt skr\xE1\xF0ur \xED s\xF6nnunargagni\xF0. Ger\xF0art\xEDmi sk\xFDrslunnar er ekki s\xF3knart\xEDmi heimildar."
    },
    ca: {
      purpose: "Instant\xE0nia llegible per m\xE0quines de les conclusions, fonts, context espacial, m\xE8todes, avaluacions i limitacions d\u2019aquest informe.",
      statusNote: "Els estats de GroundSurf s\xF3n classificacions internes. No s\xF3n una certificaci\xF3 independent ni una confirmaci\xF3 de tercers.",
      verified: "GroundSurf ha classificat aquesta conclusi\xF3 com a verificada segons el seu propi model de proves. Reviseu la font, el m\xE8tode i la limitaci\xF3.",
      modelled: "La conclusi\xF3 dep\xE8n d\u2019un model, una estimaci\xF3 o una an\xE0lisi derivada, no nom\xE9s d\u2019una observaci\xF3 directa de la font.",
      requiresVerification: "Aquesta conclusi\xF3 o par\xE0metre necessita m\xE9s confirmaci\xF3. Reviseu els detalls de la font i les limitacions.",
      retrievalNote: "La data de consulta de la font nom\xE9s s\u2019inclou si consta expl\xEDcitament a l\u2019element de prova. La data de generaci\xF3 de l\u2019informe no \xE9s la data de consulta de la font."
    }
  };
  function languageCode(language) {
    return String(language || "en").toLowerCase().split("-")[0];
  }
  function localizedEvidenceText(value, language) {
    var target = languageCode(language);
    var text = localizePresentationValue(value, target);
    return {
      text: text,
      language: target === "en" || text !== value ? target : null
    };
  }
  function nonEmptyString(value) {
    return typeof value === "string" && value.trim() ? value.trim() : null;
  }
  function finiteNumber(value) {
    return typeof value === "number" && Number.isFinite(value) ? value : null;
  }
  function httpUrl(value) {
    var candidate = nonEmptyString(value);
    if (!candidate) return null;
    try {
      var parsed = new URL(candidate);
      return parsed.protocol === "http:" || parsed.protocol === "https:" ? candidate : null;
    } catch (e) {
      return null;
    }
  }
  function getObjectValue(value) {
    return value && _typeof(value) === "object" && !Array.isArray(value) ? value : null;
  }
  function firstStringValue(value, keys) {
    var object = getObjectValue(value);
    if (!object) return null;
    var _iterator3 = _createForOfIteratorHelper(keys),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var key = _step3.value;
        var found = nonEmptyString(object[key]);
        if (found) return found;
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    return null;
  }
  function firstFiniteNumber(value, keys) {
    var object = getObjectValue(value);
    if (!object) return null;
    var _iterator4 = _createForOfIteratorHelper(keys),
      _step4;
    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var key = _step4.value;
        var found = finiteNumber(object[key]);
        if (found !== null) return found;
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
    return null;
  }
  function sanitizeValue(value) {
    var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    if (value === null || value === void 0) return void 0;
    if (typeof value === "string") return value.length > MAX_STRING_LENGTH ? "".concat(value.slice(0, MAX_STRING_LENGTH), "\u2026 [truncated]") : value;
    if (typeof value === "boolean") return value;
    if (typeof value === "number") return Number.isFinite(value) ? value : void 0;
    if (_typeof(value) !== "object" || depth >= MAX_VALUE_DEPTH) return void 0;
    if (Array.isArray(value)) {
      var items = value.slice(0, MAX_ARRAY_ITEMS).map(function (item) {
        return sanitizeValue(item, depth + 1);
      }).filter(function (item) {
        return item !== void 0;
      });
      return items;
    }
    var output = {};
    for (var _i = 0, _Object$entries = Object.entries(value); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        key = _Object$entries$_i[0],
        raw = _Object$entries$_i[1];
      if (OMITTED_VALUE_KEYS.has(key.toLowerCase())) continue;
      var clean = sanitizeValue(raw, depth + 1);
      if (clean !== void 0) output[key] = clean;
    }
    return output;
  }
  function sourceEntry(source) {
    var _a;
    return {
      name: source.name,
      organization: (_a = nonEmptyString(source.authority)) != null ? _a : null,
      url: httpUrl(source.url),
      reportedStatus: nonEmptyString(source.verification_status)
    };
  }
  function evidenceEntry(item, language) {
    var sourceRecordReference = firstStringValue(item.value, ["sourceRecordId", "source_record_id", "recordId", "record_id", "featureId", "feature_id", "boreholeId", "borehole_id"]);
    var retrievedAt = firstStringValue(item.value, ["retrievedAt", "retrieved_at", "retrievalTimestamp", "retrieval_timestamp"]);
    var safeValue = sanitizeValue(item.value);
    var rawDistance = firstFiniteNumber(item.value, ["distanceM", "distance_m", "distanceToSiteM", "distance_to_site_m"]);
    var sourceDistance = rawDistance !== null && rawDistance >= 0 ? rawDistance : null;
    var localizedClaim = localizedEvidenceText(item.claim, language);
    var targetLanguage = languageCode(language);
    var entry = {
      evidenceId: item.id,
      category: localizePresentationValue(item.category, targetLanguage),
      claim: localizedClaim,
      source: {
        name: item.sourceName,
        url: httpUrl(item.sourceUrl),
        datasetDate: nonEmptyString(item.datasetDate),
        sourceRecordReference: sourceRecordReference
      },
      spatialContext: {
        relationship: localizePresentationValue(item.spatialRelationship, targetLanguage),
        distanceM: sourceDistance
      },
      method: localizePresentationValue(item.calculationMethod, targetLanguage),
      groundSurfAssessment: {
        status: item.status,
        confidence: localizePresentationValue(item.confidence, targetLanguage),
        limitation: localizePresentationValue(item.limitation, targetLanguage)
      },
      // Do not substitute report generation time for a per-source retrieval timestamp.
      retrievedAt: retrievedAt
    };
    if (safeValue !== void 0) entry.value = safeValue;
    return entry;
  }
  function _createGroundSurfEvidenceManifest(report) {
    var createdAt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : /* @__PURE__ */new Date().toISOString();
    var selectedLanguage = arguments.length > 2 ? arguments[2] : undefined;
    var _a, _b, _c, _d, _e;
    var data = report.report_data;
    var exportLanguage = (_a = nonEmptyString(selectedLanguage)) != null ? _a : nonEmptyString(report.language);
    var evidence = Array.isArray(data.evidence_registry) ? data.evidence_registry : [];
    var sources = Array.isArray(data.data_sources) ? data.data_sources : [];
    return {
      manifest: {
        name: _GROUNDSURF_EVIDENCE_MANIFEST_NAME,
        version: _GROUNDSURF_EVIDENCE_MANIFEST_VERSION,
        createdAt: createdAt,
        evidenceSnapshot: {
          coreReportGeneratedAt: nonEmptyString(report.created_at),
          backgroundResearchIncluded: false
        },
        publisher: {
          name: "GroundSurf",
          website: "https://groundsurf.net"
        }
      },
      report: {
        id: nonEmptyString(report.id),
        generatedAt: nonEmptyString(report.created_at),
        country: {
          name: nonEmptyString(report.country),
          code: (_c = (_b = nonEmptyString(report.country_code)) == null ? void 0 : _b.toUpperCase()) != null ? _c : null
        },
        language: exportLanguage,
        site: {
          label: (_d = nonEmptyString(report.location_name)) != null ? _d : nonEmptyString(data.location_name),
          latitude: finiteNumber(report.latitude),
          longitude: finiteNumber(report.longitude),
          areaM2: (_e = finiteNumber(report.official_area_m2)) != null ? _e : finiteNumber(report.area_size)
        }
      },
      semantics: function () {
        var _a2;
        var copy = (_a2 = MANIFEST_SEMANTICS_COPY[languageCode(exportLanguage)]) != null ? _a2 : MANIFEST_SEMANTICS_COPY.en;
        return {
          purpose: copy.purpose,
          statusNote: copy.statusNote,
          statuses: {
            VERIFIED: copy.verified,
            MODELLED: copy.modelled,
            REQUIRES_VERIFICATION: copy.requiresVerification
          },
          retrievalNote: copy.retrievalNote
        };
      }(),
      developmentScreening: buildDevelopmentScreening(evidence),
      sources: sources.map(sourceEntry),
      evidence: evidence.map(function (item) {
        return evidenceEntry(item, exportLanguage);
      })
    };
  }
  function _groundSurfEvidenceManifestFilename(report) {
    var _a, _b;
    var country = ((_a = nonEmptyString(report.country_code)) == null ? void 0 : _a.toLowerCase()) || "site";
    var date = ((_b = nonEmptyString(report.created_at)) == null ? void 0 : _b.slice(0, 10)) || /* @__PURE__ */new Date().toISOString().slice(0, 10);
    return "groundsurf-evidence-".concat(country, "-").concat(date, ".json");
  }
  return __toCommonJS(groundSurfEvidenceManifest_exports);
}();
