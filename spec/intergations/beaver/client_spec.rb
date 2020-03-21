# frozen_string_literal: true

require 'rails_helper'

WebMock.disable_net_connect!(allow: 'http://localhost:8080')

RSpec.describe BeaverClient::Client do
  describe 'Client' do
    let(:channel_name) { 'test' }
    let(:message) { 'test message!' }

    before(:each) do
      getting_channel = BeaverClient::Channel.get(channel_name)
      BeaverClient::Channel.delete(channel_name) if getting_channel['error'].blank?
    end

    it 'create and delete' do
      created_client = described_class.create
      deleted_client = described_class.delete(created_client['id'])

      data = created_client.keys
      expect_fields = %w[channels created_at id token updated_at]
      expect(data).to match_array(expect_fields)
      expect(data.size).to eq(expect_fields.size)

      expect(deleted_client).to be_truthy
    end

    it 'get existing client' do
      created_client = described_class.create
      getting_client = described_class.get(created_client['id'])
      described_class.delete(created_client['id'])

      data = getting_client.keys
      expect_fields = %w[channels created_at id token updated_at]
      expect(data).to match_array(expect_fields)
      expect(data.size).to eq(expect_fields.size)
    end

    it 'subscribe/unsubscribe client' do
      created_client = described_class.create
      BeaverClient::Channel.create(channel_name)

      subscribed_client = described_class.subscribe(created_client['id'], channel_name)
      getting_channel1 = BeaverClient::Channel.get(channel_name)
      unsubscribed_client = described_class.unsubscribe(created_client['id'], channel_name)
      getting_channel2 = BeaverClient::Channel.get(channel_name)

      BeaverClient::Channel.delete(channel_name)
      described_class.delete(created_client['id'])

      expect(subscribed_client).to be_truthy
      expect(getting_channel1['subscribers_count']).to eq(1)
      expect(unsubscribed_client).to be_truthy
      expect(getting_channel2['subscribers_count']).to eq(0)
    end

    it 'publish message' do
      created_client = described_class.create
      BeaverClient::Channel.create(channel_name)

      described_class.subscribe(created_client['id'], channel_name)
      message = described_class.send_message(message, created_client['id'], channel_name)
      described_class.unsubscribe(created_client['id'], channel_name)

      BeaverClient::Channel.delete(channel_name)
      described_class.delete(created_client['id'])

      expect(message).to be_truthy
    end
  end
end
