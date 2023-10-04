const productContainer = document.querySelector("#products");

export default async function generateProducts() {
  const request = await fetch("http://localhost:3000/shoes");
  const shoes = await request.json();
  shoes.forEach((shoe) => {
    const newShoe = `
    <div class="grid-item card border-0 rounded-lg">
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
