class CartsController < ApplicationController
  def show
    cart = Cart.find(params[:id])
    items = cart.cart_items.includes(:product).map do |item|
      {
        code: item.product.code,
        name: item.product.name,
        quantity: item.quantity,
        price_cents: item.product.price_cents
      }
    end

    total_cents = Checkout.new(products: cart.cart_items.flat_map { |i| [i.product] * i.quantity }).total_price_cents

    respond_to do |format|
      format.html { @cart = cart; @total_cents = total_cents } # for view in Rails
      format.json { render json: { items: items, total_cents: total_cents } }
    end
  end
end
