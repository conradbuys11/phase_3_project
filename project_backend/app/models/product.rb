#Reference: https://www.rubyguides.com/2015/12/ruby-time/

class Product < ApplicationRecord
  belongs_to :brand
  has_many :purchases
  has_many :users, through: :purchases

  def self.make_release_date
    release_date = Time.new.strftime("%A, %B %d @ %I:%M %p")
    print(release_date)
    return release_date
  end
end
