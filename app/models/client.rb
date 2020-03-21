# frozen_string_literal: true

# Пользователь чата
class Client < ApplicationRecord
  has_and_belongs_to_many :channels

  def self.create_beaver(params)
    create!(original_id: params['id'], token: params['token'])
  end
end
