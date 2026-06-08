class CreateProductSupplies < ActiveRecord::Migration[8.1]
  def change
    create_table :product_supplies do |t|
      t.references :product, null: false, foreign_key: true
      t.references :supply, null: false, foreign_key: true
      t.string :role, null: false
      t.decimal :quantity, null: false, default: 1

      t.timestamps
    end

    add_index :product_supplies, [:product_id, :role], unique: true
  end
end
