# frozen_string_literal: true

# Переопределённый контроллер подтверждения почты Devise
class ConfirmationsController < Devise::ConfirmationsController
  respond_to :json

  def show
    self.resource = resource_class.confirm_by_token(params[:confirmation_token])
    yield resource if block_given?

    if resource.errors.empty?
      set_flash_message!(:notice, :confirmed)
      respond_with_navigational(resource) { redirect_to after_confirmation_path_for(resource_name, resource) }
    else
      flash[:notice] = resource.errors.full_messages.join("\n")
      redirect_to root_path
    end
  end

  def resend_email
    user = User.find_by(email: params['email'])
    if user.present?
      user.send_confirmation_instructions
      flash[:notice] = 'Письмо о подтверждении email выслано на почту.'
      head 200
    else
      head 404
    end
  end

  private

  def after_confirmation_path_for(_resource_name, resource)
    sign_in(resource) unless user_signed_in?
    root_path
  end
end
