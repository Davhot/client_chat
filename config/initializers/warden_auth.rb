# frozen_string_literal: true

Warden::JWTAuth.configure do |config|
  config.secret = ENV['DEVISE_JWT_SECRET_KEY']
  config.dispatch_requests = [
    ['POST', %r{^/login_api$}],
    ['POST', %r{^/signup_api$}]
  ]
  config.revocation_requests = [
    ['DELETE', %r{^/logout_api$}],
    ['DELETE', %r{^/logout_api.json$}]
  ]
end
