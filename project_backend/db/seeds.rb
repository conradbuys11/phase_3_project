# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Purchase.destroy_all
Product.destroy_all
User.destroy_all
Brand.destroy_all

# def name_creator
#     firstWord = [
#         'Fabulous', 'Sizzlin', 'Fresh', 'Poppin', 'Radical', 'Chillin', 'Bodacious',
#         'Stylin', 'The Hotness', 'Funky'
#     ]
#     secondWord = [
#         'Sunglasses', 'Slides', 'Top', 'Shirt', 'Kicks', 'Tank', 'Jeans'
#     ]
#     name = ""
#     name += firstWord.sample + " "
#     if rand() > 0.5
#         name += firstWord.sample + " "
#     end
#     name += secondWord.sample
#     return name
# end

# def date_creator
#     nums = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30',
#     '31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59']
#     return "2020-#{nums[0..11].sample}-#{nums[0..30].sample} #{nums[0..22].sample}:#{nums.sample}:#{nums.sample} -0800"
# end

# def category_creator
#     return ["Shirt", "Pants", "Accessory", "Shoes"].sample
# end

# def color_creator
#     return ["Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Pink", "Black", "Brown", "White", "Mahogany",
#     "Lilac", "Cool Red", "Salmon", "Royal Blue", "Royal Purple", "Grey", "Gray", "Lavender"].sample
# end

# def product_creator
#     Product.create(name: name_creator, brand: brand, price: "#{rand(0..200)}.#{rand(0..99)}".to_f, category: category_creator, color_primary: color_creator, quantity: rand(4..25), release_date: date_creator)
# end

#added the above logic to the Product class

brand = Brand.create(name: "Test Brand")
brand2 = Brand.create(name: "Heat Strokes")

User.create(name: "Conrad")

13.times do
    Product.product_creator
end
Product.create(name: "Fabulous Funky Sunglasses", brand: brand, price: 4.54, category: "Accessory", color_primary: "Purple", quantity: 5, release_date: '2020-09-04 08:03:45 -0800', photo_id: rand(0..12))
Product.create(name: "Sizzlin Slides", brand: brand2, price: 11.94, category: "Shoes", color_primary: "Hot-Red", quantity: 17, release_date: Time.now, photo_id: rand(0..12))