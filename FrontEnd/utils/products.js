import generateProducts from "./generateProducts.js";
document.addEventListener("DOMContentLoaded", () => {
  generateProducts();
  setTitle();
});

//-------SETTING THE TITLE OF PAGE---------
function setTitle() {
  const pageTitle = document.querySelector("#filter-name");
  const urlSearchParams = new URLSearchParams(window.location.search);
  const filterParam = urlSearchParams.get("filter");
  pageTitle.textContent = filterParam;
}
