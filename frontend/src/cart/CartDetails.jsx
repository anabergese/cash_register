import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import OrderConfirmationButton from "../app/common/OrderConfirmationButton";

export default function CartDetails() {
    const { id } = useParams();
    const [cart, setCart] = useState(null);

    useEffect(() => {
        fetch(`/carts/${id}.json`)
        .then((res) => res.json())
        .then(setCart)
        .catch((err) => console.error("Failed to load cart:", err));
    }, [id]);

    if (!cart) return <p>Loading cart...</p>;

    const total = cart.total_cents / 100;

    return (
        <div>
        <h1>Shopping Cart</h1>
        <table>
            <thead>
            <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Price (each)</th>
            </tr>
            </thead>
            <tbody>
            {cart.items.map((item, i) => (
                <tr key={`${item.code}-${i}`}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>€{(item.price_cents / 100).toFixed(2)}</td>
                </tr>
            ))}
            </tbody>
        </table>
        <h2>Total: €{total.toFixed(2)}</h2>
        <OrderConfirmationButton>Confirm Order</OrderConfirmationButton>
        </div>
    );
}
