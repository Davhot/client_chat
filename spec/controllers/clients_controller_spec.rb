# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::ClientsController, type: :controller do
  render_views

  include ApiHelper

  let(:client) { create(:client) }
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
end
