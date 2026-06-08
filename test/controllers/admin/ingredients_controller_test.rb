require "test_helper"

class Admin::IngredientsControllerTest < ActionDispatch::IntegrationTest
  setup do
    sign_in admins(:one)
  end

  test "should get index" do
    get admin_ingredients_url
    assert_response :success
  end

  test "should get new" do
    get new_admin_ingredient_url
    assert_response :success
  end

  test "should get edit" do
    get edit_admin_ingredient_url(ingredients(:one))
    assert_response :success
  end

  test "should explain why a used ingredient cannot be deleted" do
    assert_no_difference("Ingredient.count") do
      delete admin_ingredient_url(ingredients(:one))
    end

    assert_redirected_to admin_ingredients_url
    assert_equal "No se puede eliminar este ingrediente porque está siendo usado por uno o más productos.", flash[:alert]
  end
end
