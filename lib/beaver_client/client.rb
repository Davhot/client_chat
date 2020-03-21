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

    def get(client_name)
      response = BeaverClient.send_request(
        url: ENV['BEAVER_URL'] + "/client/#{client_name}",
        body: {},
        method: 'get'
      )
      response[:body]
    end

    def delete(client_name)
      response = BeaverClient.send_request(
        url: ENV['BEAVER_URL'] + "/client/#{client_name}",
        body: {},
        method: 'delete'
      )
      raise response.inspect unless response[:valid] && response[:status] == 204

      true
    end
  end
end
