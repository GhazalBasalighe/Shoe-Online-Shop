const url = `http://localhost:3000/shoes`;
export default async function fetchData(query = "") {
  const products = await fetch(`${url}/${query}`);
  const shoes = await products.json();
  return shoes;
}
