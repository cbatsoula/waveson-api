class AddPhotoToNotes < ActiveRecord::Migration[5.2]
  def change
    add_column :notes, :photo, :string
  end
end
