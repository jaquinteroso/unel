Rails.application.routes.draw do
  devise_for :admins
  
  # MUNDO PRIVADO (Panel de UNEL)
  # Todas las URLs empezarán con /admin/...
  namespace :admin do
    # Aquí irán los resources protegidos más adelante, ej:
    # resources :products
  end

  # MUNDO PÚBLICO (Clientes)
  # Aquí irán las rutas normales que hará Pedro
  # resources :products, only: [:index, :show]

  # Defines cuál es la portada de la página web (la dejaremos comentada por ahora)
  # root "pages#home"
end
