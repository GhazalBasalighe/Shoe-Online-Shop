import fetchData from "./request.mjs";
const shoes = await fetchData();

const productContainer = document.querySelector("#products");
export default async function generateProducts(array = shoes) {
  array.forEach((shoe) => {
    const newShoe = `
    <div class="grid-item card border-0 rounded-lg cursor-pointer" data-id=${shoe.id}>
                <div class="img-container"><img src="${shoe.profile}" alt="Shoe" class="card-img-top"></div>
                <div class="card-body p-0">
                    <div class="card-title truncate text-base font-bold mb-0 mt-2">${shoe.name}</div>
                    <div class="card-text font-semibold text-sm">$ ${shoe.price}.00</div>
                </div>
            </div>
    `;
    productContainer.insertAdjacentHTML("beforeend", newShoe);
  });
}
