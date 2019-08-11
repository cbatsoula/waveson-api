class CreateBeaches < ActiveRecord::Migration[5.2]
  def change
    create_table :beaches do |t|
      t.string :lng
      t.string :name
      t.string :lat
      t.string :vicinity

      t.timestamps
    end
  end
end
