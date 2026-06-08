class AddQuantityUnitToRecipeItems < ActiveRecord::Migration[8.1]
  def change
    add_column :recipe_items, :quantity_unit, :string
  end
end
