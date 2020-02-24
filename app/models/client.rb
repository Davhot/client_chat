# frozen_string_literal: true

# Пользователь чата
class Client < ApplicationRecord
  has_and_belongs_to_many :channels
end
