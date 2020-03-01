# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::ClientsController, type: :controller do
  render_views

  include ApiHelper

  let(:client) { create(:client) }

  before(:each) do
    stub_request(:any, "#{ENV['BEAVER_URL']}/client")
      .to_return(status: 201, body: '', headers: {})
  end

  describe 'POST create' do
    it 'render status 200' do
      post :create, params: { client: { name: 'client_1' } }
      expect(response).to have_http_status(:success)
    end

    it 'check create' do
      post :create, params: { client: { name: 'client_1' } }
      expect(Client.count).to eq(1)
    end
  end

  describe 'Get #show' do
    it 'render status 200' do
      get :show, params: { id: client.id }
      expect(response).to have_http_status(:success)
    end

    it 'check format' do
      get :show, params: { id: client.id, format: :json }
      data = body.keys
      expect_fields = %w[id name]
      expect(data).to match_array(expect_fields)
      expect(data.size).to eq(2)
    end
  end

  describe 'Get #index' do
    it 'render status 200' do
      get :index, format: :json
      expect(response).to have_http_status(:success)
    end

    it 'check format' do
      2.times { create :client }

      get :index, format: :json

      data = body['data'][0].keys
      expect_fields = %w[id name]
      expect(data).to match_array(expect_fields)
      expect(data.size).to eq(2)
    end
  end

  describe 'Put #update' do
    it 'render status 200' do
      put :update, params: { id: client.id, client: { name: 'client_2' } }
      expect(response).to have_http_status(:success)
    end

    it 'check update client' do
      put :update, params: { id: client.id, client: { name: 'client_2' } }

      expect(Client.last.name).to eq('client_2')
    end
  end

  describe 'Delete #destroy' do
    it 'render status 200' do
      stub_request(:delete, "#{ENV['BEAVER_URL']}/client/#{client.name}")
        .to_return(status: 204, body: '', headers: {})

      delete :destroy, params: { id: client.id }
      expect(response).to have_http_status(:success)
    end

    it 'check destroy client' do
      stub_request(:delete, "#{ENV['BEAVER_URL']}/client/#{client.name}")
        .to_return(status: 204, body: '', headers: {})

      delete :destroy, params: { id: client.id }
      expect(Client.count).to eq(0)
    end
  end
end
