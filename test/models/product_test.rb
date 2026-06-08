require "test_helper"

class ProductTest < ActiveSupport::TestCase
  test "calculated_cost is zero when product has no recipe items" do
    product = Product.create!(name: "Conserva sin receta", margin: 30)

    assert_equal 0, product.calculated_cost
  end

  test "calculated_cost sums recipe item quantities by ingredient unit cost" do
    product = Product.create!(name: "Conserva de prueba", margin: 30)
    ingredient_one = Ingredient.create!(name: "Cholgas", unit_measure: "kg", cost_per_unit: 3000)
    ingredient_two = Ingredient.create!(name: "Aceite", unit_measure: "ml", cost_per_unit: 20)

    product.recipe_items.create!(ingredient: ingredient_one, quantity: 2)
    product.recipe_items.create!(ingredient: ingredient_two, quantity: 50)

    assert_equal 7000, product.calculated_cost
  end

  test "suggested_price uses calculated cost and margin" do
    product = Product.create!(name: "Conserva con margen", cost: 100, margin: 40)
    ingredient = Ingredient.create!(name: "Navajuelas", unit_measure: "kg", cost_per_unit: 2500)

    product.recipe_items.create!(ingredient: ingredient, quantity: 2)

    assert_equal 7000, product.suggested_price
  end
end
