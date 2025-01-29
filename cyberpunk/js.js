let nav = document.querySelector("nav");
let main = document.querySelector("main");
let mmopen = document.querySelector("header .menu span");
let mmenu = document.getElementById("mmenu");
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

levels.forEach((item) => {
  let sLi = document.createElement("div");
  sLi.setAttribute("class", item.tagName.toLowerCase());
  let sLink = document.createElement("a");
  let text = ~item.innerText.indexOf("Таблица ") ? item.innerText.split("Таблица ")[1] : item.innerText;
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
      if (window.innerWidth > 768) {
        mmenu.style.display = "block";
        nav.style.height = "auto";
      } else {
        mmenu.style.display = "none";
        nav.style.height = "2.5rem";
      }
      window.history.pushState(null, null, `#${item.id}`);
    }
  });
  mmenu.appendChild(sLi);
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

mmopen.addEventListener("click", (event) => {
  if (mmenu.style.display === "none" || mmenu.style.display === "") {
    mmenu.style.display = "block";
    nav.style.height = mmenu.offsetHeight + 16 + "px";
  } else {
    mmenu.style.display = "none";
    nav.style.height = "2.5rem";
  }
});
window.addEventListener("resize", (event) => {
  let mmenu = document.getElementById("mmenu");
  window.innerWidth > 768 ? (mmenu.style.display = "block") : (mmenu.style.display = "none");
});

/* menu build */
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

/*let submenu = (parent, item) => {
  if (item.sections && item.sections.length) {
    // let itemLink = document.createElement("a");
    // itemLink.innerText = item.title;
    // itemLink.setAttribute("href", item.url + ".html");
    // parent.appendChild(itemLink);
    let sUl = document.createElement("ul");
    item.sections.forEach((s) => {
      let sUl = document.createElement("ul");
      let sLink = document.createElement("a");
      sLink.innerText = s.title;
      sLink.setAttribute("href", item.url + ".html#" + s.url);
      sLi.appendChild(sLink);
      submenu(sLi, s);
      sUl.appendChild(sLi);
    });
    parent.appendChild(sUl);
  }
};*/

/*menu.forEach((item) => {
  //let opener = document.createElement("span");
  //opener.innerText = "🔻";
  if (pageurl == item.url) {
    let itemLi = document.createElement("div");
    // let itemLink = document.createElement("a");
    // itemLink.innerText = item.title;
    // itemLink.setAttribute("href", item.url + ".html");
    // itemLi.appendChild(itemLink);
    submenu(itemLi, item);
    // if (item.sections && item.sections.length) {
    //   let sUl = document.createElement("ul");
    //   item.sections.forEach((s) => {
    //     let sLi = document.createElement("li");
    //     let sLink = document.createElement("a");
    //     sLink.innerText = s.title;
    //     sLink.setAttribute("href", item.url + ".html#" + s.url);
    //     sLi.appendChild(sLink);
    //     sUl.appendChild(sLi);
    //   });
    //   itemLi.appendChild(sUl);
    // }
    mmenu.appendChild(itemLi);
  }
  // let itemLi = document.createElement("li");
  // let itemLink = document.createElement("a");
  // itemLink.innerText = item.title;
  // itemLink.setAttribute("href", item.url + ".html");
  // if (pageurl == item.url) {
  //   itemLink.setAttribute("class", "active");
  // }
  // //itemLi.appendChild(opener);
  // itemLi.appendChild(itemLink);
  // if (item.sections && item.sections.length) {
  //   let sUl = document.createElement("ul");
  //   item.sections.forEach((s) => {
  //     let sLi = document.createElement("li");
  //     let sLink = document.createElement("a");
  //     sLink.innerText = s.title;
  //     sLink.setAttribute("href", item.url + ".html#" + s.url);
  //     sLi.appendChild(sLink);
  //     sUl.appendChild(sLi);
  //   });
  //   itemLi.appendChild(sUl);
  // }
  // menuList.appendChild(itemLi);

  //opener.addEventListener("click", () => {  });
});*/

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

/*window.addEventListener("scroll", () => {
  if (document.location.hash && document.getElementById(document.location.hash.split("#")[1])) {
    window.scrollTo({
      top: document.getElementById(document.location.hash.split("#")[1]).offsetTop - 36,
      behavior: "smooth",
    });
  }
});*/
