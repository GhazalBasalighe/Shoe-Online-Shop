const loadMore = document.querySelector("#more");
const categoryContainer = document.querySelector("#categories");
const filterContainer = document.querySelector("#filters");

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
document.addEventListener("DOMContentLoaded", () => {
  generateProducts();
});

const productContainer = document.querySelector("#products");
async function generateProducts() {
  const request = await fetch("http://localhost:3000/shoes");
  const shoes = await request.json();
  shoes.forEach((shoe) => {
    const newShoe = `
    <div class="grid-item card border-0 rounded-lg">
                <img src="${shoe.profile}" alt="Shoe" class="card-img-top bg-[#F3F3F3] rounded-xl">
                <div class="card-body p-0">
                    <div class="card-title truncate text-base font-bold mb-0 mt-2">${shoe.name}</div>
                    <div class="card-text font-semibold text-sm">$ ${shoe.price}.00</div>
                </div>
            </div>
    `;
    productContainer.insertAdjacentHTML("beforeend", newShoe);
  });
}

//------ACTIVE FILTER-------
filterContainer.addEventListener("click", (e) => {
  //adding active class ui
  if (e.target.classList.contains("filter")) {
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
const navItems = navBar.querySelectorAll(".nav-item");

navBar.addEventListener("click", addFilledIcons);

function addFilledIcons(e) {
  const targetNavItem = e.target.closest(".nav-item");

  if (targetNavItem) {
    // Loop through all navigation items and reset their icons to normal state
    navItems.forEach((navItem) => {
      const icon = navItem.querySelector("i");
      if (icon) {
        const behavior = navItem.getAttribute("data-behavior");
        switch (behavior) {
          case "home":
            $(icon)
              .removeClass("bi-house-door-fill")
              .addClass("bi-house-door");
            break;
          case "cart":
            $(icon).removeClass("bi-bag-fill").addClass("bi-bag");
            break;
          case "orders":
            $(icon).removeClass("bi-cart-fill").addClass("bi-cart");
            break;
          case "wallet":
            $(icon).removeClass("bi-wallet-fill").addClass("bi-wallet");
            break;
          case "profile":
            $(icon).removeClass("bi-person-fill").addClass("bi-person");
            break;
        }
      }
    });

    const behavior = targetNavItem.getAttribute("data-behavior");
    const icon = targetNavItem.querySelector("i");
    if (icon) {
      switch (behavior) {
        case "home":
          $(icon).toggleClass("bi-house-door-fill bi-house-door");
          break;
        case "cart":
          $(icon).toggleClass("bi-bag-fill bi-bag");
          break;
        case "orders":
          $(icon).toggleClass("bi-cart-fill bi-cart");
          break;
        case "wallet":
          $(icon).toggleClass("bi-wallet-fill bi-wallet");
          break;
        case "profile":
          $(icon).toggleClass("bi-person-fill bi-person");
          break;
      }
    }
  }
}
