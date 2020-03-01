# frozen_string_literal: true

require 'simplecov'
SimpleCov.start 'rails' do
  add_filter '/bin/'
  add_filter '/db/'
  add_filter '/spec/'
end

require 'spec_helper'
ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../config/environment', __dir__)

abort('The Rails environment is running in production mode!') if Rails.env.production?
require 'rspec/rails'

require 'capybara/rails'

require 'factory_bot_rails'
Dir[Rails.root.join('spec/support/**/*.rb')].sort.each { |f| require f }

# note: require 'devise' after require 'rspec/rails'
require 'devise'
require 'database_cleaner/active_record'

require 'webmock/rspec'

RSpec.configure do |config|
  config.include Devise::Test::ControllerHelpers, type: :controller
  config.extend ControllerMacros, type: :controller

  config.use_transactional_fixtures = false
  config.infer_spec_type_from_file_location!

  config.profile_examples = true

  config.filter_rails_from_backtrace!

  config.before(:suite) do
    DatabaseCleaner.strategy = :transaction
    DatabaseCleaner.clean_with(:truncation)
  end

  config.around(:each) do |example|
    DatabaseCleaner.cleaning do
      example.run
    end
  end
  config.backtrace_inclusion_patterns = [/app|spec/]
end
