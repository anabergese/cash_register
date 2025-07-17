class ProductsController < ApplicationController
  def index
    products = Product.select(:code, :name, :price_cents)
    render json: products
  end
end
