import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["quantity", "summary", "total"]
    static values = { products: Object }

    connect() {
        this.cart = {}
        this.products = this.productsValue
        console.log("Products loaded:", this.products)
    }


    increase(event) {
        console.log("increase clicked")
        const code = event.target.dataset.productCode
        console.log("code:", code)
        this.cart[code] = (this.cart[code] || 0) + 1
        this.update()
    }

    decrease(event) {
        console.log("decrease clicked")
        const code = event.target.dataset.productCode
        if (this.cart[code]) {
        this.cart[code] -= 1
        if (this.cart[code] <= 0) delete this.cart[code]
        }
        this.update()
    }

    update() {
        console.log("update called")
        let total = 0
        this.summaryTarget.innerHTML = ""

        Object.entries(this.cart).forEach(([code, quantity]) => {
            console.log("for each:", this.products[code])
            const priceCents = this.products[code].price_cents
            console.log("priceCents:", priceCents)
            const name = this.products[code].name
            total += quantity * priceCents
            const item = document.createElement("li")
            item.innerText = `${name} × ${quantity}`
            this.summaryTarget.appendChild(item)
            document.querySelector(`#quantity-${code}`).textContent = quantity
        })

        this.totalTarget.textContent = (total / 100).toFixed(2)
    }
}
