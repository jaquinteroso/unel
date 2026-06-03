class CreateProducts < ActiveRecord::Migration[8.1]
  def change
    create_table :products do |t|
      t.string :name
      t.text :description
      t.integer :cost
      t.integer :price
      t.integer :stock
      t.integer :margin

      t.timestamps
    end
  end
end
