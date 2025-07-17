import { render, screen, waitFor } from "@testing-library/react";
import CartDetails from "../../cart/CartDetails";
import { MemoryRouter, Route, Routes } from "react-router-dom";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: () => ({ id: "42" }),
}));

beforeEach(() => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
        json: () =>
            Promise.resolve({
            total_cents: 933,
            items: [
                {
                code: "GR1",
                name: "Green Tea",
                quantity: 2,
                price_cents: 311,
                },
                {
                code: "SR1",
                name: "Strawberries",
                quantity: 1,
                price_cents: 500,
                },
            ],
            }),
        })
    );
});

afterEach(() => {
    jest.restoreAllMocks();   
});

describe("Given the CartDetails component", () => {
    describe("When it fetches the cart by ID", () => {
        test("Then it should render the cart items and total", async () => {
        render(
            <MemoryRouter initialEntries={["/carts/42"]}>
            <Routes>
                <Route path="/carts/:id" element={<CartDetails />} />
            </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText(/Loading cart/i)).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText("Green Tea")).toBeInTheDocument();
            expect(screen.getByText("Strawberries")).toBeInTheDocument();
            expect(screen.getByText("2")).toBeInTheDocument(); // Qty
            expect(screen.getByText("1")).toBeInTheDocument(); // Qty
            expect(screen.getByText("€3.11")).toBeInTheDocument();
            expect(screen.getByText("€5.00")).toBeInTheDocument();
            expect(screen.getByText("Total: €9.33")).toBeInTheDocument();
        });
        });
    });
});
