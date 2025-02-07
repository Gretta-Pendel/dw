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
let areas = [];
let groups = {};
let gangsGroups = {};
let areasData = { type: "FeatureCollection", features: [] };
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
poiLayerId = poiLayer._leaflet_id;
gangsLayerId = gangsLayer._leaflet_id;
// ***** POI
const getPOI = () => {
  poi.forEach((area) => {
    area.districts.forEach((d, i) => {
      var _districts = [];
      d.locations.forEach((l) => {
        if (l.x && l.y) {
          var myIcon = L.divIcon({ className: "label-icon", html: l.label });
          const marker = L.marker([l.y, l.x], { icon: myIcon }).addTo(map);
          let desc = l.descRu ? l.desc + "<hr>" + l.descRu : l.desc;
          let name = l.nameRu ? l.name + " | " + l.nameRu : l.name;
          marker.bindTooltip(name).openTooltip();
          marker.bindPopup(desc).openPopup();
          _districts.push(marker);
        }
      });
      let districtGroup = L.layerGroup(_districts);
      groups["<b>" + d.letter + "</b> " + d.district] = districtGroup;
      districtGroup.addTo(map);
    });
  });
};
getPOI();
// ***** end POI
var layerControl = L.control.layers(baseMaps, groups);
layerControl.addTo(map);
map.on("baselayerchange", function (e) {
  currentLayerID = e.layer._leaflet_id;
  layerControl.remove();
  if (currentLayerID !== poiLayerId) {
    layerControl = L.control.layers(baseMaps, {});
    layerControl.addTo(map);
    for (const key in groups) {
      if (Object.prototype.hasOwnProperty.call(groups, key) && groups[key]) {
        const element = groups[key];
        map.removeLayer(element);
      }
    }
  } else {
    layerControl = L.control.layers(baseMaps, groups);
    layerControl.addTo(map);
    for (const key in groups) {
      if (Object.prototype.hasOwnProperty.call(groups, key)) {
        const element = groups[key];
        map.addLayer(element);
      }
    }
  }
});

// ***** tiles
var tiles = L.tileLayer(mapUrl, {
  maxZoom: 3,
}).addTo(map);
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
poi.forEach((area, index) => {
  let _area = {
    type: "Feature",
    id: "area_" + index,
    properties: {
      name: area.area,
      desc: area.areaDesc,
    },
    geometry: !area.geometry || Object.keys(area.geometry).length === 0 ? emptyG : area.geometry,
  };
  areasData.features.push(_area);
  area.districts.forEach((district) => {
    let _district = {
      type: "Feature",
      id: "district_" + district.letter,
      properties: {
        name: district.district,
        desc: district.districtDesc,
        gangs: district.gangsPresent,
      },
      geometry: !district.geometry || Object.keys(district.geometry).length === 0 ? emptyG : district.geometry,
    };
    areasData.features.push(_district);
  });
});
var geojsonLayer = L.geoJson(areasData, { style: style }).addTo(map);
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
geojson = L.geoJson(areasData, {
  style: style,
  onEachFeature: onEachFeature,
}).addTo(map);
var info = L.control({ position: "topleft" });
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
var legend = L.control({ position: "bottomleft" });
legend.onAdd = function (map) {
  var div = L.DomUtil.create("div", "info legend");
  // loop through our density intervals and generate a label with a colored square for each interval
  div.innerHTML += "";
  return div;
};
legend.addTo(map);
// ************** end tiles

// ***** Gangs
const getGangs = () => {
  var _gangs = [];
  gangs.gangs.forEach((d) => {
    const marker = L.marker([0, 0]).addTo(map);
    marker.bindTooltip(d.name).openTooltip();
    marker.bindPopup(d.name).openPopup();
    //console.log(d);
    // d.locations.forEach((l) => {
    //   var myIcon = L.divIcon({ className: "label-icon", html: l.label });
    //   const marker = L.marker([l.y, l.x], { icon: myIcon }).addTo(map);
    //   let desc = l.descRu ? l.desc + "<hr>" + l.descRu : l.desc;
    //   let name = l.nameRu ? l.name + " | " + l.nameRu : l.name;
    //   marker.bindTooltip(name).openTooltip();
    //   marker.bindPopup(desc).openPopup();
    //   _districts.push(marker);
    // });
    _gangs.push(marker);
    let gangGroup = L.layerGroup(_gangs);
    gangsGroups["<b>" + d.name + "</b> "] = gangGroup;
    gangGroup.addTo(map);
  });
};
getGangs();
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
      console.log(selectedName);
      console.log(layer.feature.properties);
      console.log(layer.feature.properties.gangs.indexOf(selectedName));
      layer.setStyle({ color: layer.feature.properties.color, fillOpacity: 0.5 });
      if (selectedName && ~layer.feature.properties.gangs.indexOf(selectedName)) {
        layer.setStyle({ color: "red", fillOpacity: 0.3 });
      }
    }
  });
});
// ***** end Gangs

// Устанавливаем границы карты (соответствуют изображению)
map.fitBounds(bounds);
