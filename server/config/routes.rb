require 'jsonapi/routing_ext'
UUID_regex = /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}(,[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})*/
Rails.application.routes.draw do
  #get 'welcome/index'
  namespace :api do
    jsonapi_resources :actions, constraints: {:id => UUID_regex}
    jsonapi_resources :attachments, constraints: {:id => UUID_regex}
    jsonapi_resources :comments, constraints: {:id => UUID_regex}
    jsonapi_resources :meetings, constraints: {:id => UUID_regex}
    jsonapi_resources :organizations, constraints: {:id => UUID_regex}
    jsonapi_resources :protocols, constraints: {:id => UUID_regex}
    jsonapi_resources :tops, constraints: {:id => UUID_regex}
    jsonapi_resources :inmails, constraints: {:id => UUID_regex}
  end
#  resources :organizations do
#    resources :tops do
#      resources :comments
#    end
#    resources :meetings do
#      resources :tops do
#        resources :comments
#      end
#    end
#  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/*path', to: 'application#index', format: false
  get '/', to: 'application#index', format: false
end
