require "test_helper"

class CartItemTest < ActiveSupport::TestCase
    def setup
        @cart = carts(:one)
        @product = products(:tea)
    end

    test "is valid with valid attributes" do
        item = CartItem.new(cart: @cart, product: @product, quantity: 2)
        assert item.valid?
    end

    test "is invalid without quantity" do
        item = CartItem.new(cart: @cart, product: @product)
        assert_not item.valid?
        assert_includes item.errors[:quantity], "is not a number"
    end

    test "is invalid with quantity <= 0" do
        item = CartItem.new(cart: @cart, product: @product, quantity: 0)
        assert_not item.valid?
        assert_includes item.errors[:quantity], "must be greater than 0"

        item.quantity = -1
        assert_not item.valid?
    end
end
