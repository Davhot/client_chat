# frozen_string_literal: true

# Пользователь чата
class Client < ApplicationRecord
  has_and_belongs_to_many :channels
  belongs_to :user, required: true

  def self.create_beaver(params)
    create!(original_id: params['id'], token: params['token'], user_id: params[:user_id])
  end
end
