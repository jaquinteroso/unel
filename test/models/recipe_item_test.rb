require "test_helper"

class RecipeItemTest < ActiveSupport::TestCase
  test "calculates cost converting grams to kilograms" do
    product = Product.create!(name: "Mermelada", margin: 40)
    ingredient = Ingredient.create!(name: "Mora", unit_measure: "kg", cost_per_unit: 2000)
    recipe_item = RecipeItem.new(product: product, ingredient: ingredient, quantity: 500, quantity_unit: "g")

    assert_equal 1000, recipe_item.calculated_cost
  end

  test "rejects incompatible quantity unit" do
    product = Product.create!(name: "Mermelada", margin: 40)
    ingredient = Ingredient.create!(name: "Mora", unit_measure: "kg", cost_per_unit: 2000)
    recipe_item = RecipeItem.new(product: product, ingredient: ingredient, quantity: 500, quantity_unit: "ml")

    assert_not recipe_item.valid?
    assert recipe_item.errors[:quantity_unit].any?
  end
end
