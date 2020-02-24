# frozen_string_literal: true

# Модуль обработки ошибок приложения
module ErrorHandling
  extend ActiveSupport::Concern

  included do
    rescue_from Exception do |error|
      handle_exception error
    end
  end

  protected

  def handle_exception(error = nil)
    case error
    when ActiveRecord::RecordNotFound, ActionController::ParameterMissing
      render json: { error: error.message }, status: :not_found
    when StandardError
      render json: { error: error.message, bt: error.backtrace }, status: 500
    else
      render json: { message: error.message }, status: :unprocessable_entity
    end
  end
end
