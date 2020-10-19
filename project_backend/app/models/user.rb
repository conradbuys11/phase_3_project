class User < ApplicationRecord
    has_many :purchases
    has_many :products, through: :purchases
end
