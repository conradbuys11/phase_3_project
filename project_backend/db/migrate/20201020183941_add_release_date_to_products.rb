class AddReleaseDateToProducts < ActiveRecord::Migration[6.0]
  def change
    add_column :products, :release_date, :string
  end
end
