class CreateProducts < ActiveRecord::Migration[6.0]
  def change
    create_table :products do |t|
      t.string :name
      t.float :price
      t.string :category
      t.string :special_property
      t.string :color_primary
      t.string :color_secondary
      t.references :brand, null: false, foreign_key: true

      t.timestamps
    end
  end
end
