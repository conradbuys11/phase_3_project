#Reference: https://www.rubyguides.com/2015/12/ruby-time/

class Product < ApplicationRecord
  belongs_to :brand
  has_many :purchases
  has_many :users, through: :purchases

  def self.name_creator
    firstWord = [
        'Fabulous', 'Sizzlin', 'Fresh', 'Poppin', 'Radical', 'Chillin', 'Bodacious',
        'Stylin', 'The Hotness', 'Funky'
    ]
    secondWord = [
        'Sunglasses', 'Slides', 'Top', 'Shirt', 'Kicks', 'Tank', 'Jeans', 'Slacks', 'Watch'
    ]
    name = ""
    name += firstWord.sample + " "
    if rand() > 0.75
        name += firstWord.sample + " "
    end
    name += secondWord.sample
    return name
  end

  def self.date_creator
    nums = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30',
    '31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59']
    return "2020-#{nums[0..11].sample}-#{nums[0..30].sample} #{nums[0..22].sample}:#{nums.sample}:#{nums.sample} -0800"
  end

  def self.category_creator(name = nil)
    if name != nil
      last_word = name.split(' ')[-1]
      if last_word == 'Sunglasses' || last_word == 'Watch'
        return 'Accessory'
      elsif last_word == 'Slides' || last_word == 'Kicks'
        return 'Shoes'
      elsif last_word == 'Top' || last_word == 'Shirt' || last_word == 'Tank'
        return 'Shirt'
      elsif last_word == 'Jeans' || last_word == 'Slacks'
        return 'Pants'
      end
    end
    return ["Shirt", "Pants", "Accessory", "Shoes"].sample
  end

  def self.color_creator
      return ["Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Pink", "Black", "Brown", "White", "Mahogany",
      "Lilac", "Cool Red", "Salmon", "Royal Blue", "Royal Purple", "Grey", "Gray", "Lavender"].sample
  end

  def self.product_creator
    name = Product.name_creator
    Product.create(name: name, brand: Brand.first, price: "#{rand(0..200)}.#{rand(0..99)}".to_f, category: Product.category_creator(name), color_primary: Product.color_creator, quantity: rand(4..25), release_date: Product.date_creator, photo_id: rand(0..12))
  end

  def self.make_release_date
    release_date = Time.new.strftime("%A, %B %d @ %I:%M %p")
    print(release_date)
    return release_date
  end
end
