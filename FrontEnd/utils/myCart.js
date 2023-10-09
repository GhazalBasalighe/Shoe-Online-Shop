import addFilledIcons from "./changeIcons.mjs";
import fetchData from "./request.mjs";
import handleQuantityChange from "./quantity.mjs";
import { redirectSearchPage } from "./redirect.mjs";
// Initialize the total price based on the default quantity
handleQuantityChange();

//------ACTIVE NAVBAR SECTION-------
const navBar = document.querySelector("#nav-bar");
navBar.addEventListener("click", addFilledIcons);

//------SEARCH iCON REDIRECT-------
redirectSearchPage();

// //------RENDER MY ORDERS PAGE-------
// const homePage = document.querySelector("#home");
// const ordersIcon = document.querySelector('[data-behavior="orders"]');
// ordersIcon.addEventListener("click", async () => {
//   const response = await fetch("../views/myOrders.html");
//   if (response.ok) {
//     // Get the HTML content from the response
//     const html = await response.text();
//     console.log(html);

//     // Insert the retrieved HTML content into the homePage element
//     homePage.innerHTML = html;
//   } else {
//     console.error("Failed to fetch the content.");
//   }
// });
