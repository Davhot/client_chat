# frozen_string_literal: true

Rails.application.routes.draw do
  root 'static#index'

  devise_for :users,
             path: '',
             path_names: {
               sign_in: 'login_api',
               sign_out: 'logout_api',
               registration: 'signup_api'
             },
             controllers: {
               sessions: 'sessions',
               registrations: 'registrations',
               confirmations: 'confirmations',
               passwords: 'passwords'
             }

  devise_scope :user do
    patch 'confirmations/resend_email'
    patch 'passwords/send_password_instructions'
  end

  namespace :api, constraints: { format: 'json' } do
    namespace :v1 do
      resources :channels do
        collection do
          get :send_email
        end
      end
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
