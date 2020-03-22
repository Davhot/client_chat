# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  it 'exists attributes' do
    expect(subject.attributes).to include('id')
    expect(subject.attributes).to include('email')
    expect(subject.attributes).to include('created_at')
    expect(subject.attributes).to include('updated_at')
  end
end
