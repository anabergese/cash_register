import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div>
      <h1>Product List (from Rails)</h1>
      <ul>
        {products.map((product) => (
          <li key={product.code}>
            {product.name} - €{(product.price_cents / 100).toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

