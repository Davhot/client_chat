# frozen_string_literal: true

require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module ClientChat
  # Приложение
  class Application < Rails::Application
    config.load_defaults 6.0

    config.eager_load_paths << Rails.root.join('lib')

    config.hosts.clear

    # For devise acceptance json
    config.to_prepare do
      DeviseController.respond_to :html, :json
    end
  end
end
