class AddStructuredSizeAndPackToSupplies < ActiveRecord::Migration[8.1]
  def change
    add_column :supplies, :size_value, :integer
    add_column :supplies, :size_unit, :string
    add_column :supplies, :pack_quantity, :integer
  end
end
