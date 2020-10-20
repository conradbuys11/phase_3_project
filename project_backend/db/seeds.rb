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

# def product_creator
#     firstWord = [
#         'Fabulous', 'Sizzlin', 'Fresh', 'Poppin', 'Radical', 'Chillin', 'Bodacious',
#         'Stylin', 'The Hotness', 'Funky'
#     ]
#     secondWord = [
#         'Sunglasses', 'Slides', 'Top', 'Shirt', 'Kicks', 'Tank', ''
#     ]
#     name = ""
#     name += 
# end

brand = Brand.create(name: "Test Brand")
brand2 = Brand.create(name: "Heat Strokes")

User.create(name: "Conrad")

Product.create(name: "Fabulous Funky Sunglasses", brand: brand, price: 4.54, category: "Accessory", color_primary: "Purple", quantity: 5, release_date: '2020-09-04 08:03:45 -0800')
Product.create(name: "Sizzlin Slides", brand: brand2, price: 11.94, category: "Shoes", color_primary: "Hot-Red", quantity: 17, release_date: Time.now)