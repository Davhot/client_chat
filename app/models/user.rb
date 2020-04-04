# frozen_string_literal: true

# Модель пользователя
class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :jwt_authenticatable, :registerable,
         jwt_revocation_strategy: JwtBlacklist

  self.skip_session_storage = %i[http_auth params_auth]

  has_one :client, required: false
end
