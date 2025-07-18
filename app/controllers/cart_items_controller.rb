class CartItemsController < ApplicationController
    before_action :set_product

    def create
        cart = Cart.create!(status: "open")

        params[:cart]&.each do |code, quantity_str|
            quantity = quantity_str.to_i
            next if quantity <= 0

            product = Product.find_by(code: code)
            next unless product

            item = cart.cart_items.find_or_initialize_by(product: product)
            item.quantity = quantity
            item.save!
    end

            render json: {
                cart_id: cart.id,
                message: "Cart created successfully."
            }, status: :created
    end

    private

    def set_product
        @product = Product.find_by(code: params[:product_code])
    end
end
