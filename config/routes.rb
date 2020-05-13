Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :users
  resources :beaches
  resources :favs
  resources :notes
  resources :tags

  resources :note_tags

  patch '/users/:id', to: "users#update"
  delete '/favs/:id', to: "favs#destroy"
  post '/signup', to: "users#create"
  post '/login', to: "auth#login"

  patch '/notes/:id', to: "notes#update"

  post 'beaches', to: "beaches#create"
  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end

end
