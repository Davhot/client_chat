# frozen_string_literal: true

require 'rails_helper'

WebMock.disable_net_connect!(allow: 'http://localhost:8080')

RSpec.describe BeaverClient::Client do
  describe 'Client' do
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
  end
end
