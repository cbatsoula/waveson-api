Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  patch '/api/users/:id', to: "users#update"
  delete '/api/favs/:id', to: "favs#destroy"
  post '/signup', to: "users#create"
  post '/login', to: "auth#login"

  patch '/api/notes/:id', to: "notes#update"

  post '/api/beaches', to: "beaches#create"

  scope '/api' do
    resources :users
    resources :beaches
    resources :favs
    resources :notes
    resources :tags

    resources :note_tags
  end


end
