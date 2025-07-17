import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductSelectionForm({ products }) {
    const [quantities, setQuantities] = useState({});
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        let sum = 0;
        Object.entries(quantities).forEach(([code, quantity]) => {
        const product = products.find((p) => p.code === code);
        if (product) {
            sum += quantity * product.price_cents;
        }
        });
        setTotal((sum / 100).toFixed(2));
    }, [quantities, products]);

    const handleChange = (code, value) => {
        setQuantities({
        ...quantities,
        [code]: parseInt(value, 10) || 0,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = { cart: quantities };

        const response = await fetch("/cart_items", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();
        console.log("Data from POST:", data);
        if (data?.cart_id) {
            navigate(`/carts/${data.cart_id}`);
        } else {
            console.error("No cart ID returned");
        }
    };


    return (
        <div>
        <h2>Build Your Order</h2>
        <form onSubmit={handleSubmit}>
            <table>
            <thead>
                <tr>
                <th>Product</th>
                <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                <tr key={product.code}>
                    <td>{product.name}</td>
                    <td>
                    <input
                        type="number"
                        min="0"
                        value={quantities[product.code] || 0}
                        onChange={(e) =>
                        handleChange(product.code, e.target.value)
                        }
                    />
                    </td>
                </tr>
                ))}
            </tbody>
            </table>

            <h3>Total: €{total}</h3>
            <p>
            <em>Click "Add to cart" to see if your order qualifies for a discount.</em>
            </p>
            <button type="submit">Add to cart</button>
        </form>
        </div>
    );
}
