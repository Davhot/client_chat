# frozen_string_literal: true

# Беседа
class Channel < ApplicationRecord
  has_and_belongs_to_many :clients
  has_many :messages, dependent: :nullify

  validates :name, presence: true
end
