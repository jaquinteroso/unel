Rails.application.routes.draw do
  # 1. AUTENTICACIÓN
  devise_for :admins

  # 2. MUNDO PÚBLICO (La Vitrina - Lo que diseña Pedro)
  root "products#index" 
  resources :products, only: [:index, :show]

  # 3. MUNDO PRIVADO (El Panel de UNEL - Donde tú programas)
  namespace :admin do
    get 'dashboard', to: 'dashboard#index'
    
    resources :products
    resources :ingredients, except: [:show]
    resources :supplies, except: [:show]
    resources :inventory_movements, only: [:index, :new, :create]
    resources :finances, only: [:index]
    resources :customers, only: [:index, :show]
    resources :orders, only: [:index, :show, :update]
  end
end
