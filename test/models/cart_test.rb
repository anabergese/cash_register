require "test_helper"

class CartTest < ActiveSupport::TestCase
  test "can have multiple cart items" do
    cart = carts(:one)

    expected = [products(:tea), products(:strawberries), products(:coffee)].sort_by(&:code)
    actual   = cart.products.uniq.sort_by(&:code)

    assert_equal expected, actual
  end
end