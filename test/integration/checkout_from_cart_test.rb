require "test_helper"

class CheckoutFromCartTest < ActiveSupport::TestCase
    test "does not apply any discount if rules are not met" do
        cart = Cart.create!(status: "open")
        cart.cart_items.create!(product: products(:tea), quantity: 1)
        cart.cart_items.create!(product: products(:strawberries), quantity: 2) # < 3
        cart.cart_items.create!(product: products(:coffee), quantity: 2)       # < 3

        products = cart.cart_items.flat_map { |item| [item.product] * item.quantity }
        total = Checkout.new(products: products).total_price_cents

        # 311 (tea) + 2×500 (strawberries) + 2×1123 (coffee) = 311 + 1000 + 2246 = 3557
        assert_equal 3557, total
    end

    test "applies bulk discount to strawberries" do
        cart = Cart.create!(status: "open")
        cart.cart_items.create!(product: products(:strawberries), quantity: 3)

        products = cart.cart_items.flat_map { |item| [item.product] * item.quantity }
        total = Checkout.new(products: products).total_price_cents

        # 3 × 450 = 1350
        assert_equal 1350, total
    end

    test "applies price drop to coffee when buying 3 or more" do
        cart = Cart.create!(status: "open")
        cart.cart_items.create!(product: products(:coffee), quantity: 3)

        products = cart.cart_items.flat_map { |item| [item.product] * item.quantity }
        total = Checkout.new(products: products).total_price_cents

        # 1123 × 2/3 ≈ 748.67 → redondeado a 749
        # 3 × 749 = 2247
        assert_equal 2247, total
    end

    test "computes correct total regardless of item order" do
        cart = Cart.create!(status: "open")
        cart.cart_items.create!(product: products(:strawberries), quantity: 3)
        cart.cart_items.create!(product: products(:tea), quantity: 2)
        cart.cart_items.create!(product: products(:coffee), quantity: 3)

        products = cart.cart_items.flat_map { |item| [item.product] * item.quantity }.shuffle
        total = Checkout.new(products: products).total_price_cents

        # Strawberries (3×450 = 1350)
        # Tea (buy 1 get 1 → 1 × 311 = 311)
        # Coffee (3 × 749 = 2247)
        # Total: 1350 + 311 + 2247 = 3908
        assert_equal 3908, total
    end
end
