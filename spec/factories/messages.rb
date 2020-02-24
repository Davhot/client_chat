# frozen_string_literal: true

FactoryBot.define do
  factory :message do
    body { 'MyText' }
    client { nil }
    channel { nil }
  end
end
