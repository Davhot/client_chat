# frozen_string_literal: true

json.data @clients do |client|
  json.id client.id
  json.name client.name
end
