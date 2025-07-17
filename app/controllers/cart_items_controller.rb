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

            items << {
                code: product.code,
                name: product.name,
                quantity: quantity,
                price_cents: product.price_cents
            }
        end

            total_cents = Checkout.new(products: cart.cart_items.flat_map { |i| [i.product] * i.quantity }).total_price_cents

            render json: {
                cart_id: cart.id,
                items: items,
                total_cents: total_cents,
                message: "Cart created successfully."
            }, status: :created
    end


    def update
        cart = Cart.first
        cart_item = cart.cart_items.find_by(product: @product)

        if cart_item && cart_item.quantity > 0
        cart_item.quantity -= 1

        ActiveRecord::Base.transaction do
            if cart_item.quantity == 0
            cart_item.destroy
            else
            cart_item.save!
            end
        end

        render json: { message: "Cart item updated successfully." }
        else
        render json: { error: "Invalid cart item or quantity already zero." }, status: :unprocessable_entity
        end
    end

    private

    def set_product
        @product = Product.find_by(code: params[:product_code])
    end
end
