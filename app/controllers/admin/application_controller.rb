class Admin::ApplicationController < ApplicationController
  # before_action :authenticate_admin!

  # Le decimos a Rails que use el archivo admin.html.erb
  layout "admin"
end
