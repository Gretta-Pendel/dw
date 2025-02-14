const w = 6600;
const h = 10200;
const mapUrl = "https://raw.githubusercontent.com/Gretta-Pendel/dw/refs/heads/master/cyberpunk/images/NightCity2045AtlasStreetNamesOnly.jpg";
const bounds = [
  [0, 0],
  [h, w],
];
const emptyG = {
  type: "Polygon",
  coordinates: [[[4100, 4100]]],
};
const areaStyle = {
  fillColor: "white",
  fillOpacity: 0.3,
};
// -----------------------
const style = () => ({
  weight: 0,
  fillOpacity: 0,
});
// -----------------------
let groups = {};
let gangsGroups = {};
let districtsData = { type: "FeatureCollection", features: [] };
var polygons = {};

// ***** MAP settings
const poiLayer = L.imageOverlay(mapUrl, bounds, { minZoom: -3, maxZoom: 1 });
const gangsLayer = L.imageOverlay(mapUrl, bounds, { minZoom: -3, maxZoom: 1 });
var map = L.map("map", {
  crs: L.CRS.Simple,
  center: [0, 0],
  minZoom: -3,
  maxZoom: 1,
  layers: [poiLayer],
});
var baseMaps = {
  POI: poiLayer.addTo(map),
  Gangs: gangsLayer,
};
const image = L.imageOverlay(mapUrl, bounds, { opacity: 1 }).addTo(map);
// ***** end MAP settings
// poiLayerId = poiLayer._leaflet_id;
// gangsLayerId = gangsLayer._leaflet_id;

// ***** POI
var markersLayer = new L.LayerGroup();
map.addLayer(markersLayer);

poi.forEach((l) => {
  if (l.x && l.y) {
    var ic = l.type && types[l.type] && types[l.type].icon ? types[l.type].icon : "";
    var myIcon = L.divIcon({ className: `ic ${ic}`, html: l.label });
    const searchText = `${l.name} ${l.desc} ${l.descCore} ${l.nameRu} ${l.descRu}`;
    const marker = L.marker(new L.latLng([l.y, l.x]), { icon: myIcon, title: l.name || "", type: l.type || "", data: searchText });
    let desc = l.descRu ? l.descRu : l.desc;
    desc += l.safety ? `<br>Безопасность: ${l.safety}` : "";
    desc += l.rent ? `<br>Аренда: ${l.rent}` : "";
    let name = l.nameRu ? l.name + "<br>" + l.nameRu : l.name;
    marker.bindTooltip(name).openTooltip();
    marker.bindPopup(desc).openPopup();
    markersLayer.addLayer(marker);
  }
});

var controlSearch = new L.Control.Search({
  position: "topleft",
  layer: markersLayer,
  initial: false,
  zoom: 12,
  marker: { icon: false, animate: true, circle: { radius: 20 } },
  hideMarkerOnCollapse: true,
  propertyName: "data",
  autoCollapseTime: 2000,
  buildTip: function (text, val) {
    const title = val && val.layer && val.layer.options && val.layer.options.title ? val.layer.options.title : "";
    const type = val && val.layer && val.layer.options && val.layer.options.type ? val.layer.options.type : "";
    console.log(val);
    return `<div><span>${title}</span> <span>${type}</span></div>`;
  },
}).on("search:locationfound", function (e) {
  e.layer.openPopup();
});
map.addControl(controlSearch);
// ***** end POI

// ***** tiles
for (const d in districts) {
  if (Object.prototype.hasOwnProperty.call(districts, d)) {
    districtsData.push;
    let _district = {
      type: "Feature",
      id: "district_" + districts[d].letter,
      properties: {
        name: d,
        desc: districts[d].districtDesc,
        gangs: districts[d].gangsPresent,
      },
      geometry: !districts[d].geometry || Object.keys(districts[d].geometry).length === 0 ? emptyG : districts[d].geometry,
    };
    districtsData.features.push(_district);
  }
}
function highlightFeature(e) {
  var layer = e.target;
  layer.setStyle(areaStyle);
  layer.bringToFront();
  info.update(layer.feature.properties);
}
function resetHighlight(e) {
  geojson.resetStyle(e.target);
  info.update();
}
function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}
var geojsonLayer = L.geoJson(districtsData, { style: style }).addTo(map);
geojsonLayer.getLayers().forEach((layer) => {
  let feature = layer.feature;
  let polyName = feature.properties.name;
  polygons[polyName] = layer;
});
function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: zoomToFeature,
  });
}
const geojson = L.geoJson(districtsData, {
  style,
  onEachFeature,
}).addTo(map);
var info = L.control({ position: "topright" });
info.onAdd = function (map) {
  this._div = L.DomUtil.create("div", "info");
  this.update();
  return this._div;
};
// method that we will use to update the control based on feature properties passed
info.update = function (props) {
  let gangs = "";
  if (props && props.gangs && props.gangs.length) {
    props.gangs.forEach((g) => {
      gangs += g + ", ";
    });
    gangs = gangs.substring(0, gangs.length - 2);
  }
  let text = !props ? "Hover over an area" : `<b>${props.name}</b><br>${props.desc}<br><b>Gangs</b>: ${gangs}`;
  this._div.innerHTML = "<h4>Districts</h4>" + text;
};
info.addTo(map);
// ************** end tiles

// ***** Gangs
var GangsControl = L.Control.extend({
  onAdd: function (map) {
    var div = L.DomUtil.create("div", "leaflet-bar leaflet-control");
    let innerStr = `<select id="gangSelect">    
           <option value="">Select a gang</option>`;
    gangs.gangs.map((f) => (innerStr += `<option value="${f.name}">${f.name}</option>`)).join("");
    innerStr += `</select>`;
    div.innerHTML = innerStr;
    div.style.background = "white";
    div.style.padding = "5px";
    L.DomEvent.disableClickPropagation(div);
    return div;
  },
});
map.addControl(new GangsControl({ position: "bottomright" }));
document.getElementById("gangSelect").addEventListener("change", function (e) {
  let selectedName = e.target.value;
  geojsonLayer.getLayers().forEach((layer) => {
    if (layer.feature.properties.gangs) {
      layer.setStyle({ color: "#000", fillOpacity: 0 });
      if (selectedName && ~layer.feature.properties.gangs.indexOf(selectedName)) {
        layer.setStyle({ color: "red", fillOpacity: 0.3 });
      }
    }
  });
  gangsBox.update(selectedName);
});
var gangsBox = L.control({ position: "topright" });
gangsBox.onAdd = function (map) {
  this._div = L.DomUtil.create("div", "gangsBox");
  this.update();
  return this._div;
};
gangsBox.update = function (name) {
  gang = gangs.gangs.filter((g) => {
    return g.name === name;
  })[0];
  let text = !name ? "Select the gang" : `<b>${gang.name}</b><br>${gang.desc}<hr><b>${gang.nameRu}</b><br>${gang.descRu}`;
  this._div.innerHTML = "<h4>Gang</h4>" + text;
};
gangsBox.addTo(map);

// ***** end Gangs

var linkToPoi = L.control({ position: "bottomleft" });
linkToPoi.onAdd = () => {
  this._div = L.DomUtil.create("div", "info");
  this._div.innerHTML = "<h4>All POI</h4><a href='../poi.html'>All points with descriptions</a><br>Desktop only...";
  return this._div;
};
linkToPoi.addTo(map);

map.on("zoomend", function () {
  let paneClass = document.getElementsByClassName("leaflet-marker-pane")[0];
  var curZoom = map.getZoom();
  paneClass.setAttribute("class", `leaflet-pane leaflet-marker-pane zoom${curZoom}`);
});

function toPoi() {
  let params = window.location.search ? window.location.search.substring(1).split("&") : null;
  if (params && params.length == 2) {
    let lat = params[0].split("=")[1];
    let lng = params[1].split("=")[1];
    map.flyTo([lat, lng], 1);
  }
}
map.whenReady(toPoi);

// Устанавливаем границы карты (соответствуют изображению)
map.fitBounds(bounds);

// **********************************************************

// map.on("baselayerchange", function (e) {
//   currentLayerID = e.layer._leaflet_id;
//   layerControl.remove();
//   if (currentLayerID !== poiLayerId) {
//     layerControl = L.control.layers(null, {});
//     layerControl.addTo(map);
//     for (const key in groups) {
//       if (Object.prototype.hasOwnProperty.call(groups, key) && groups[key]) {
//         const element = groups[key];
//         map.removeLayer(element);
//       }
//     }
//   } else {
//     layerControl = L.control.layers(null, groups);
//     layerControl.addTo(map);
//     for (const key in groups) {
//       if (Object.prototype.hasOwnProperty.call(groups, key)) {
//         const element = groups[key];
//         map.addLayer(element);
//       }
//     }
//   }
// });
