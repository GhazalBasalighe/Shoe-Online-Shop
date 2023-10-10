//data for filling dynamically :
const titles = ["Shipping Address", "Choose Shipping", "Payment Methods"];

const title = document.querySelector("#title");
const main = document.querySelector("#main");
const btn = document.querySelector("#confirm-btn span");
const currentUrl = new URL(window.location.href);
const state = currentUrl.searchParams.get("status");
switch (state) {
  case "address":
    title.textContent = titles[0];
    renderInfo("address");
    break;
  case "shipping":
    title.textContent = titles[1];
    renderInfo("shipping");
    break;
  case "payment":
    renderInfo("payment");
    title.textContent = titles[2];
    btn.textContent = "Confirm Payment";

    break;
}

async function renderInfo(address) {
  const response = await fetch(`../views/textContents/${address}.html`);

  if (response.ok) {
    const html = await response.text();
    main.insertAdjacentHTML("afterbegin", html);
  } else {
    console.error("Failed to fetch the content.");
  }
}
