class AddPhotoIdToProduct < ActiveRecord::Migration[6.0]
  def change
    add_column :products, :photo_id, :int
  end
end
