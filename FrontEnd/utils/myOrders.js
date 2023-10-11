import addFilledIcons from "./changeIcons.mjs";
import { redirectSearchPage } from "./redirect.mjs";
import { generateOrdersProducts } from "./generateProducts.mjs";

//------CHANGE ICONS-------
const navBar = document.querySelector("#nav-bar");
navBar.addEventListener("click", addFilledIcons);

//------REDIRECT TO SEARCH-------
redirectSearchPage();

//------ACTIVE TAB TOGGLE-------
{
  const activeOrdersTab = document.getElementById("active-orders");
  const completedOrdersTab = document.getElementById("completed-orders");

  activeOrdersTab.addEventListener("click", () => {
    toggleOrdersTabStyles(true);
  });

  completedOrdersTab.addEventListener("click", () => {
    toggleOrdersTabStyles(false);
  });

  function toggleOrdersTabStyles(isActiveTab) {
    const activeOrdersTab = document.getElementById("active-orders");
    const completedOrdersTab = document.getElementById("completed-orders");

    if (isActiveTab) {
      activeOrdersTab.classList.add(
        "border-b-4",
        "border-black",
        "text-black"
      );
      activeOrdersTab.classList.remove(
        "border-b-2",
        "border-[#ccc]",
        "text-[#ccc]"
      );
      completedOrdersTab.classList.remove(
        "border-b-4",
        "border-black",
        "text-black"
      );
      completedOrdersTab.classList.add(
        "border-b-2",
        "border-[#ccc]",
        "text-[#ccc]"
      );
    } else {
      completedOrdersTab.classList.add(
        "border-b-4",
        "border-black",
        "text-black"
      );
      completedOrdersTab.classList.remove(
        "border-b-2",
        "border-[#ccc]",
        "text-[#ccc]"
      );
      activeOrdersTab.classList.remove(
        "border-b-4",
        "border-black",
        "text-black"
      );
      activeOrdersTab.classList.add(
        "border-b-2",
        "border-[#ccc]",
        "text-[#ccc]"
      );
    }
  }
}

//------GENERATE ORDER ITEMS-------
const cartContainer = document.querySelector("#orders");
const notFound = document.querySelector("#not-found");

generateOrdersProducts();
updateUI();
function updateUI() {
  if (cartContainer.textContent !== "") notFound.classList.add("hidden");
  else notFound.classList.remove("hidden");
}
