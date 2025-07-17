export default function OrderConfirmationButton({ children, type = "button" }) {
    return (
        <button className="order_confirmation">
        {children}
        </button>
    );
}
