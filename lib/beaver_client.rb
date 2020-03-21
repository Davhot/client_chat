# frozen_string_literal: true

# Коннект к Beaver
module BeaverClient
  class << self
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
        if response.try(:body).present?
          body = response.body.to_s
          body = JSON.parse(body).to_h if body.present?
        else
          body = nil
        end
        { body: body, status: response.status, valid: true }
      rescue StandardError => e
        Rails.logger.error "[#{self}]: #{e.message} | #{e.backtrace[0]}"
        { valid: false }
      end
    end
  end
end
