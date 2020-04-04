# frozen_string_literal: true

# Базовый контроллер
class Api::V1::BaseController < ApplicationController
  include ErrorHandling

  before_action :authenticate_user!

  private

  # Для явного указания таймзоны
  def set_time_zone
    raise 'not exist timezone' if params[:timezone].present? && !PgTimezoneName.exists?(params[:timezone])

    Time.zone = params[:timezone].present? ? params[:timezone] : MobuApi::Application.config.time_zone
  rescue StandardError => e
    render json: { errors: e.message }, status: :error
  end
end
