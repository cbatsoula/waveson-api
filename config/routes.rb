Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :users
  resources :beaches
  resources :favs

  patch 'users/:id', to: "users#update"
  post '/signup', to: "users#create"
  post '/login', to: "auth#login"

  post 'beaches', to: "beaches#create"
end
