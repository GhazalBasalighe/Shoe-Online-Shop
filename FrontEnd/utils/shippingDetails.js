//data for filling dynamically :
const titles = ["Shipping Address", "Choose Shipping", "Payment Methods"];

const title = document.querySelector("#title");
const main = document.querySelector("#main");
const btnText = document.querySelector("#confirm-btn span");
const btn = document.querySelector("#confirm-btn");
const currentUrl = new URL(window.location.href);
const state = currentUrl.searchParams.get("status");
(async () => {
  switch (state) {
    case "address":
      title.textContent = titles[0];
      await renderInfo("address");
      break;
    case "shipping":
      title.textContent = titles[1];
      await renderInfo("shipping");
      break;
    case "payment":
      await renderInfo("payment");
      title.textContent = titles[2];
      btnText.textContent = "Confirm Payment";
      break;
  }
})();

//------RENDER CONTENT ACCORDINGLY FROM HTMLS-------
async function renderInfo(address) {
  const response = await fetch(`../views/textContents/${address}.html`);
  if (response.ok) {
    const html = await response.text();
    main.insertAdjacentHTML("afterbegin", html);
  } else {
    console.error("Failed to fetch the content.");
  }
}

//--------GET ADDRESS FROM QUERY PARAM---------
function setAddress() {
  const checkedInput = document.querySelector(
    "#address-container .grid-item input:checked"
  );
  if (checkedInput) {
    const addressElem = checkedInput.closest(".grid-item");
    const title = addressElem.querySelector("#title").textContent;
    const details = addressElem.querySelector("#details").textContent;
    const destinationUrl = "http://127.0.0.1:5500/views/checkout.html";
    window.location.href = `${destinationUrl}?title=${title}&details=${details}`;
  }
}

//--------GET SHIPPING METHOD FROM QUERY PARAM---------
function chooseShipping() {
  const checkedInput = document.querySelector(
    "#shipping-method .grid-item input:checked"
  );
  if (checkedInput) {
    const addressElem = checkedInput.closest(".grid-item");
    const title = addressElem.querySelector("#title").textContent;
    const details = addressElem.querySelector("#details").textContent;
    const price = addressElem.querySelector("#price").textContent;
    const destinationUrl = "http://127.0.0.1:5500/views/checkout.html";
    window.location.href = `${destinationUrl}?title=${title}&details=${details}&price=${price}`;
  }
}

const blackOverlay = document.querySelector("#black-overlay");
const modal = document.querySelector(".modal-overlay");

//-----SENDING DATA ON BUTTON CONFIRM------
btn.addEventListener("click", () => {
  if (state === "address") setAddress();
  else if (state === "shipping") chooseShipping();
  else {
    blackOverlay.classList.toggle("hidden");
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  }
});

//------MY ORDERS PAGE REDIRECT--------
const viewOrders = document.querySelector("#view-order");
viewOrders.addEventListener("click", () => {
  window.location.href = "./myOrders.html";
});
