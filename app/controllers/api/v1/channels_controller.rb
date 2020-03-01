# frozen_string_literal: true

# Контроллер категорий
class Api::V1::ChannelsController < Api::V1::BaseController
  before_action :find_channel, only: %i[show update destroy]

  def index
    @channels = Channel.all.order(created_at: :desc)
    render 'index.json', status: :ok
  end

  def create
    BeaverClient::Channel.create(channel_params[:name])
    channel = Channel.create(channel_params)
    render json: channel, status: :created
  end

  def show
    render 'show.json', status: :ok
  end

  def update
    @channel.update(channel_params)

    render json: @channel, status: :ok
  end

  def destroy
    BeaverClient::Channel.delete(@channel.name)
    @channel.destroy

    head 204
  end

  private

  def channel_params
    params.require(:channel).permit(:name)
  end

  def find_channel
    @channel = Channel.find_by(id: params[:id])
  end
end
