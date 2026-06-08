require "test_helper"

class ProductSupplyTest < ActiveSupport::TestCase
  test "is valid when supply category matches role" do
    product_supply = ProductSupply.new(
      product: products(:two),
      supply: supplies(:jar),
      role: "jar",
      quantity: 1
    )

    assert product_supply.valid?
  end

  test "is invalid when supply category does not match role" do
    product_supply = ProductSupply.new(
      product: products(:two),
      supply: supplies(:lid),
      role: "jar",
      quantity: 1
    )

    assert_not product_supply.valid?
    assert_includes product_supply.errors[:supply], "debe corresponder al tipo Frasco"
  end

  test "allows multiple different labels for one product" do
    product = products(:two)
    front_label = ProductSupply.new(product: product, supply: supplies(:label), role: "label", quantity: 1)
    qr_label = ProductSupply.new(product: product, supply: supplies(:qr_label), role: "label", quantity: 1)

    assert front_label.save
    assert qr_label.valid?
  end

  test "does not allow two jars for one product" do
    product = products(:two)
    first_jar = ProductSupply.create!(product: product, supply: supplies(:jar), role: "jar", quantity: 1)
    another_jar = Supply.create!(name: "Otro frasco", category: "jar", size_value: 500, size_unit: "ml", unit_measure: "unidad", cost_per_unit: 400)
    duplicate = ProductSupply.new(product: product, supply: another_jar, role: "jar", quantity: 1)

    assert first_jar.persisted?
    assert_not duplicate.valid?
    assert duplicate.errors[:role].any?
  end
end
