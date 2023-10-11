import generateProducts from "./generateProducts.mjs";
import redirectDetails from "./redirect.mjs";
import fetchData from "./request.mjs";

setTitle();

//-------SETTING THE TITLE OF PAGE---------
function setTitle() {
  const pageTitle = document.querySelector("#filter-name");
  const urlSearchParams = new URLSearchParams(window.location.search);
  const filterParam = urlSearchParams.get("filter");
  pageTitle.textContent = filterParam;
  if (filterParam == "All") {
    generateProducts();
    return;
  }
  filterProducts(filterParam);
}

//-----FILTER PRODUCTS BASED ON CHOSEN FILTER------
async function filterProducts(text) {
  const shoes = await fetchData();
  console.log(shoes);
  const filteredProducts = shoes.filter((shoe) =>
    shoe.name.includes(text)
  );
  generateProducts(filteredProducts);
}

//--------REDIRECT TO DETAILS FROM PRODUCTS-------
const productContainer = document.querySelector("#products");
productContainer.addEventListener("click", (e) => {
  if (e.target.closest(".grid-item")) {
    redirectDetails()(e);
  }
});
