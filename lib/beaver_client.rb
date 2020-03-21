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
        response = HTTP.headers(headers).send(method, url, body: JSON.dump(body))

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
