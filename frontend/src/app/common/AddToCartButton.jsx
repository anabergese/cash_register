export default function AddToCartButton({ children, onClick, type = "button", ...props }) {
    return (
        <button className="add_to_cart" type={type} onClick={onClick} {...props}>
        {children}
        </button>
    );
}
