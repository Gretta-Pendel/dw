let cols = document.getElementsByClassName("collapse");
for (let i = 0; i < cols.length; i++) {
  let block = cols[i].nextElementSibling;
  cols[i].addEventListener("click", (event) => {
    block.style.display === "none" || block.style.display === "" ? (block.style.display = "block") : (block.style.display = "none");
  });
}

let nav = document.querySelector("nav");
let main = document.querySelector("main");
let mmopen = document.querySelector("nav .menu span");
let mmenu = document.getElementById("mmenu");
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

// set ids
let h2s = document.querySelectorAll("main h2");
let h3s = document.querySelectorAll("main h3");
let h4s = document.querySelectorAll("main h4");
let h5s = document.querySelectorAll("main h5");

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
      let y = document.getElementById(item.id).offsetTop - 65;
      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
      window.history.pushState(null, null, `#${item.id}`);
    }
  });
  mmenu.appendChild(sLi);
});
