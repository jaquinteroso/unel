class AddLabelTypeToSupplies < ActiveRecord::Migration[8.1]
  def change
    add_column :supplies, :label_type, :string
    add_index :supplies, :label_type
  end
end
