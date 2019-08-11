class CreateNotes < ActiveRecord::Migration[5.2]
  def change
    create_table :notes do |t|
      t.string :note
      t.integer :user_id
      t.integer :beach_id


      t.timestamps
    end
  end
end
