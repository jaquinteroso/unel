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
          size_value: 500,
          size_unit: "ml",
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
        size_value: 250,
        size_unit: "ml",
        unit_measure: "unidad",
        cost_per_unit: 350
      }
    }

    assert_redirected_to admin_supplies_url
    assert_equal "Frasco actualizado", supplies(:jar).reload.name
  end

  test "should create label without size" do
    assert_difference("Supply.count") do
      post admin_supplies_url, params: {
        supply: {
          name: "Etiqueta QR tienda",
          category: "label",
          label_type: "qr",
          unit_measure: "unidad",
          cost_per_unit: 40
        }
      }
    end

    assert_redirected_to admin_supplies_url
  end

  test "should explain why a used supply cannot be deleted" do
    assert_no_difference("Supply.count") do
      delete admin_supply_url(supplies(:jar))
    end

    assert_redirected_to admin_supplies_url
    assert_equal "No se puede eliminar este insumo porque está siendo usado por uno o más productos.", flash[:alert]
  end
end
