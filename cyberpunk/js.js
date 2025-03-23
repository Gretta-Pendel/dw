let nav = document.querySelector("nav");
let main = document.querySelector("main");
let mmopen = document.querySelector("header .menu span");
let mmenu = document.getElementById("mmenu");
let tmenu = document.getElementById("tmenu");
let alltablesBox = document.getElementById("alltables");
let menuTop = document.querySelector(".menu>div");
let pageurl = document.location.pathname.split("/")[document.location.pathname.split("/").length - 1].slice(0, -5);
let pagetitle = menu.find((el) => {
  return el.url == "chars";
})
  ? menu.find((el) => {
      return el.url == "chars";
    }).title
  : "Rules";

// set ids
let h1s = document.querySelectorAll("main h1");
let h2s = document.querySelectorAll("main h2");
let h3s = document.querySelectorAll("main h3");
let h4s = document.querySelectorAll("main h4");
let h5s = document.querySelectorAll("main h5, main .char h5");

if (h1s && h1s.length) {
  for (let index = 0; index < h1s.length; index++) {
    if (!h1s[index].id) h1s[index].id = "h1_" + index;
  }
}
if (h2s && h2s.length) {
  for (let index = 0; index < h2s.length; index++) {
    if (!h2s[index].id) h2s[index].id = "h2_" + index;
  }
}
if (h3s && h3s.length) {
  for (let index = 0; index < h3s.length; index++) {
    if (!h3s[index].id) h3s[index].id = "h3_" + index;
  }
}
if (h4s && h4s.length) {
  for (let index = 0; index < h4s.length; index++) {
    if (!h4s[index].id) h4s[index].id = "h4_" + index;
  }
}
if (h5s && h5s.length) {
  for (let index = 0; index < h5s.length; index++) {
    if (!h5s[index].id) h5s[index].id = "h5_" + index;
  }
}

let levels = [];
for (let index = 0; index < main.children.length; index++) {
  const el = main.children[index];
  if (["H1", "H2", "H3", "H4", "H5"].includes(el.tagName)) {
    levels.push(el);
  } else if (el.tagName === "DIV" && el.children.length) {
    for (let i = 0; i < el.children.length; i++) {
      const e = el.children[i];
      if (["H1", "H2", "H3", "H4", "H5"].includes(e.tagName)) {
        levels.push(e);
      }
    }
  }
}
if (document.querySelectorAll("main .char h5").length) {
  for (let index = 0; index < document.querySelectorAll("main h5, main .char h5").length; index++) {
    levels.push(document.querySelectorAll("main .char h5")[index]);
  }
}
const menuResize = (m) => {
  window.addEventListener("resize", (event) => {
    if (m && window.innerWidth > 768) {
      m.style.display = "block";
      nav.style.height = "auto";
    } else if (m) {
      m.style.display = "none";
      nav.style.height = "2.5rem";
    }
  });
};

const sideMenu = (m) => {
  mmopen.addEventListener("click", (event) => {
    if ((m && m.style.display === "none") || m.style.display === "") {
      m.style.display = "block";
      nav.style.height = m.offsetHeight + 16 + "px";
    } else {
      m.style.display = "none";
      nav.style.height = "2rem";
    }
  });
  menuResize(m);
};
mmenu ? sideMenu(mmenu) : undefined;
tmenu ? sideMenu(tmenu) : undefined;

levels.forEach((item) => {
  let sLi = document.createElement("div");
  sLi.setAttribute("class", item.tagName.toLowerCase());
  let sLink = document.createElement("a");
  let text = ~item.innerText.indexOf("Таблица ") ? item.innerText.split("Таблица ")[1] : item.hasAttribute("title") && item.getAttribute("title").length ? item.getAttribute("title") : item.innerText;
  text = text.replace(" — ", ": ");
  sLink.innerText = text;
  sLink.setAttribute("href", `#${item.id}`);
  sLi.appendChild(sLink);
  sLink.addEventListener("click", (ev) => {
    if (document.getElementById(item.id)) {
      ev.preventDefault();
      let y = document.getElementById(item.id).offsetTop - 36;
      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
      mmenu ? menuResize(mmenu) : undefined;
      window.history.pushState(null, null, `#${item.id}`);
    }
  });
  if (mmenu) mmenu.appendChild(sLi);
});

let a = document.querySelectorAll("a");
a.forEach((link) => {
  if (link.getAttribute("href").startsWith("#")) {
    let id = link.getAttribute("href").split("#")[1];
    link.addEventListener("click", (ev) => {
      if (document.getElementById(id)) {
        ev.preventDefault();
        let y = document.getElementById(id).offsetTop - 36;
        window.scrollTo({
          top: y,
          behavior: "smooth",
        });
        window.history.pushState(null, null, `#${id}`);
      }
    });
  }
});

/* menu build */
if (menuTop) {
  menu.forEach((item) => {
    var url = item.url ? item.url : item.page;
    var itembox = document.createElement("div");
    itembox.className = "submenu";
    let itemLink = document.createElement("a");
    itemLink.innerText = item.title;
    itemLink.setAttribute("href", url + ".html");
    if (pageurl == item.url) {
      itemLink.setAttribute("class", "active");
    }
    itembox.appendChild(itemLink);
    if (item.sections && item.sections.length) {
      let sUl = document.createElement("ul");
      item.sections.forEach((s) => {
        let sLi = document.createElement("li");
        let sLink = s.url ? document.createElement("a") : document.createElement("span");
        sLink.innerText = s.title;
        if (s.url) sLink.setAttribute("href", url + ".html#" + s.url);
        if (url === item.url) {
          sLink.addEventListener("click", (ev) => {
            if (document.getElementById(s.url)) {
              ev.preventDefault();
              let y = document.getElementById(s.url).offsetTop - 36;
              window.scrollTo({
                top: y,
                behavior: "smooth",
              });
              window.history.pushState(null, null, `#${s.url}`);
            }
          });
        }
        sLi.appendChild(sLink);
        sUl.appendChild(sLi);
      });
      itembox.appendChild(sUl);
      itembox.addEventListener("mouseover", () => {
        sUl.style.display = "block";
      });
      itembox.addEventListener("mouseout", () => {
        sUl.style.display = "none";
      });
    }
    menuTop.appendChild(itembox);
  });
}

let getSection = (page) => {
  let _pages = menu.filter((m) => {
    return m.url.replace("-", "") === page;
  });
  if (_pages.length) return _pages[0].title;
  return page;
};

/* tables menu build */
if (typeof alltables !== "undefined" && typeof pages !== "undefined" && tmenu && alltablesBox) {
  pages.forEach((item) => {
    let pageBox = document.createElement("div");
    pageBox.className = "side-menu-box";
    pageBox.dataset.page = item;
    let itembox = document.createElement("div");
    itembox.classList.add("h2", "closed");
    itembox.innerText = " " + getSection(item);
    tmenu.appendChild(itembox);
    tmenu.appendChild(pageBox);
    itembox.addEventListener("click", (e) => {
      if (pageBox.style.display === "block") {
        pageBox.style.display = "none";
        itembox.classList.add("closed");
      } else {
        pageBox.style.display = "block";
        itembox.classList.remove("closed");
      }
    });
  });
  alltables.forEach((item) => {
    if (~pages.indexOf(item.page) && !item.data && item.data !== "example") {
      let pageBoxDiv = document.querySelector(`.side-menu-box[data-page=${item.page}]`);
      if (pageBoxDiv) {
        let itembox = document.createElement("div");
        itembox.className = "submenu";
        let itemLink = document.createElement("a");
        itemLink.innerText = item.name;
        itemLink.setAttribute("href", "#" + item.id);
        itembox.appendChild(itemLink);
        pageBoxDiv.appendChild(itembox);
        itemLink.addEventListener("click", (ev) => {
          if (document.getElementById(item.id)) {
            ev.preventDefault();
            let y = document.getElementById(item.id).offsetTop - 36;
            window.scrollTo({
              top: y,
              behavior: "smooth",
            });
            window.history.pushState(null, null, `#${item.id}`);
          }
        });
      }
    }
  });
  pages.forEach((p) => {
    let itembox = document.createElement("h4");
    itembox.innerText = " " + getSection(p);
    alltablesBox.appendChild(itembox);
    let pageTablesBox = document.createElement("div");
    alltables.forEach((item) => {
      if (item.page === p && !item.data && item.data !== "example") {
        let tablebox = document.createElement("div");
        tablebox.classList.add("tableBox");
        tablebox.innerHTML = item.table;
        pageTablesBox.appendChild(tablebox);
      }
    });
    alltablesBox.appendChild(pageTablesBox);
    itembox.addEventListener("click", (e) => {
      if (pageTablesBox.style.display === "block" || pageTablesBox.style.display === "") {
        pageTablesBox.style.display = "none";
        itembox.classList.add("closed");
      } else {
        pageTablesBox.style.display = "block";
        itembox.classList.remove("closed");
      }
    });
  });
}

// insert tables        <div data-insert-table="char_1"></div>
let tableDiv = document.getElementsByTagName("div");
let tableDivArray = [...tableDiv].filter((d) => d.dataset.insertTable);
const insertTable = (tableId) => {
  if (typeof alltables !== "undefined") {
    let item = alltables.filter((t) => t.table && t.id === tableId)[0];
    if (item) {
      let tablebox = document.createElement("div");
      tablebox.classList.add("tableBox");
      tablebox.innerHTML = item.table;
      return tablebox;
    }
  }
};
tableDivArray.forEach((a) => {
  let tableId = a.dataset.insertTable;
  a.append(insertTable(tableId));
});

//🔻🔺

let cols = document.getElementsByClassName("collapse");
for (let i = 0; i < cols.length; i++) {
  let block = cols[i].nextElementSibling;
  cols[i].addEventListener("click", (event) => {
    block.style.display === "none" || block.style.display === "" ? (block.style.display = "block") : (block.style.display = "none");
  });
}

document.addEventListener("DOMContentLoaded", (event) => {
  document.title = "Cyberpunk | " + pagetitle;
});
window.addEventListener("load", () => {
  if (document.location.hash && document.getElementById(document.location.hash.split("#")[1])) {
    window.scrollTo({
      top: document.getElementById(document.location.hash.split("#")[1]).offsetTop - 36,
      behavior: "smooth",
    });
  }
});

// footer
const footer = document.createElement("footer");
footer.innerHTML = `<a href="short.html">Short</a> | <a href="tables.html">Tables</a> | <a href="poi.html">POI</a> | <a href="start.html">Start</a>`;
pageurl !== "poi" ? main.after(footer) : undefined;
// dictionary
// let sections = {
//   "char":"Персонаж", "combat":"Бой", "economy":"Экономика", "life":"", "netrunning":"", "nightcity":"", "poiList":"", "roles":"", "skills":"", "start":"", "traumateam":""
// }
