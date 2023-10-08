const shoeEndPoint = `http://localhost:3000/shoes`;
async function fetchData(query = "") {
  const products = await fetch(`${shoeEndPoint}/${query}`);
  const shoes = await products.json();
  return shoes;
}

const searchEndPoint = "http://localhost:3000/search-history";
async function fetchHistory(query = "") {
  const history = await fetch(`${searchEndPoint}/${query}`);
  const search = await history.json();
  return search;
}

export default fetchData;
export { fetchHistory };
