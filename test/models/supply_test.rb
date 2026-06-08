require "test_helper"

class SupplyTest < ActiveSupport::TestCase
  test "is valid with valid attributes" do
    supply = Supply.new(
      name: "Frasco prueba",
      category: "jar",
      size_value: 250,
      size_unit: "ml",
      unit_measure: "unidad",
      cost_per_unit: 100
    )

    assert supply.valid?
  end

  test "requires a valid category" do
    supply = Supply.new(
      name: "Insumo invalido",
      category: "box",
      size_value: 250,
      size_unit: "ml",
      unit_measure: "unidad",
      cost_per_unit: 100
    )

    assert_not supply.valid?
    assert supply.errors[:category].any?
  end

  test "effective_unit_cost divides pack cost by pack quantity" do
    supply = Supply.new(
      name: "Pack frascos",
      category: "jar",
      size_value: 250,
      size_unit: "ml",
      unit_measure: "pack",
      pack_quantity: 12,
      cost_per_unit: 3600
    )

    assert_equal 300, supply.effective_unit_cost
  end

  test "pack quantity is required when unit measure is pack" do
    supply = Supply.new(
      name: "Pack sin cantidad",
      category: "jar",
      size_value: 250,
      size_unit: "ml",
      unit_measure: "pack",
      cost_per_unit: 3600
    )

    assert_not supply.valid?
    assert supply.errors[:pack_quantity].any?
  end

  test "label is valid without size when label type is present" do
    supply = Supply.new(
      name: "Etiqueta QR especial",
      category: "label",
      label_type: "qr",
      unit_measure: "unidad",
      cost_per_unit: 40
    )

    assert supply.valid?
    assert_equal "QR", supply.descriptor
  end

  test "label requires label type" do
    supply = Supply.new(
      name: "Etiqueta sin tipo",
      category: "label",
      unit_measure: "unidad",
      cost_per_unit: 40
    )

    assert_not supply.valid?
    assert supply.errors[:label_type].any?
  end
end
