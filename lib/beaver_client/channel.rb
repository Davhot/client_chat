# frozen_string_literal: true

# Работа с беседами через отправку запросов
module BeaverClient::Channel
  class << self
    def create(channel_name)
      body = {
        name: channel_name,
        type: 'public'
      }
      response = send_request(
        url: ENV['BEAVER_URL'] + '/channel',
        body: body,
        method: 'post'
      )
      response[:valid] && response[:status] == 201
    end

    def get(channel_name)
      response = send_request(
        url: ENV['BEAVER_URL'] + "/channel/#{channel_name}",
        method: 'get'
      )
      response[:body]
    end

    def delete(channel_name)
      response = send_request(
        url: ENV['BEAVER_URL'] + "/channel/#{channel_name}",
        method: 'delete'
      )
      response[:valid] && response[:status] == 204
    end

    private

    def send_request(url:, body: '', method:)
      headers = {
        'Content-Type' => 'application/json',
        'X-AUTH-TOKEN' => ENV['BEAVER_TOKEN']
      }
      begin
        response = HTTP.headers(headers)
        response =
          case method
          when 'post'
            response.post(url, body: JSON.dump(body))
          when 'get'
            response.get(url, body: JSON.dump(body))
          when 'delete'
            response.delete(url, body: JSON.dump(body))
          end
        body = response.body.readpartial
        body = JSON.parse(body).to_h if body.present?
        { body: body, status: response.status, valid: true }
      rescue StandardError => e
        Rails.logger.error "[#{self}]: #{e.message} | #{e.backtrace[0]}"
        { valid: false }
      end
    end
  end
end
