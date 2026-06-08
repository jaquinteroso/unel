class AllowMultipleLabelsPerProduct < ActiveRecord::Migration[8.1]
  def change
    remove_index :product_supplies, [:product_id, :role]
    add_index :product_supplies, [:product_id, :supply_id], unique: true
  end
end
