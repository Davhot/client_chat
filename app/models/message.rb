# frozen_string_literal: true

# Сообщение в чате
class Message < ApplicationRecord
  belongs_to :client
  belongs_to :channel
end
