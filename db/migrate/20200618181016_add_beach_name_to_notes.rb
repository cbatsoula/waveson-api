class AddBeachNameToNotes < ActiveRecord::Migration[5.2]
  def change
    add_column :notes, :beach_name, :string
  end
end
