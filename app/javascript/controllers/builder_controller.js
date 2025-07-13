import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["quantity", "total"]
    static values = { products: Object }

    connect() {
        this.originalProducts = structuredClone(this.productsValue) // Copia segura
        this.updateTotal()
    }

    updateTotal() {
        let total = 0

        this.quantityTargets.forEach((input) => {
            const code = input.dataset.productCode
            const value = input.value.trim()
            const quantity = value === "" ? 0 : parseInt(value, 10)
            const priceCents = this.products[code]?.price_cents || 0

            total += quantity * priceCents
        })

        this.totalTarget.textContent = (total / 100).toFixed(2)
        }


    quantityTargetConnected(input) {
        input.addEventListener("input", () => this.updateTotal())
    }
}

