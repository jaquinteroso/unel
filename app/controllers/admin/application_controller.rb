class Admin::ApplicationController < ApplicationController
  # Esta línea obliga a que tengas que iniciar sesión como Admin
  before_action :authenticate_admin!
  
  # Opcional pero recomendado: un layout distinto para el panel de control
  # layout 'admin' 
end
