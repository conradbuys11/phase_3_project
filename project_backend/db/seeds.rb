# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Product.destroy_all
Brand.destroy_all
User.destroy_all
Purchase.destroy_all


brand = Brand.create(name: "Test Brand")

User.create(name: "Conrad")

Product.create(name: "Fabulous Funky Sunglasses", brand: brand, price: 4.54, category: "Accessory", color_primary: "Purple", quantity: 5)