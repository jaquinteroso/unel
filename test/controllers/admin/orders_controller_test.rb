require "test_helper"

class Admin::OrdersControllerTest < ActionDispatch::IntegrationTest
  setup do
    sign_in admins(:one)
  end

  test "should get index" do
    get admin_orders_url
    assert_response :success
  end

  test "should get show" do
    get admin_order_url(1)
    assert_response :success
  end
end
