require "test_helper"

class Admin::FinancesControllerTest < ActionDispatch::IntegrationTest
  setup do
    sign_in admins(:one)
  end

  test "should get index" do
    get admin_finances_url
    assert_response :success
  end
end
