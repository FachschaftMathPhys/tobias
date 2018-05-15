class CreateInmails < ActiveRecord::Migration[5.1]
  def change
    create_table :inmails do |t|
      t.string :fromaddress
      t.string :subject
      t.text :body
      t.string :uid

      t.timestamps
    end
  end
end
