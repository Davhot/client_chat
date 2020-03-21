# frozen_string_literal: true

# Контроллер категорий
class Api::V1::ClientsController < Api::V1::BaseController
  before_action :find_client, only: %i[show destroy]

  def index
    @clients = Client.all.order(created_at: :desc)
    render 'index.json', status: :ok
  end

  # TODO: при выполнении запроса передавать id пользователя (User)
  def create
    beaver_client = BeaverClient::Client.create
    client = Client.create_beaver(beaver_client)
    render json: client, status: :created
  end

  def show
    render 'show.json', status: :ok
  end

  def destroy
    BeaverClient::Client.delete(@client.original_id)
    @client.destroy

    head 204
  end

  private

  def find_client
    @client = Client.find_by(id: params[:id])
  end
end
