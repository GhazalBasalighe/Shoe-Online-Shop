const quantityInput = document.querySelector("#quantityInput");
const totalPrice = document.querySelector("#total-price");
const decreaseBtn = document.querySelector("#decreaseBtn");
const increaseBtn = document.querySelector("#increaseBtn");
import fetchData from "./request.mjs";

quantityInput.addEventListener("input", () => {
  handleQuantityChange();
});

//---------
export default function handleQuantityChange() {
  const quantity = quantityInput.value;
  const urlSearchParams = new URLSearchParams(window.location.search);
  const filterParam = +urlSearchParams.get("id");

  // Fetch shoe data based on the filterParam
  fetchData(`?id=${filterParam}`).then((shoeData) => {
    if (shoeData && shoeData.length > 0) {
      const shoePrice = +shoeData[0].price;
      const totalPriceValue = (shoePrice * quantity).toFixed(2);
      totalPrice.textContent = "$" + totalPriceValue;
    }
  });
}

//--------EVENT FOR DECREASE AND INCREASE BTN---------
decreaseBtn.addEventListener("click", () => {
  if (quantityInput.value > 1) {
    quantityInput.value--;
    handleQuantityChange();
  }
});

increaseBtn.addEventListener("click", () => {
  quantityInput.value++;
  handleQuantityChange();
});

handleQuantityChange();
