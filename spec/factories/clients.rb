# frozen_string_literal: true

FactoryBot.define do
  factory :client do
    original_id { 'test_id' }
    token { 'MyString' }
    email { 'some@email.com' }
  end
end
