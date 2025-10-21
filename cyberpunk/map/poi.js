let poiList = document.querySelector("#poi tbody");
let sortTalbe = document.getElementById("sortTalbe");
let poiContent = document.getElementById("poiContent");

sortedPoi = (param) => {
  let sortedPoiList = [];
  switch (param) {
    case "label":
      sortedPoiList = poi
        .sort(function (a, b) {
          let al = a.label.substring(0, 1);
          let bl = b.label.substring(0, 1);
          return al > bl ? 1 : al < bl ? -1 : 0;
        })
        .sort(function (a, b) {
          let al = a.label.substring(0, 1);
          let bl = b.label.substring(0, 1);
          let an = Number(a.label.substring(1));
          let bn = Number(b.label.substring(1));
          if (al === bl) return an > bn ? 1 : an < bn ? -1 : 0;
        });
      return sortedPoiList;
    case "nameRu":
      sortedPoiList = poi.sort(function (a, b) {
        if (a.nameRu > b.nameRu) return 1;
        if (a.nameRu < b.nameRu) return -1;
        if (a.nameRu === b.nameRu) return 0;
      });
      return sortedPoiList;
    case "name":
      sortedPoiList = poi.sort(function (a, b) {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        if (a.name === b.name) return 0;
      });
      return sortedPoiList;

    case "type":
      sortedPoiList = poi.sort(function (a, b) {
        if (a.type > b.type) return 1;
        if (a.type < b.type) return -1;
        if (a.type === b.type) return 0;
      });
      return sortedPoiList;

    case "district":
      sortedPoiList = poi.sort(function (a, b) {
        if (a.district > b.district) return 1;
        if (a.district < b.district) return -1;
        if (a.district === b.district) return 0;
      });
      return sortedPoiList;

    default:
      sortedPoiList = poi
        .sort(function (a, b) {
          let al = a.label.substring(0, 1);
          let bl = b.label.substring(0, 1);
          return al > bl ? 1 : al < bl ? -1 : 0;
        })
        .sort(function (a, b) {
          let al = a.label.substring(0, 1);
          let bl = b.label.substring(0, 1);
          let an = Number(a.label.substring(1));
          let bn = Number(b.label.substring(1));
          if (al === bl) return an > bn ? 1 : an < bn ? -1 : 0;
        });
      return sortedPoiList;
  }
};

showTable = (param) => {
  poiList.replaceChildren();
  sortedPoi(param).forEach((p) => {
    let article = document.createElement("tr");
    let label = document.createElement("td");
    label.innerText = p.label;
    let nameRu = document.createElement("td");
    nameRu.innerText = p.nameRu;
    if (p.nameRu.length > 37) nameRu.setAttribute("name", p.nameRu);
    let name = document.createElement("td");
    name.innerText = p.name;
    if (p.name.length > 37) name.setAttribute("name", p.name);
    let type = document.createElement("td");
    type.innerText = p.type.replace("Data Pack:", "DP:");
    let district = document.createElement("td");
    district.innerText = p.district;

    article.append(label);
    article.append(nameRu);
    article.append(name);
    article.append(type);
    article.append(district);
    poiList.append(article);

    article.addEventListener("click", () => {
      poiContent.replaceChildren();
      let box = document.createElement("div");
      let title = document.createElement("h4");
      title.innerText = p.nameRu;
      let icon = document.createElement("span");
      if (p.type && types[p.type]) {
        icon.classList.add("ic");
        icon.classList.add(types[p.type].icon);
        icon.innerText = p.label;
        title.prepend(icon);
      }
      let type = document.createElement("div");
      type.classList.add("poi-type");
      type.innerText = p.type;
      let titleEn = document.createElement("div");
      titleEn.classList.add("poi-name");
      titleEn.innerText = p.name;
      let location = document.createElement("div");
      location.classList.add("poi-location");
      let area = document.createElement("div");
      area.classList.add("poi-area");
      area.innerText = p.area;
      let district = document.createElement("div");
      district.classList.add("poi-district");
      district.innerText = p.district;
      location.append(area);
      location.append(district);
      box.append(title);
      box.append(titleEn);
      console.log(p.y && p.x);
      if (p.y && p.x) {
        console.log("true");
        let link = document.createElement("div");
        link.classList.add("poi-link");
        link.innerHTML = `<a href="map/index.html?lat=${p.y}&lng=${p.x}">На карте >></a>`;
        box.append(link);
      }
      box.append(type);
      box.append(location);
      if (p.oldlabel) {
        let oldlabel = document.createElement("div");
        oldlabel.classList.add("poi-oldlabel");
        oldlabel.innerHTML = `number from the poster: ${p.oldlabel}`;
        box.append(oldlabel);
      }
      if (p.descRu) {
        let desc = document.createElement("div");
        desc.classList.add("poi-desc");
        desc.innerHTML = p.descRu;
        box.append(desc);
      } else if (p.desc) {
        let desc = document.createElement("div");
        desc.classList.add("poi-desc");
        desc.innerHTML = p.descRu;
        box.append(desc);
      }

      if (p.safety) {
        let safety = document.createElement("div");
        safety.classList.add("poi-safety");
        safety.innerText = "Безопасность: " + p.safety;
        box.append(safety);
      }
      if (p.rent) {
        let rent = document.createElement("div");
        rent.classList.add("poi-rent");
        rent.innerText = "Аренда: " + p.rent;
        box.append(rent);
      }

      poiContent.append(box);
    });
  });
};

showTable("");

sortTalbe.childNodes.forEach((el) => {
  if (el.tagName === "TD" && el.dataset.param) {
    el.addEventListener("click", () => {
      showTable(el.dataset.param);
    });
  }
});

// let poiContent = document.getElementById("poiContent");
// poi.forEach((p) => {
//   let article = document.createElement("article");

//   let title = document.createElement("h4");
//   title.innerText = p.nameRu;

//   let icon = document.createElement("span");
//   if (p.type && types[p.type]) {
//     icon.classList.add("ic");
//     icon.classList.add(types[p.type].icon);
//     icon.innerText = p.label;
//     title.prepend(icon);
//   }
//   article.append(title);

//   let desc = document.createElement("div");
//   desc.innerHTML = p.descRu || "";
//   article.append(desc);

//   //poiContent.append(article);
// });
