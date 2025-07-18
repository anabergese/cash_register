export function handleChange(code, value, quantities, setQuantities) {
    setQuantities({
        ...quantities,
        [code]: parseInt(value, 10) || 0,
    });
}

export async function handleSubmit(e, quantities, navigate) {
    e.preventDefault();

    const payload = { cart: quantities };

    try {
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
    } catch (err) {
        console.error("Failed to submit cart:", err);
    }
}
