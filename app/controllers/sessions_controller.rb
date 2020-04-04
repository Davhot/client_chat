# frozen_string_literal: true

# Переопределённый контроллер Devise
class SessionsController < Devise::SessionsController
  respond_to :json

  private

  def respond_with(resource, _opts = {})
    flash.now[:success] = 'Вы успешно вошли!'
    render json: resource
  end

  def respond_to_on_destroy
    head :no_content
  end
end
