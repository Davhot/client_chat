# frozen_string_literal: true

# Хелпер для тестирования API
module ApiHelper
  def body
    JSON.parse(response.body).to_h
  end
end
