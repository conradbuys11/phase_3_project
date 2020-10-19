class Product < ApplicationRecord
  belongs_to :brand
  has_many :purchases
  has_many :users, through: :purchases
end
