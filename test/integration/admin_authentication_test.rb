require "test_helper"

class AdminAuthenticationTest < ActionDispatch::IntegrationTest
  test "login page uses the restricted Unel access form" do
    get new_admin_session_url

    assert_response :success
    assert_select "h1", "Iniciar sesión"
    assert_select "form[action='#{admin_session_path}']"
    assert_select "a[href='#{new_admin_password_path}']"
    assert_select "p", text: /Acceso restringido/
  end

  test "public admin registration route does not exist" do
    assert_raises(ActionController::RoutingError) do
      Rails.application.routes.recognize_path("/admins/sign_up", method: :get)
    end
  end

  test "password recovery page uses the Unel authentication layout" do
    get new_admin_password_url

    assert_response :success
    assert_select "h1", "Restablecer contraseña"
    assert_select "form[action='#{admin_password_path}']"
  end

  test "admin signs in and is redirected to dashboard" do
    post admin_session_url, params: {
      admin: {
        email: admins(:one).email,
        password: "password123"
      }
    }

    assert_redirected_to admin_dashboard_path
  end
end
