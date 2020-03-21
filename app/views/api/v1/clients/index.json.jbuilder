# frozen_string_literal: true

json.data @clients do |client|
  json.id client.id
  json.original_id client.original_id
  json.token client.token
end
