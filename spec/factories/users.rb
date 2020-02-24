# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    sequence :email do |n|
      "mail#{n}@mail.en"
    end
    sequence :password do |n|
      "passwd#{n}"
    end
  end
end
