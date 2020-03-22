# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users,
             path: '',
             path_names: {
               sign_in: 'login_api',
               sign_out: 'logout_api',
               registration: 'signup_api'
             },
             controllers: {
               sessions: 'sessions',
               registrations: 'registrations'
             }

  root 'static#index'

  namespace :api, constraints: { format: 'json' } do
    namespace :v1 do
      resources :channels
      resources :clients do
        member do
          put :subscribe
          put :unsubscribe
          post :send_message
        end
      end
    end
  end

  get '*page', to: 'static#index', constraints: ->(req) do
    !req.xhr? && req.format.html?
  end
end
