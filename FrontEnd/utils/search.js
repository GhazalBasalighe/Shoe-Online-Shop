import { fetchHistory, default as fetchData } from "./request.mjs";
import generateProducts from "./generateProducts.mjs";
import redirectDetails from "./redirect.mjs";

const searchList = document.querySelector("#search-list");
const productContainer = document.querySelector("#products");
const notFound = document.querySelector("#not-found");
const leftTitle = document.querySelector("#left-title");
const rightTitle = document.querySelector("#right-title");
const searchInput = document.querySelector("#search");

let searchMode = false; //something like React IG? IDK T.T
let filteredArrLen = 0; //to save filtered products array length

//------SEND SEARCH QUERIES TO DB------
searchInput.addEventListener("keydown", async (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const text = searchInput.value.trim(); // Remove leading/trailing spaces
    if (text !== "") {
      // Check if text is not empty
      await performSearch(text);
    }
    changeTextContent();
  }
});

//-----------SEARCH FUNCTION-----------
async function performSearch(text) {
  const searchQuery = { text };
  const shoes = await fetchData();
  const filteredProducts = shoes.filter((shoe) => {
    const name = shoe.name.toLowerCase();
    return name.includes(String(text).toLowerCase());
  });
  filteredArrLen = filteredProducts.length;
  const isFound = filteredArrLen > 0;

  await updateUI(filteredProducts, isFound);

  let isRedundant = false;
  //add each input to history and db
  try {
    const searchHistory = await fetchHistory();
    searchHistory.forEach(async (input) => {
      if (input.text === text) {
        isRedundant = true;
      }
    });
    if (!isRedundant && text !== "") {
      try {
        await fetch("http://localhost:3000/search-history", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(searchQuery),
        });
      } catch (error) {
        console.log(error.message);
      }
    }
  } catch (error) {
    console.log(error.message);
  }
}
//-------UPDATE UI FOR PRODUCTS-------
async function updateUI(filteredProducts, isFound) {
  searchList.classList.remove("visible");
  productContainer.textContent = "";

  if (isFound) {
    await generateProducts(filteredProducts);
    notFound.classList.remove("visible"); // Hide the "not found" message when products are found
    searchList.classList.add("hidden");
  } else {
    notFound.classList.add("visible");
  }
  searchMode = true;
}

//--------SEARCH INPUT EVENTS--------
searchInput.addEventListener("focus", () => {
  searchList.classList.add("visible");
});
searchInput.addEventListener("blur", () => {
  searchList.classList.remove("visible");
  searchMode = true;
});

//--GENERATE SEARCH HISTORY ELEMENTS--
async function addSearchList() {
  const searchHistory = await fetchHistory();
  searchHistory.forEach((li) => {
    const newLi = `
     <div class="flex justify-between items-center">
                    <span class="truncate text-fadedBlack">${li.text}</span>
                    <i class="bi bi-x-square cursor-pointer"></i>
                </div>
    `;
    searchList.insertAdjacentHTML("afterbegin", newLi);
  });
}
addSearchList();

//---------CHANGE TOP TEXTS---------
async function changeTextContent() {
  const parent = searchInput.closest("div");
  const searchValue = searchInput.value;
  const shoes = await fetchData();
  const filteredProducts = shoes.filter((shoe) => {
    const name = shoe.name.toLowerCase();
    return name.includes(String(searchValue).toLowerCase());
  });
  const shoesLen = filteredProducts.length;

  if (searchMode) {
    searchInput.classList.remove("bg-[#FAFAFA]");
    searchInput.classList.add("bg-gray", "border-none");
    parent.classList.add("border-none");
    leftTitle.textContent = `Results for "${searchInput.value}"`;
    rightTitle.textContent = shoesLen
      ? shoesLen + " founds"
      : shoesLen + " found";
  }
}

//-------DELETE SEARCH HISTORY-------
rightTitle.addEventListener("click", clearAll);
async function clearAll() {
  const result = confirm(
    "Are you sure you want to delete search history ?"
  );
  const db = await fetch("http://localhost:3000/search-history");
  const historyTillNow = await db.json();
  const dbArrId = historyTillNow.map((element) => element.id);
  console.log(dbArrId);
  if (result) {
    try {
      for (let i = 0; i < dbArrId.length; i++) {
        const response = await fetch(
          `http://localhost:3000/search-history/${i + +1}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          console.log("Search history deleted successfully.");
          searchList.textContent = "";
        } else {
          console.error(
            "Failed to delete search history. Status:",
            response.status
          );
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
}

//-------REDIRECT TO DETAILS-------

productContainer.addEventListener("click", redirectDetails());
