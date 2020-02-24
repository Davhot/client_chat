# frozen_string_literal: true

require 'spec_helper'

RSpec.describe Channel, type: :model do
  describe 'Channel validates' do
    subject { create(:channel) }

    it 'save valid object' do
      expect(subject).to be_valid
    end

    it 'name must be present' do
      subject.name = nil
      expect(subject).not_to be_valid
    end
  end
end
