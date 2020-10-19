class ProductsController < ApplicationController
    def index
        render json: Product.all.to_json
    end

    def show
        render json: Product.find(params[:id]).to_json
    end
end
