class ProductsController < ApplicationController
    def index
        render json: Product.all.to_json
    end

    def show
        render json: Product.find(params[:id]).to_json
    end

    def update
        product = Product.find(params[:id])
        #byebug
        product.update(quantity: params[:quantity])
        render json: product.to_json
    end

    def create
        product = Product.product_creator
        render json: product.to_json
    end

    private

end
