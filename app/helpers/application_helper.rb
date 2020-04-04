# frozen_string_literal: true

# Базовый хелпер приложения
module ApplicationHelper
  def flash_messages
    flash.map do |type, text|
      { id: text.object_id, type: type, text: text }
    end
  end
end
