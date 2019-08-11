Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :users
  resources :beaches

  patch 'users/:id', to: "users#update"

  post 'beaches', to: "beaches#create"
end
