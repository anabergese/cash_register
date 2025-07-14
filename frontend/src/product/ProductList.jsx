import React, { useEffect, useState } from "react";

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/products.json")
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
        </div>
    );
};

export default ProductList;
