# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Client, type: :model do
  describe 'Client validates' do
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
