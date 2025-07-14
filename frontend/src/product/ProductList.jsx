import { useEffect, useState } from "react";
import ProductForm from "./ProductForm";

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("/products.json")
        .then((res) => res.json())
        .then((data) => {
            setProducts(data);
        })
        .catch((err) => {
            console.error("Error fetching products:", err);
        });
    }, []);

    return (
        <div>
        <h1>Available Products</h1>
        <ul>
            {products.map((product) => (
            <li key={product.code}>
                {product.name} — €{(product.price_cents / 100).toFixed(2)}
            </li>
            ))}
        </ul>
        <h1>Build Your Order</h1>
        <ProductForm products={products} />
        </div>
    );
};

export default ProductList;
