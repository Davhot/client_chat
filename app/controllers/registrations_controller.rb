# frozen_string_literal: true

# Переопределённый контроллер Devise
class RegistrationsController < Devise::RegistrationsController
  respond_to :json

  # Данный метод нужен, чтобы не вызывать флеш сообщения из стандрартной реализации
  def create
    build_resource(sign_up_params)

    resource.save
    sign_in(resource)
    render_resource(resource)
  end
end
