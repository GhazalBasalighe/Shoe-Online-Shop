import fetchData from "./request.mjs";
import handleQuantityChange from "./quantity.mjs";

// Initialize the total price based on the default quantity
const quantityInput = document.querySelector("#quantityInput");
const totalPriceElem = document.querySelector("#total-price");

quantityInput.addEventListener("input", () => {
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
await initializePage();

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

//------SEND DATA TO CART--------
const title = document.querySelector("#shoe-name");
const shoeName = title.textContent;
const quantity = quantityInput.value;
const totalPrice = totalPriceElem.textContent;

const postData = {
  shoeName,
  totalPrice,
  quantity,
};

//------COLORS SELECT--------
const colorsMap = {
  gray: "rgb(243, 243, 243)",
  red: "rgb(220, 38 , 38)",
  lime: "rgb(163, 230, 53)",
  emerald: "rgb(52, 211, 153)",
  cyan: "rgb(103, 232, 249)",
  indigo: "rgb(129, 140, 248)",
  pink: "rgb(232, 121, 249)",
};
const colorsContainer = document.querySelector(".colors");
colorsContainer.addEventListener("click", (event) => {
  if (event.target.tagName === "SPAN") {
    // Remove check icons from all color elements
    const colorElements = colorsContainer.querySelectorAll("span");
    colorElements.forEach((colorElement) => {
      const existingCheckIcon = colorElement.querySelector(".bi-check");
      if (existingCheckIcon) {
        colorElement.removeChild(existingCheckIcon);
      }
    });
    //save bgColor and bg-name
    const bgColor = getComputedStyle(event.target).backgroundColor;
    let colorName;
    let colorCode;
    for (const name in colorsMap) {
      if (colorsMap[name] === bgColor) {
        colorName = name;
        colorCode = colorsMap[name];
        break;
      }
    }
    postData.color = colorName;
    console.log(postData);

    // Add the check icon to the clicked span
    const checkIcon = document.createElement("i");
    checkIcon.classList.add("bi", "bi-check", "text-black"); // Add Bootstrap icon classes
    event.target.appendChild(checkIcon);
  }
});

//------SIZE SELECT--------
const sizeContainer = document.querySelector(".sizes");
sizeContainer.addEventListener("click", (event) => {
  if (event.target.tagName === "SPAN") {
    const shoeSize = event.target.textContent;
    postData.size = shoeSize;
    console.log(postData);
    const sizeElements = sizeContainer.querySelectorAll("span");
    sizeElements.forEach((sizeElement) => {
      sizeElement.classList.remove("bg-black", "text-white");
    });
    event.target.classList.add("bg-black", "text-white");
  }
});

//-----ADD TO DB FUNCTION------
async function postToDb() {
  if (!postData.color || !postData.size) {
    console.error(
      "Please select color and size before adding to the cart."
    );
    return;
  } else {
    try {
      const response = await fetch("http://localhost:3000/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      console.log(postData);
      if (response.ok) {
        console.log("Data sent to the server successfully.");
      } else {
        console.error("Failed to send data to the server.");
      }
    } catch (error) {
      console.error(
        "An error occurred while sending the POST request:",
        error
      );
    }
  }
}

//------ADD TO CART BUTTON--------
const addToCartBtn = document.querySelector("#cart-btn");
addToCartBtn.addEventListener("click", () => {
  if (!postData.color || !postData.size) {
    console.error(
      "Please select color and size before adding to the cart."
    );
  } else window.location.href = "../views/myCart.html";
  const totalPrice = totalPriceElem.textContent;
  postData.totalPrice = totalPrice;
  postData.quantity = quantityInput.value;
  postToDb();
});
