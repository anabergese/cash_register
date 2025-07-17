import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "../product/ProductList";
import CartDetails from "../cart/CartDetails";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/carts/:id" element={<CartDetails />} />
      </Routes>
    </BrowserRouter>
  );
}