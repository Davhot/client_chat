# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::ChannelsController, type: :controller do
  login_user
  render_views

  include ApiHelper

  let(:channel) { create(:channel) }

  before(:each) do
    stub_request(:any, "#{ENV['BEAVER_URL']}/channel")
      .to_return(status: 201, body: '', headers: {})
  end

  describe 'POST create' do
    it 'render status 200' do
      post :create, params: { channel: { name: 'room_1' } }
      expect(response).to have_http_status(:success)
    end

    it 'check create' do
      post :create, params: { channel: { name: 'room_1' } }
      expect(Channel.count).to eq(1)
    end
  end

  describe 'Get #show' do
    it 'render status 200' do
      get :show, params: { id: channel.id }
      expect(response).to have_http_status(:success)
    end

    it 'check format' do
      get :show, params: { id: channel.id, format: :json }
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
      2.times { create :channel }

      get :index, format: :json

      data = body['data'][0].keys
      expect_fields = %w[id name]
      expect(data).to match_array(expect_fields)
      expect(data.size).to eq(2)
    end
  end

  describe 'Put #update' do
    it 'render status 200' do
      put :update, params: { id: channel.id, channel: { name: 'room_2' } }
      expect(response).to have_http_status(:success)
    end

    it 'check update channel' do
      put :update, params: { id: channel.id, channel: { name: 'room_2' } }

      expect(Channel.last.name).to eq('room_2')
    end
  end

  describe 'Delete #destroy' do
    it 'render status 200' do
      stub_request(:delete, "#{ENV['BEAVER_URL']}/channel/#{channel.name}")
        .to_return(status: 204, body: '', headers: {})

      delete :destroy, params: { id: channel.id }
      expect(response).to have_http_status(:success)
    end

    it 'check destroy channel' do
      stub_request(:delete, "#{ENV['BEAVER_URL']}/channel/#{channel.name}")
        .to_return(status: 204, body: '', headers: {})

      delete :destroy, params: { id: channel.id }
      expect(Channel.count).to eq(0)
    end
  end
end
