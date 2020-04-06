# frozen_string_literal: true

EMAILS = [ENV['EMAIL1'], ENV['EMAIL2']].freeze
CHAT_NAMES = %w[chat1 chat2].freeze

def create_users
  password = 'qwerty'
  EMAILS.each { |email| create_user(email, password) }
end

def create_user(email, password)
  return if User.find_by(email: email).present?

  User.create(email: email, password: password, password_confirmation: password)
end

def create_clients
  User.all.each do |user|
    next if user.client.present?

    beaver_client = BeaverClient::Client.create
    beaver_client[:user_id] = user.id
    Client.create_beaver(beaver_client)
  end
end

def create_channels
  CHAT_NAMES.each do |channel_name|
    next if Channel.find_by(name: channel_name).present?

    Channel.create(name: channel_name)
    BeaverClient::Channel.create(channel_name)
  end
end

def subscribe_users
  EMAILS.each { |email| subscribe_user(email) }
end

def subscribe_user(email)
  client = User.find_by(email: email).client
  return if client.channels.present?

  CHAT_NAMES.each do |chat_name|
    BeaverClient::Client.subscribe(client.original_id, chat_name)
    client.channels << Channel.find_by(name: chat_name)
  end
end

create_users
create_clients
create_channels
subscribe_users
