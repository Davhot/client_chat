class CreateClients < ActiveRecord::Migration[6.0]
  def change
    create_table :clients do |t|
      t.string :original_id
      t.string :token
      t.string :email

      t.timestamps
    end
  end
end
