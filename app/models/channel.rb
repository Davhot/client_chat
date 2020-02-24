# frozen_string_literal: true

# Беседа
class Channel < ApplicationRecord
  has_and_belongs_to_many :clients

  validates :name, presence: true
end
