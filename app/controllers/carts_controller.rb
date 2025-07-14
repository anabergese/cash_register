class CartsController < ApplicationController
    def show
      @cart = Cart.find(params[:id])

      products = @cart.cart_items.flat_map { |item| [ item.product ] * item.quantity }
      @total_cents = Checkout.new(products: products).total_price_cents
    end
end
