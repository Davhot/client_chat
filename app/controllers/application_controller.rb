# frozen_string_literal: true

# Базовый класс контроллеров
class ApplicationController < ActionController::Base
  protect_from_forgery unless: :json_request?

  def render_resource(resource)
    if resource.errors.empty?
      render json: resource
    else
      validation_error(resource)
    end
  end

  def validation_error(resource)
    render json: {
      errors: [
        {
          status: '400',
          title: 'Bad Request',
          detail: resource.errors,
          code: '100'
        }
      ]
    }, status: :bad_request
  end

  def json_request?
    request.format.json?
  end
end
