Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check
  root "products#index"
  resources :carts, only: [:show]
  resources :cart_items, only: [:create, :destroy] do
    put :decrease, on: :collection
  end
end
