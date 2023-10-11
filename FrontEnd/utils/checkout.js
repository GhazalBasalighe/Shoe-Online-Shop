import { redirectShippingPage } from "./redirect.mjs";
import { generateCheckoutProducts } from "./generateProducts.mjs";

//------REDIRECT TO SHIPPING ADDRESS HTML------
const editAddress = document.querySelector("#edit-address");
editAddress.addEventListener("click", () =>
  redirectShippingPage("address")
);

const chooseShipping = document.querySelector("#shipping");
chooseShipping.addEventListener("click", () =>
  redirectShippingPage("shipping")
);

const paymentMethods = document.querySelector("#payment");
paymentMethods.addEventListener("click", () =>
  redirectShippingPage("payment")
);

//------GENERATE ORDER LIST------
await generateCheckoutProducts();

//-------ACCESS INFO SENT FROM SHIPPING DETAILS PAGE-----
const urlParams = new URLSearchParams(window.location.search);
console.log(window.location.search);
//http://127.0.0.1:5500/views/checkout.html?title=Express&details=Estimated%20Arrival,%20Dec%2020-23
{
  const selectedAddTitle = document.querySelector("#section-1 #title");
  const selectedAddDetails = document.querySelector("#section-1 #details");
  selectedAddTitle.textContent = urlParams.get("title");
  selectedAddDetails.textContent = urlParams.get("details");

  const selectedShipTitle = document.querySelector("#section-3 #title");
  const selectedShipDetails = document.querySelector(
    "#section-3 #details"
  );
  const selectedShipPrice = document.querySelector("#section-3 #price");
  const shippingCost = document.querySelector("#shipping-cost");

  selectedShipTitle.textContent = urlParams.get("title");
  selectedShipDetails.textContent = urlParams.get("details");
  selectedShipPrice.textContent = urlParams.get("price");
  shippingCost.textContent = urlParams.get("price");

  const allPrices = document.querySelectorAll("#total-price");
  const values = Array.from(allPrices).map(
    (totalPrice) => totalPrice.textContent
  );
  const numericValues = values.map((value) =>
    parseFloat(value.replace("$", ""))
  );
  const totalSum = numericValues.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  const amountCost = document.querySelector("#amount-cost");
  amountCost.textContent = "$" + totalSum.toFixed(2);

  const totalCost = document.querySelector("#total-of-all");

  totalCost.textContent =
    "$" +
    (
      parseFloat(selectedShipPrice.textContent.replace("$", "")) +
      parseFloat(amountCost.textContent.replace("$", ""))
    ).toFixed(2);
}
