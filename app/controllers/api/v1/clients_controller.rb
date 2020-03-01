# frozen_string_literal: true

# Контроллер категорий
class Api::V1::ClientsController < Api::V1::BaseController
  before_action :find_client, only: %i[show update destroy]

  def index
    @clients = Client.all.order(created_at: :desc)
    render 'index.json', status: :ok
  end

  def create
    # BeaverClient::Client.create(client_params[:name])
    client = Client.create(client_params)
    render json: client, status: :created
  end

  def show
    render 'show.json', status: :ok
  end

  def update
    @client.update(client_params)

    render json: @client, status: :ok
  end

  def destroy
    # BeaverClient::Client.delete(@client.name)
    @client.destroy

    head 204
  end

  private

  def client_params
    params.require(:client).permit(:name)
  end

  def find_client
    @client = Client.find_by(id: params[:id])
  end
end
