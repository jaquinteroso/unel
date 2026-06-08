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
end
