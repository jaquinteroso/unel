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
    get "orders/index"
    get "orders/show"
    get "customers/index"
    get "customers/show"
    get "finances/index"
    get "inventory_movements/index"
    get "inventory_movements/new"
    get "ingredients/index"
    get "ingredients/new"
    get "ingredients/edit"
    get "dashboard/index"
    # Esto genera automáticamente todas las rutas CRUD (Crear, Leer, Actualizar, Borrar)
    resources :products
    
    # Si quieres que el admin tenga un dashboard inicial al entrar a /admin
    # get 'dashboard', to: 'dashboard#index'
  end
end
