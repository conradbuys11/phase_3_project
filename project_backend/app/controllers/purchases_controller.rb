class PurchasesController < ApplicationController
    def create
        purchase = Purchase.new(strong_params)
        if purchase.save
            render json: purchase.to_json
        else
            render json: false.to_json
        end
    end

    private

    def strong_params
        params.require(:purchase).permit(:product_id, :user_id)
    end
end
