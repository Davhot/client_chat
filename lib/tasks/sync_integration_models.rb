# frozen_string_literal: true

# Синхронизация сущностей с Beaver

namespace :sync_integration_models do
  desc 'Perform payment'

  task run: :environment do
    # Если канал не создан - создать
    # Если нет клиента - создать
    # Если нет подписки - подписать
  end
end
