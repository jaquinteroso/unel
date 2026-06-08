require "test_helper"

class Admin::InventoryMovementsControllerTest < ActionDispatch::IntegrationTest
  setup do
    sign_in admins(:one)
  end

  test "should get index" do
    get admin_inventory_movements_url
    assert_response :success
  end

  test "should get new" do
    get new_admin_inventory_movement_url
    assert_response :success
  end
end
