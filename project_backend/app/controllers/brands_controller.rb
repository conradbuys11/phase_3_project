class BrandsController < ApplicationController
    def show
        render json: Brand.first.to_json
    end
end
