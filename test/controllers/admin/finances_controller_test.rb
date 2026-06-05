require "test_helper"

class Admin::FinancesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get admin_finances_index_url
    assert_response :success
  end
end
