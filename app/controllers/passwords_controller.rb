# frozen_string_literal: true

# Переопределённый контроллер работы с паролем Devise
class PasswordsController < Devise::PasswordsController
  respond_to :json

  def send_password_instructions
    user = User.find_by(email: params['email'])
    if user.present?
      user.send_reset_password_instructions
      flash[:notice] = 'Письмо о смене пароля выслано на почту.'
      head 200
    else
      head 404
    end
  end
end
