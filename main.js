const app = {
  pages: [],
  show: new Event("show"),
  init: function () {
    app.pages = document.querySelectorAll(".pages");
    app.pages.forEach((pg) => {
      pg.addEventListener("show", app.pageShown);
    });

    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", app.nav);
    });
    history.replaceState({}, "Home", "#home");
    window.addEventListener("hashchange", app.poppin);
  },
  nav: function (ev) {
    ev.preventDefault();
    let currentPage = ev.target.getAttribute("data-target");
    document.querySelector(".active").classList.remove("active");
    document.getElementById(currentPage).classList.add("active");
    console.log(currentPage);
    history.pushState({}, currentPage, `#${currentPage}`);
    document.getElementById(currentPage).dispatchEvent(app.show);
  },
  pageShown: function (ev) {
    console.log("Page", ev.target.id, "just shown");
  },
  poppin: function (ev) {
    console.log(location.hash, "popstate event");
  },
};
document.addEventListener("DOMContentLoaded", app.init);

// Upload your own img
document.querySelector("#myFileInput").addEventListener("change", function () {
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    localStorage.setItem("recent-image", reader.result);
  });

  reader.readAsDataURL(this.files[0]);
});

document.addEventListener("DOMContentLoaded", () => {
  const recentImageDataUrl = localStorage.getItem("recent-image");

  if (recentImageDataUrl) {
    document
      .querySelector("#imgPreview")
      .setAttribute("src", recentImageDataUrl);
  }
});

// local storage from
const inpKey = document.getElementById("inpKey");
const inpValue = document.getElementById("inpValue");
const btnInsert = document.getElementById("btnInsert");
const lsOutput = document.getElementById("lsOutput");

// when the buttun is clicked
btnInsert.onclick = function () {
  const key = inpKey.value;
  const value = inpValue.value;

  // if true (if someone writes something in the fields) then store it in local storage
  if (key && value) {
    localStorage.setItem(key, value);
    // when btn has been clicked the page will realoades and display the data
    location.reload();
  }
};
// looping through the key value pair and outputing them
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  const value = localStorage.getItem(key);

  lsOutput.innerHTML += `${key}: ${value}<br />`;
  localStorage.clear();
}
