# frozen_string_literal: true

# Сообщение в чате
class Message < ApplicationRecord
  belongs_to :client
  belongs_to :channel, required: false

  before_create :check_client_channel_association

  def check_client_channel_association
    client.channels.exists?(channel.id)
  end
end
