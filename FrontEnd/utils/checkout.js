import { redirectShippingPage } from "./redirect.mjs";
const status = ["address", "shipping", "payment"];

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
