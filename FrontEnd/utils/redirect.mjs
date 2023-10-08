const productsURL = "http://127.0.0.1:5500/views/products.html";
const detailsURL = "http://127.0.0.1:5500/views/details.html";

export default function redirectDetails(url = detailsURL) {
  return function (e) {
    const gridItem = e.target.closest(".grid-item");
    if (gridItem) {
      const dataId = gridItem.dataset.id;
      if (url === detailsURL) {
        const newUrl = `${url}?id=${dataId}`;
        location.assign(newUrl);
      } else if (url === productsURL) {
        const filterParam = gridItem.children[1].textContent;
        const newUrl = `${url}?filter=${filterParam}`;
        console.log(newUrl);
        location.assign(newUrl);
      }
    }
  };
}
