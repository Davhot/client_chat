# frozen_string_literal: true

# Работа с беседами через отправку запросов
module BeaverClient::Client
  class << self
    def create
      response = BeaverClient.send_request(
        url: ENV['BEAVER_URL'] + '/client',
        body: {},
        method: 'post'
      )
      raise response.inspect unless response[:valid] && response[:status] == 201

      response[:body]
    end

    def get(client_id)
      response = BeaverClient.send_request(
        url: ENV['BEAVER_URL'] + "/client/#{client_id}",
        body: {},
        method: 'get'
      )
      response[:body]
    end

    def delete(client_id)
      response = BeaverClient.send_request(
        url: ENV['BEAVER_URL'] + "/client/#{client_id}",
        body: {},
        method: 'delete'
      )
      raise response.inspect unless response[:valid] && response[:status] == 204

      true
    end

    def subscribe(client_id, channel_name)
      response = BeaverClient.send_request(
        url: ENV['BEAVER_URL'] + "/client/#{client_id}/subscribe",
        body: { channels: [channel_name] },
        method: 'put'
      )
      raise response.inspect unless response[:valid] && response[:status] == 200

      true
    end

    def unsubscribe(client_id, channel_name)
      response = BeaverClient.send_request(
        url: ENV['BEAVER_URL'] + "/client/#{client_id}/unsubscribe",
        body: { channels: [channel_name] },
        method: 'put'
      )
      raise response.inspect unless response[:valid] && response[:status] == 200

      true
    end
  end
end
