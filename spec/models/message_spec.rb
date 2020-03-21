# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Message, type: :model do
  describe 'Message validates' do
    let(:channel) { create(:channel) }
    let(:client) { create(:client, channels: [channel]) }

    subject { create(:message, channel: channel, client: client) }

    it 'save valid object' do
      expect(subject).to be_valid
      expect(subject.check_client_channel_association).to be_truthy
    end
  end
end
