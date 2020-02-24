class CreateJoinTableChannelsClients < ActiveRecord::Migration[6.0]
  def change
    create_join_table :channels, :clients do |t|
      t.index %i[channel_id client_id]
      # t.index [:client_id, :channel_id]
    end
  end
end
