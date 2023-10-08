import addFilledIcons from "./changeIcons.mjs";
import fetchData from "./request.mjs";
import handleQuantityChange from "./quantity.mjs";

// Initialize the total price based on the default quantity
handleQuantityChange();

//------ACTIVE NAVBAR SECTION-------
const navBar = document.querySelector("#nav-bar");
navBar.addEventListener("click", addFilledIcons);

//------SEARCH iCON REDIRECT-------
const searchIcon = document.querySelector("#search-icon");
searchIcon.addEventListener(
  "click",
  () => (window.location.href = "../views/search.html")
);
