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

  test "calculated_cost includes packaging supplies" do
    product = Product.create!(name: "Mermelada de mora", margin: 40)
    ingredient = Ingredient.create!(name: "Mora", unit_measure: "kg", cost_per_unit: 2000)
    jar = Supply.create!(name: "Frasco 250 ml", category: "jar", unit_measure: "unidad", cost_per_unit: 300)
    lid = Supply.create!(name: "Tapa 63 mm", category: "lid", unit_measure: "unidad", cost_per_unit: 80)
    label = Supply.create!(name: "Etiqueta mora", category: "label", unit_measure: "unidad", cost_per_unit: 50)

    product.recipe_items.create!(ingredient: ingredient, quantity: 0.5)
    product.product_supplies.create!(supply: jar, role: "jar", quantity: 1)
    product.product_supplies.create!(supply: lid, role: "lid", quantity: 1)
    product.product_supplies.create!(supply: label, role: "label", quantity: 1)

    assert_equal 1430, product.calculated_cost
  end

  test "stock_cost multiplies calculated cost by stock" do
    product = Product.create!(name: "Stock mermelada", margin: 40, stock: 20)
    jar = Supply.create!(name: "Frasco stock", category: "jar", unit_measure: "unidad", cost_per_unit: 300)

    product.product_supplies.create!(supply: jar, role: "jar", quantity: 1)

    assert_equal 6000, product.stock_cost
  end
end
