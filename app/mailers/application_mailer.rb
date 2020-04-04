# frozen_string_literal: true

# Базовый класс отправки почты
class ApplicationMailer < ActionMailer::Base
  default from: 'from@example.com'
  layout 'mailer'
end
