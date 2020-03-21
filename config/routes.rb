# frozen_string_literal: true

Rails.application.routes.draw do
  root 'static#index'
  namespace :api, constraints: { format: 'json' } do
    namespace :v1 do
      resources :channels
      resources :clients do
        member do
          put :subscribe
          put :unsubscribe
        end
      end
    end
  end
end
