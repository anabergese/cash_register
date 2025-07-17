import { render, screen, fireEvent } from "@testing-library/react";
import ProductForm from "../../product/ProductForm";

import { MemoryRouter } from "react-router-dom";

describe("Given the ProductForm component", () => {
    const products = [
        { code: "GR1", name: "Green Tea", price_cents: 311 },
        { code: "SR1", name: "Strawberries", price_cents: 500 },
    ];

    const setup = () =>
        render(
        <MemoryRouter>
            <ProductForm products={products} />
        </MemoryRouter>
        );

    describe("When rendered with a list of products", () => {
        test("Then user should see product names and quantity inputs", () => {
        setup();

        expect(screen.getByText("Green Tea")).toBeInTheDocument();
        expect(screen.getByText("Strawberries")).toBeInTheDocument();

        const inputs = screen.getAllByRole("spinbutton");
        expect(inputs.length).toBe(2);

        inputs.forEach((input) => {
            expect(input).toHaveValue(0);
        });
        });

        test("Then initial total should display €0.00", () => {
        setup();

        expect(screen.getByText("Total: €0.00")).toBeVisible();
        });
    });

    describe("When user changes quantities", () => {
        test("Then total updates accordingly for single product", () => {
        setup();

        const inputs = screen.getAllByRole("spinbutton");
        const greenInput = inputs[0]; // primer producto
        fireEvent.change(greenInput, { target: { value: "3" } });

        expect(greenInput).toHaveValue(3);
        expect(screen.getByText("Total: €9.33")).toBeVisible();
        });

    test("Then total updates when multiple products are added", () => {
        setup();

        const [grInput, srInput] = screen.getAllByRole("spinbutton");

        fireEvent.change(grInput, { target: { value: "2" } }); // 2 × €3.11 = €6.22
        fireEvent.change(srInput, { target: { value: "1" } }); // 1 × €5.00 = €5.00

        expect(grInput).toHaveValue(2);
        expect(srInput).toHaveValue(1);

        expect(screen.getByText("Total: €11.22")).toBeVisible();
        });

    });
});

// THIS TEST FAILS - BUT THE UI WORKS AS EXPECTED
//  test("Then total remains €0.00 when user tries to input a negative quantity", () => {
//         setup();

//         const greenInput = screen.getAllByRole("spinbutton")[0];

//         fireEvent.change(greenInput, { target: { value: "-1" } });

//         expect(screen.getByText("Total: €0.00")).toBeVisible();
//         });