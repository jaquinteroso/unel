class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  layout :layout_by_resource

  def after_sign_in_path_for(resource)
    return admin_dashboard_path if resource.is_a?(Admin)

    super
  end

  private

  def layout_by_resource
    devise_controller? ? "authentication" : "application"
  end
end
