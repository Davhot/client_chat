# frozen_string_literal: true

require 'rails_helper'

WebMock.disable_net_connect!(allow: 'http://localhost:8080')

RSpec.describe BeaverClient::Channel do
  describe 'Channel' do
    let(:channel_name) { 'test' }

    before(:each) do
      getting_channel = BeaverClient::Channel.get(channel_name)
      BeaverClient::Channel.delete(channel_name) if getting_channel['error'].blank?
    end

    it 'create and delete' do
      created_channel = described_class.create(channel_name)
      deleted_channel = described_class.delete(channel_name)

      expect(created_channel).to be_truthy
      expect(deleted_channel).to be_truthy
    end

    it 'get existing channel' do
      described_class.create(channel_name)
      getting_channel = described_class.get(channel_name)
      described_class.delete(channel_name)

      data = getting_channel.keys
      expect_fields = %w[created_at listeners_count name subscribers_count type updated_at]
      expect(data).to match_array(expect_fields)
      expect(data.size).to eq(expect_fields.size)
      expect(getting_channel['name']).to eq(channel_name)
    end
  end
end
