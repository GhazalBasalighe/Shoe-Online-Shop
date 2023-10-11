import addFilledIcons from "./changeIcons.mjs";
import { redirectSearchPage } from "./redirect.mjs";
import {
  generateCartProducts,
  generateModals,
} from "./generateProducts.mjs";
import fetchData from "./request.mjs";

//------ACTIVE NAVBAR SECTION-------
const navBar = document.querySelector("#nav-bar");
navBar.addEventListener("click", addFilledIcons);

//------SEARCH iCON REDIRECT-------
redirectSearchPage();

//------SEARCH iCON REDIRECT-------
const checkoutBtn = document.querySelector("#cart-btn");
checkoutBtn.addEventListener(
  "click",
  () => (window.location.href = "../views/checkout.html")
);

//------RENDER CART ITEMS-------
await generateCartProducts();

//------COUNT TOTAL PRICE OF ALL-------
const totalAll = document.querySelector("#total-price-all");
function calculateTotalPrice() {
  const totalPriceElements = document.querySelectorAll("#total-price");
  let total = 0;

  totalPriceElements.forEach((priceElement) => {
    const parentGridItem = priceElement.closest(".grid-item");
    const quantityInput = parentGridItem.querySelector(".quantity input");
    priceElement.textContent =
      "$" + (85.0 * quantityInput.value).toFixed(2);
    const price = parseFloat(priceElement.textContent.replace("$", "")); // Assuming the price format is like "$99.99"
    total += price;
    totalAll.textContent = "$" + total.toFixed(2);
  });
}
calculateTotalPrice();

//------HANDLE QUANTITY CHANGE-------
const cartContainer = document.querySelector("#orders");
cartContainer.addEventListener("click", async (e) => {
  const gridItem = e.target.closest(".grid-item");
  const itemId = gridItem.dataset.id;

  const quantityInput = gridItem.querySelector(".quantity input");
  let quantity = +quantityInput.value;

  const nameElement = gridItem.querySelector(".name");
  const name = nameElement.textContent;
  const totalPrice = gridItem.querySelector(".total-price");
  await updatePriceAndTotal(name, quantity, totalPrice);

  if (e.target.classList.contains("bi-dash")) {
    if (quantity > 1) {
      quantityInput.value--;
      await updatePriceAndTotal(name, quantityInput.value, totalPrice);
    }
  }
  if (e.target.classList.contains("bi-plus")) {
    quantityInput.value++;
    await updatePriceAndTotal(name, quantityInput.value, totalPrice);
  }
  if (e.target.classList.contains("bi-trash")) {
    await generateModals(itemId, totalPrice.textContent, quantity);
    const blackOverlay = document.querySelector("#black-overlay");
    blackOverlay.classList.toggle("hidden");
  }
});

//------THE FUNCTION TO HANDLE QUANTITY CHANGE-------
async function updatePriceAndTotal(name, quantityInput, totalPrice) {
  const shoe = await fetchData(`?name=${name}`);
  console.log(shoe);
  const price = shoe[0].price;
  const quantity = parseInt(quantityInput, 10);

  const totalPriceValue = (price * quantity).toFixed(2);
  totalPrice.textContent = "$" + totalPriceValue;
  calculateTotalPrice();
}

//------REMOVE FROM CART MODAL-------
document.body.addEventListener("click", (e) => {
  if (e.target.id === "cancelRemoveBtn") {
    // CANCEL BUTTON CLICKED
    const modal = document.querySelector(".modal");
    modal.remove();
    const blackOverlay = document.querySelector("#black-overlay");
    blackOverlay.classList.add("hidden");
  } else if (e.target.id === "confirmRemoveBtn") {
    // CONFIRM BUTTON
    const modal = document.querySelector(".modal");
    modal.remove();

    // Get the grid-item associated with this modal
    const gridItemId = modal
      .querySelector(".grid-item")
      .getAttribute("data-id");
    const gridItem = document.querySelector(`[data-id="${gridItemId}"]`);
    gridItem.remove();
    sendDeleteRequest(+gridItemId);

    const blackOverlay = document.querySelector("#black-overlay");
    blackOverlay.classList.add("hidden");

    // Send a delete request here using gridItemId or any other necessary data
    // Example: sendDeleteRequest(gridItemId);
  }
});

async function sendDeleteRequest(gridItemId) {
  try {
    await fetch(`http://localhost:3000/cart/${gridItemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error.message);
  }
}
