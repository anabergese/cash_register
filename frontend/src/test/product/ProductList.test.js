import { render, screen } from "@testing-library/react";
import ProductList from "../../product/ProductList";
import { MemoryRouter } from "react-router-dom";

beforeEach(() => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
        json: () =>
            Promise.resolve([
            { code: "GR1", name: "Green Tea", price_cents: 311 },
            ]),
        })
    );
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe("Given a ProductList component", () => {
    describe("When it fetches products with 'Green Tea' for €3.11", () => {
        test("Then user should see the product title and price", async () => {
        render(
            <MemoryRouter>
            <ProductList />
            </MemoryRouter>
        );

        const expectedText = "Green Tea — €3.11";
        const product = await screen.findByText(expectedText);
        expect(product).toBeInTheDocument();
        expect(product).toBeVisible();
        });
    });
});
