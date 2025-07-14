class CartItemsController < ApplicationController
    before_action :set_product

    def create
        @cart = Cart.first_or_create!(status: "open")

        params[:cart]&.each do |code, quantity_str|
            quantity = quantity_str.to_i
            next if quantity <= 0

            product = Product.find_by(code: code)
            next unless product

            item = @cart.cart_items.find_or_initialize_by(product: product)
            item.quantity = quantity
            item.save!
        end

        redirect_to cart_path(@cart)
    end


    def update
        @cart = Cart.first
        @cart_item = @cart.cart_items.find_by(product: @product)

        if @cart_item && @cart_item.quantity > 0
            @cart_item.quantity -= 1

            ActiveRecord::Base.transaction do
            if @cart_item.quantity == 0
                @cart_item.destroy
            else
                @cart_item.save!
            end
            end

            respond_to do |format|
            format.turbo_stream
            format.html { redirect_to root_path }
            end
        else
            head :unprocessable_entity
        end
    end

    private

    def set_product
        @product = Product.find_by(code: params[:product_code])
    end
end
