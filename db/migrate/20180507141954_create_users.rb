class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :name
      t.string :fullname
      t.binary :pic

      t.timestamps
    end
  end
end
