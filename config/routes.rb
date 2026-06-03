Rails.application.routes.draw do
  # 1. AUTENTICACIÓN
  devise_for :admins

  # 2. MUNDO PÚBLICO (La Vitrina - Lo que diseña Pedro)
  # ¡Aquí configuramos la página de inicio!
  root "products#index" 
  
  # Rutas para ver el catálogo y el detalle de una conserva
  resources :products, only: [:index, :show]

  # 3. MUNDO PRIVADO (El Panel de UNEL - Donde tú programas)
  namespace :admin do
    # Esto genera automáticamente todas las rutas CRUD (Crear, Leer, Actualizar, Borrar)
    resources :products
    
    # Si quieres que el admin tenga un dashboard inicial al entrar a /admin
    # get 'dashboard', to: 'dashboard#index'
  end
end
