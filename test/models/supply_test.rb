require "test_helper"

class SupplyTest < ActiveSupport::TestCase
  test "is valid with valid attributes" do
    supply = Supply.new(
      name: "Frasco prueba",
      category: "jar",
      unit_measure: "unidad",
      cost_per_unit: 100
    )

    assert supply.valid?
  end

  test "requires a valid category" do
    supply = Supply.new(
      name: "Insumo invalido",
      category: "box",
      unit_measure: "unidad",
      cost_per_unit: 100
    )

    assert_not supply.valid?
    assert supply.errors[:category].any?
  end
end
