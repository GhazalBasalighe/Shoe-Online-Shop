const loadMore = document.querySelector("#more");
const categoryContainer = document.querySelector("#categories");
const filterContainer = document.querySelector("#filters");
import generateProducts from "./generateProducts.mjs";
import redirectDetails from "./redirect.mjs";
import addFilledIcons from "./changeIcons.mjs";

const data = [
  {
    name: "Gucci",
    alt: "gucci",
    src: "../assets/icons/gucci.png",
  },
  {
    name: "Vans",
    alt: "vans",
    src: "../assets/icons/vans.png",
  },
  {
    name: "Skechers",
    alt: "skechers",
    src: "../assets/icons/skechers.png",
  },
];

//------ADDING MORE BRANDS-------
loadMore.addEventListener("click", () => {
  loadMore.remove();
  data.forEach((brand) => {
    //adding to categories
    const newCategory = `
                <div class="grid-item flex flex-col justify-center items-center">
                    <div class="bg-categoryBg flex items-center justify-center rounded-full w-[45px] h-[45px]">
                        <img src="${brand.src}" alt="${brand.alt}" class="category-item">
                    </div>
                    <span class="truncate">${brand.name}</span>
                </div>
        `;
    categoryContainer.insertAdjacentHTML("beforeend", newCategory);
    //adding to filters
    const newFilter = `
                <span class="rounded-full border-2 inline-block px-4 py-1 mr-2">${brand.name}</span>
    `;
    filterContainer.insertAdjacentHTML("beforeend", newFilter);
  });
});

//------ADDING PRODUCT CARDS-------
await generateProducts();

//------ACTIVE FILTER-------
filterContainer.addEventListener("click", (e) => {
  //adding active class ui
  if (e.target.classList.contains("filter")) {
    //redirect to products page
    const text = e.target.textContent;
    const newUrl = `http://127.0.0.1:5500/views/products.html?filter=${text}`;
    location.assign(newUrl);
    const filters = filterContainer.querySelectorAll(".filter");
    filters.forEach((filter) => {
      filter.classList.remove("active");
    });
    e.target.classList.add("active");
  }
  TODO: console.log("do it");
  //rendering data accordingly
});

//------ACTIVE NAVBAR SECTION-------
const navBar = document.querySelector("#nav-bar");
navBar.addEventListener("click", addFilledIcons);

//------PRODUCT DETAILS REDIRECT-------
const productsContainer = document.querySelector("#products");
productsContainer.addEventListener("click", redirectDetails());

const productsURL = "http://127.0.0.1:5500/views/products.html";
categoryContainer.addEventListener("click", redirectDetails(productsURL));

//------SEARCH BAR REDIRECT-------
const searchBar = document.querySelector("#search");
searchBar.addEventListener(
  "focus",
  () => (window.location.href = "../views/search.html")
);
