require "test_helper"

class CartTest < ActiveSupport::TestCase
  test "can have multiple cart items" do
    cart = carts(:one)

    expected = [products(:tea), products(:coffee)].sort_by(&:code)
    actual   = cart.products.uniq.sort_by(&:code)

    assert_equal expected, actual
  end
end


# Usamos carts(:one) para acceder al fixture del carrito
# Verificamos que tenga 2 cart_items
# Comprobamos que los productos asociados sean los esperados
# Usamos sort_by para que el orden no cause fallos si Rails cambia el orden de retorno