# frozen_string_literal: true

# Работа с беседами через отправку запросов
module BeaverClient::Channel
  class << self
    def create(channel_name)
      body = {
        name: channel_name,
        type: 'public'
      }
      response = BeaverClient.send_request(
        url: ENV['BEAVER_URL'] + '/channel',
        body: body,
        method: 'post'
      )
      raise response[:body]['error'] unless response[:valid] && response[:status] == 201

      true
    end

    def get(channel_name)
      response = BeaverClient.send_request(
        url: ENV['BEAVER_URL'] + "/channel/#{channel_name}",
        method: 'get'
      )
      response[:body]
    end

    def delete(channel_name)
      response = BeaverClient.send_request(
        url: ENV['BEAVER_URL'] + "/channel/#{channel_name}",
        method: 'delete'
      )
      raise response[:body]['error'] unless response[:valid] && response[:status] == 204

      true
    end
  end
end
