Rails.application.routes.draw do
  #get 'welcome/index'
  namespace :api do
    jsonapi_resources :actions
    jsonapi_resources :attachments
    jsonapi_resources :comments
    jsonapi_resources :meetings
    jsonapi_resources :organizations
    jsonapi_resources :protocols
    jsonapi_resources :tops
    jsonapi_resources :inmails
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
