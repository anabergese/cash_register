require "test_helper"

class CheckoutTest < ActiveSupport::TestCase
    test "green tea buy-one-get-one-free rule" do
        tea = Product.create!(code: "GR1", name: "Green Tea", price_cents: 311)

        products = [tea, tea]

        checkout = Checkout.new(products: products)
        assert_equal 311, checkout.total_price_cents
    end

    test "strawberries bulk discount rule (3 or more at 4.50€)" do
        strawberries = Product.create!(code: "SR1", name: "Strawberries", price_cents: 500)

        products = [strawberries, strawberries, strawberries]

        checkout = Checkout.new(products: products)
        assert_equal 1350, checkout.total_price_cents
    end

    test "coffees drop to 2/3 price when buying 3 or more" do
        coffee = Product.create!(code: "CF1", name: "Coffee", price_cents: 1123)

        products = [coffee, coffee, coffee]

        checkout = Checkout.new(products: products)
        expected_unit_price = (1123 * 2 / 3.0).round
        assert_equal expected_unit_price * 3, checkout.total_price_cents
    end

    test "mixed basket: GR1, CF1, SR1, CF1, CF1" do
        tea = Product.create!(code: "GR1", name: "Green Tea", price_cents: 311)
        strawberries = Product.create!(code: "SR1", name: "Strawberries", price_cents: 500)
        coffee = Product.create!(code: "CF1", name: "Coffee", price_cents: 1123)

        products = [tea, coffee, strawberries, coffee, coffee]

        checkout = Checkout.new(products: products)
        # tea = 311 (1 unit)
        # strawberries = 500 (less than 3)
        # coffee = 3 units at 2/3 price = 749 × 3 = 2247
        assert_equal 311 + 500 + 2247, checkout.total_price_cents  # => 3058
    end
end
