# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::ClientsController, type: :controller do
  render_views

  include ApiHelper

  let(:client) { create(:client) }
  let(:channel) { create(:channel) }
  let(:beaver_client_params) do
    {
      channels: nil,
      created_at: nil,
      id: 'some_id',
      token: 'some_token',
      updated_at: nil
    }.to_json
  end
  before(:each) do
    stub_request(:any, "#{ENV['BEAVER_URL']}/client")
      .to_return(status: 201, body: beaver_client_params, headers: {})
  end

  describe 'POST create' do
    it 'render status 200' do
      post :create
      expect(response).to have_http_status(:success)
    end

    it 'check create' do
      post :create
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
      expect_fields = %w[id original_id token]
      expect(data).to match_array(expect_fields)
      expect(data.size).to eq(expect_fields.size)
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
      expect_fields = %w[id original_id token]
      expect(data).to match_array(expect_fields)
      expect(data.size).to eq(expect_fields.size)
    end
  end

  describe 'Delete #destroy' do
    it 'render status 200' do
      stub_request(:delete, "#{ENV['BEAVER_URL']}/client/#{client.original_id}")
        .to_return(status: 204, body: '', headers: {})

      delete :destroy, params: { id: client.id }
      expect(response).to have_http_status(:success)
    end

    it 'check destroy client' do
      stub_request(:delete, "#{ENV['BEAVER_URL']}/client/#{client.original_id}")
        .to_return(status: 204, body: '', headers: {})

      delete :destroy, params: { id: client.id }
      expect(Client.count).to eq(0)
    end
  end

  describe 'subscriber client' do
    it 'subscribe/unsubscribe' do
      stub_request(:put, "#{ENV['BEAVER_URL']}/client/#{client.original_id}/subscribe")
        .to_return(status: 200, body: '', headers: {})
      stub_request(:put, "#{ENV['BEAVER_URL']}/client/#{client.original_id}/unsubscribe")
        .to_return(status: 200, body: '', headers: {})

      count_clients_before_subscribe = channel.clients.count
      put :subscribe, params: { id: client.id, channel_id: channel.id }
      count_clients_after_subscribe = channel.reload.clients.count
      put :unsubscribe, params: { id: client.id, channel_id: channel.id }
      count_clients_after_unsubscribe = channel.reload.clients.count

      expect(count_clients_before_subscribe).to eq(0)
      expect(count_clients_after_subscribe).to eq(1)
      expect(count_clients_after_unsubscribe).to eq(0)
      expect(response).to have_http_status(:success)
    end
  end

  describe 'message' do
    it 'publish' do
      stub_request(:put, "#{ENV['BEAVER_URL']}/client/#{client.original_id}/subscribe")
        .to_return(status: 200, body: '', headers: {})
      stub_request(:put, "#{ENV['BEAVER_URL']}/client/#{client.original_id}/unsubscribe")
        .to_return(status: 200, body: '', headers: {})

      count_clients_before_subscribe = channel.clients.count
      put :subscribe, params: { id: client.id, channel_id: channel.id }
      count_clients_after_subscribe = channel.reload.clients.count
      put :unsubscribe, params: { id: client.id, channel_id: channel.id }
      count_clients_after_unsubscribe = channel.reload.clients.count

      expect(count_clients_before_subscribe).to eq(0)
      expect(count_clients_after_subscribe).to eq(1)
      expect(count_clients_after_unsubscribe).to eq(0)
      expect(response).to have_http_status(:success)
    end
  end
end
