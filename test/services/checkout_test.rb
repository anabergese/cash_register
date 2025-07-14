require "test_helper"

class CheckoutTest < ActiveSupport::TestCase
    def setup
        @tea = products(:tea)
        @strawberries = products(:strawberries)
        @coffee = products(:coffee)
    end

    test "green tea buy-one-get-one-free rule" do
        products = [ @tea, @tea ]
        total = Checkout.new(products: products).total_price_cents
        assert_equal 311, total  # pagas 1
    end

    test "strawberries bulk discount rule (3 or more at 4.50€)" do
        products = [ @strawberries, @strawberries, @strawberries ]
        total = Checkout.new(products: products).total_price_cents
        assert_equal 1350, total  # 3 × 450
    end

    test "coffees drop to 2/3 price when buying 3 or more" do
        unit_discount_price = (1123 * 2 / 3.0).round
        expected_total = unit_discount_price * 3
        products = [ @coffee, @coffee, @coffee ]

        total = Checkout.new(products: products).total_price_cents
        assert_equal expected_total, total
    end

    test "mixed basket: GR1, CF1, SR1, CF1, CF1" do
        products = [ @tea, @coffee, @strawberries, @coffee, @coffee ]
        total = Checkout.new(products: products).total_price_cents
        assert_equal 3058, total
    end

    test "order of scanned products does not affect total" do
        basket_1 = [ @tea, @coffee, @strawberries, @coffee, @coffee ]
        basket_2 = [ @coffee, @tea, @coffee, @strawberries, @coffee ]
        basket_3 = [ @coffee, @coffee, @strawberries, @tea, @coffee ]

        total = Checkout.new(products: basket_1).total_price_cents
        assert_equal total, Checkout.new(products: basket_2).total_price_cents
        assert_equal total, Checkout.new(products: basket_3).total_price_cents
    end
end
