class ProductsController < ApplicationController
  def index
    @products = Product.all

    respond_to do |format|
      format.html # for the ruby view
      format.json { render json: @products, only: [:code, :name, :price_cents] }
    end
  end
end
