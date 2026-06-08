require "test_helper"

class Admin::SuppliesControllerTest < ActionDispatch::IntegrationTest
  setup do
    sign_in admins(:one)
  end

  test "should get index" do
    get admin_supplies_url
    assert_response :success
  end

  test "should get new" do
    get new_admin_supply_url
    assert_response :success
  end

  test "should get edit" do
    get edit_admin_supply_url(supplies(:jar))
    assert_response :success
  end

  test "should create supply" do
    assert_difference("Supply.count") do
      post admin_supplies_url, params: {
        supply: {
          name: "Frasco nuevo",
          category: "jar",
          size_description: "500 ml",
          unit_measure: "unidad",
          cost_per_unit: 450
        }
      }
    end

    assert_redirected_to admin_supplies_url
  end

  test "should update supply" do
    patch admin_supply_url(supplies(:jar)), params: {
      supply: {
        name: "Frasco actualizado",
        category: "jar",
        size_description: "250 ml",
        unit_measure: "unidad",
        cost_per_unit: 350
      }
    }

    assert_redirected_to admin_supplies_url
    assert_equal "Frasco actualizado", supplies(:jar).reload.name
  end
end
