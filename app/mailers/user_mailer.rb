# frozen_string_literal: true

# Класс отправки почты пользователю
class UserMailer < ApplicationMailer
  default from: ENV['NOTIFY_EMAIL']

  def welcome_email
    @user = params[:user]
    @url  = 'http://example.com/login'
    mail(to: @user.email, subject: 'Welcome to My Awesome Site')
  end
end
