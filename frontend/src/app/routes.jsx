import ProductList from "../product/ProductList";
import CartDetails from "../cart/CartDetails";

export const routes = [
    { path: "/", element: <ProductList /> },
    { path: "/carts/:id", element: <CartDetails /> }
];
