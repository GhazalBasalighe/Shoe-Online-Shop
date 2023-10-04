import generateProducts from "./generateProducts.js";
document.addEventListener("DOMContentLoaded", () => {
  generateProducts();
});

const pageTitle = document.querySelector("#filter-name");
console.log(pageTitle.textContent);
const url = new URLSearchParams(window.location.href);
url.set("filter", "");
console.log(url);
