class CreateSupplies < ActiveRecord::Migration[8.1]
  def change
    create_table :supplies do |t|
      t.string :name, null: false
      t.string :category, null: false
      t.string :size_description
      t.string :unit_measure, null: false
      t.integer :cost_per_unit, null: false, default: 0

      t.timestamps
    end

    add_index :supplies, :category
    add_index :supplies, [:name, :category], unique: true
  end
end
