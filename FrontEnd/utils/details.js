import fetchData from "./request.mjs";
import handleQuantityChange from "./quantity.mjs";

// Initialize the total price based on the default quantity
handleQuantityChange();

//---------FETCH SHOE DATA AND UPDATE SHOE NAME--------
async function initializePage() {
  const shoeName = document.querySelector("#shoe-name");
  const urlSearchParams = new URLSearchParams(window.location.search);
  const filterParam = +urlSearchParams.get("id");

  try {
    const shoeData = await fetchData(`?id=${filterParam}`);
    if (shoeData && shoeData.length > 0) {
      shoeName.textContent = shoeData[0].name;
    }
  } catch (error) {
    console.error("Error fetching shoe data:", error);
  }
}

// Call the initializePage function to fetch data and set shoe name
initializePage();

//------ADD TO CART BUTTON--------
const addToCart = document.querySelector("#cart-btn");
addToCart.addEventListener("click", () => {
  window.location.href = "../views/myCart.html";
});

//------PAGINATION--------
const pagination = document.querySelector("#app");
const buttons = pagination.querySelectorAll(".button");

function toggleActiveClass(event) {
  const targetButton = event.target;

  if (!targetButton.classList.contains("active")) {
    buttons.forEach((button) => button.classList.remove("active"));
    targetButton.classList.add("active");
  }
}

pagination.addEventListener("click", toggleActiveClass);
