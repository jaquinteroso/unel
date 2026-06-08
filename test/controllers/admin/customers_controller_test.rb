require "test_helper"

class Admin::CustomersControllerTest < ActionDispatch::IntegrationTest
  setup do
    sign_in admins(:one)
  end

  test "should get index" do
    get admin_customers_url
    assert_response :success
  end

  test "should get show" do
    get admin_customer_url(1)
    assert_response :success
  end
end
