import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddToCartButton from "../app/common/AddToCartButton";
import { handleChange, handleSubmit } from "./productFormHandlers";

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

    return (
        <div>
        <h2>Build Your Order</h2>
        <form onSubmit={(e) => handleSubmit(e, quantities, navigate)}>
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
                            handleChange(product.code, e.target.value, quantities, setQuantities)
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
            <AddToCartButton type="submit">Add to cart</AddToCartButton>
        </form>
        </div>
    );
}
