# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Client, type: :model do
  describe 'Client validates' do
    subject { create(:client) }

    it 'save valid object' do
      expect(subject).to be_valid
    end

    it 'original_id shouldn\'t be present' do
      subject.original_id = nil
      expect(subject).to be_valid
    end

    it 'token shouldn\'t be present' do
      subject.token = nil
      expect(subject).to be_valid
    end

    it 'email shouldn\'t be present' do
      subject.email = nil
      expect(subject).to be_valid
    end
  end
end
