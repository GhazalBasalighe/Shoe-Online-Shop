import fetchData from "./request.mjs";

const quantityInput = document.getElementById("quantityInput");
const totalPrice = document.querySelector("#total-price");
const decreaseBtn = document.getElementById("decreaseBtn");
const increaseBtn = document.getElementById("increaseBtn");

//----------EVENT LISTENER FOR QUANTITY-----------
quantityInput.addEventListener("input", () => {
  handleQuantityChange();
});

//---------
function handleQuantityChange() {
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

// Initialize the total price based on the default quantity
handleQuantityChange();

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
