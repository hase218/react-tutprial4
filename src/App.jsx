import { useEffect } from "react";
import { useState } from "react";

export default function App() {
  const [allProducts, setAllProducts] = useState();
  const [products, setProducts] = useState(allProducts);
  const [category, setCategory] = useState("All");
  const [term, setTerm] = useState("");

  useEffect(() => {
    (async () => {
      const response = await fetch("products.json");
      const jsonData = await response.json();
      setAllProducts(jsonData);
      //.jsonも非同期だったネー
      console.log(jsonData);
    })();
  }, []);

  useEffect(() => {
    if(allProducts){
    setProducts(allProducts.filter((product) => {
      console.log(product.name, term);
      //console.log(product.type, category.toLowerCase());
       
      const isIncludesTerm = term === "" ? true : (product.name).includes(term);
      const isEqulaCategory = category === "All" ? true : product.type === category.toLowerCase();
      
      return isIncludesTerm && isEqulaCategory;
    }))}

  },[allProducts, category, term])

  console.log(products);
  console.log(term);
  console.log(category);

  if (!products) {
    return <></>
  }

  return (
    <>
      <header>
        <h1>The Can Store</h1>
      </header>
      <div>
        <aside>
          <form>
            <div>
              <label htmlFor="category">Choose a category:</label>
              <select value={category} onChange={(event)=> {setCategory(event.target.value)}} id="category">
                <option>All</option>
                <option>Vegetables</option>
                <option>Meat</option>
                <option>Soup</option>
              </select>
            </div>
            <div>
              <label htmlFor="searchTerm">Enter search term:</label>
              <input value={term}onChange={(event)=> {setTerm(event.target.value)}} type="text" id="searchTerm" placeholder="e.g. beans" />
            </div>
            <div>
              <button>Filter results</button>
            </div>
          </form>
        </aside>
        <main>
          {products.map((product, index) => {
            return (
              <section className={`${product.type}`} key={index}>
                <h2>{`${product.name}`}</h2>{/* 頭文字大文字にしたい*/}
                <p>{`$${product.price}`}</p>
                <img src={`images/${product.image}`} alt={`${product.name}`} />
              </section>
            )
          })}

        </main>
      </div>
      <footer>
        <p>All icons found at the Noun Project:</p>
        <ul>
          <li>
            Bean can icon by{" "}
            <a href="https://thenounproject.com/yalanis/">Yazmin Alanis</a>
          </li>
          <li>
            Vegetable icon by{" "}
            <a href="https://thenounproject.com/skatakila/">Ricardo Moreira</a>
          </li>
          <li>
            Soup icon by{" "}
            <a href="https://thenounproject.com/ArtZ91/">Arthur Shlain</a>
          </li>
          <li>
            Meat Chunk icon by{" "}
            <a href="https://thenounproject.com/smashicons/">Oliviu Stoian</a>.
          </li>
        </ul>
      </footer>
    </>
  );
}