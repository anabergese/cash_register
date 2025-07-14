import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./routes";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, i) => (
          <Route key={i} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

