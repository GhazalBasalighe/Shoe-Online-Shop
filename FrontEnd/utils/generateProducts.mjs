import fetchData from "./request.mjs";
import { fetchCart } from "./request.mjs";
const shoes = await fetchData();

const productContainer = document.querySelector("#products");
export default async function generateProducts(array = shoes) {
  array.forEach((shoe) => {
    const newShoe = `
    <div class="grid-item card border-0 rounded-lg cursor-pointer" data-id=${shoe.id}>
    <div class="bg-gray rounded-xl"><img src="${shoe.profile}" alt="Shoe" class="card-img-top"></div>
    <div class="card-body p-0">
    <div class="card-title truncate text-base font-bold mb-0 mt-2">${shoe.name}</div>
    <div class="card-text font-semibold text-sm">$ ${shoe.price}.00</div>
    </div>
    </div>
    `;
    productContainer.insertAdjacentHTML("beforeend", newShoe);
  });
}
const cartContainer = document.querySelector("#orders");
export async function generateCartProducts() {
  const cart = await fetchCart();
  cart.forEach((cartItem) => {
    const newOrderItem = `
   <div class="grid-item rounded-xl shadow-xl bg-white cursor-pointer flex gap-3 p-2" data-id=${cartItem.id}>
                <div class="left-side bg-gray rounded-xl inline-flex items-center w-1/3"><img
                        src="../assets/images/Shoe(hardcode)2.png" alt="Shoe">
                </div>
                <div class="right-side flex flex-col items-center justify-between gap-3 w-2/3">
                    <!-- NAME -->
                    <div class="flex items-center justify-between w-full">
                        <div class="truncate text-base font-bold name">${cartItem.shoeName}</div>
                        <i class="bi bi-trash"></i>
                    </div>
                    <!-- COLOR AND SIZE -->
                    <div class="flex justify-center items-center self-start text-sm">
                        <!-- COLOR -->
                        <div>
                            <span
                                class="w-4 h-4 text-center rounded-full inline-block align-middle bg-${cartItem.color}"></span>
                            <span class="text-fadedBlack border-r border-fadedBlack pr-2">${cartItem.color}</span>
                        </div>
                        <!-- SIZE -->
                        <div>
                            <span class="text-fadedBlack pl-2">Size=${cartItem.size}</span>
                        </div>
                    </div>
                    <!-- QUANTITY AND PRICE -->
                    <div class="flex justify-between items-center w-full">
                        <span class="font-bold total-price" id="total-price">${cartItem.totalPrice}</span>
                        <div class="quantity flex items-center gap-2 box-border">
                            <div class="flex items-center rounded-full bg-gray box-border">
                                <button id="decreaseBtn"
                                    class="px-1 py-1 text-black rounded-l focus:outline-none text-xl">
                                    <i class="bi bi-dash"></i>
                                </button>
                                <input id="quantityInput" type="number"
                                    class="w-8 px-1 py-1 text-center bg-gray focus:outline-none" value="${cartItem.quantity}" min="1"
                                    max="10">
                                <button id="increaseBtn"
                                    class="px-1 py-1 text-black rounded-r focus:outline-none text-xl">
                                    <i class="bi bi-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  `;
    cartContainer.insertAdjacentHTML("beforeend", newOrderItem);
  });
}

export async function generateModals(id, totalPrice, quantity) {
  const cartItems = await fetchCart(`?id=${id}`);
  const cartItem = cartItems[0];
  console.log(cartItem);
  const newModal = `
 <div class="modal fixed bottom-0 left-0 rounded-t-3xl z-30 bg-white p-5">
                <div class="content">
                    <h5 class="title text-xl text-center font-bold pb-5">Remove From Cart?</h5>
                    <div class="body border-gray border-y-4">
                        <div class="grid-item rounded-xl shadow-sm bg-white cursor-pointer flex gap-3 p-2 my-5"
                            data-id=${cartItem.id}>
                            <div class="left-side bg-gray rounded-xl inline-flex items-center w-1/3"><img
                                    src="../assets/images/Shoe(hardcode)2.png" alt="Shoe">
                            </div>
                            <div class="right-side flex flex-col items-center justify-between gap-3 w-2/3">
                                <!-- NAME -->
                                <div class="flex items-center justify-between w-full">
                                    <div class="truncate text-base font-bold name">${cartItem.shoeName}</div>
                                </div>
                                <!-- COLOR AND SIZE -->
                                <div class="flex justify-center items-center self-start text-sm">
                                    <!-- COLOR -->
                                    <div>
                                        <span
                                            class="w-4 h-4 text-center rounded-full inline-block align-middle bg-${cartItem.color}"></span>
                                        <span
                                            class="text-fadedBlack border-r border-fadedBlack pr-2">${cartItem.color}</span>
                                    </div>
                                    <!-- SIZE -->
                                    <div>
                                        <span class="text-fadedBlack pl-2">Size=${cartItem.size}</span>
                                    </div>
                                </div>
                                <!-- QUANTITY AND PRICE -->
                                <div class="flex justify-between items-center w-full">
                                    <span class="font-bold total-price" id="total-price">${totalPrice}</span>
                                    <div class="quantity flex items-center gap-2 box-border">
                                        <div class="flex items-center rounded-full bg-gray box-border">
                                            <button id="decreaseBtn"
                                                class="px-1 py-1 text-black rounded-l focus:outline-none text-xl">
                                                <i class="bi bi-dash"></i>
                                            </button>
                                            <input id="quantityInput" type="number"
                                                class="w-8 px-1 py-1 text-center bg-gray focus:outline-none"
                                                value="${quantity}" min="1" max="10">
                                            <button id="increaseBtn"
                                                class="px-1 py-1 text-black rounded-r focus:outline-none text-xl">
                                                <i class="bi bi-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="footer flex justify-center items-center gap-3 pt-5">
                        <button class="bg-gray rounded-full py-3 w-1/2 text-sm" id="cancelRemoveBtn">Cancel</button>
                        <button class="bg-black text-white rounded-full py-3 w-1/2 text-sm" id="confirmRemoveBtn">Yes,
                            Remove</button>
                    </div>
                </div>
            </div>
  `;
  document.body.insertAdjacentHTML("beforeend", newModal);
}
