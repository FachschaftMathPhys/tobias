class CreateInmails < ActiveRecord::Migration[5.1]
  def change
    create_table :inmails, id: :uuid do |t|
      t.string :fromaddress
      t.string :subject
      t.text :body
      t.string :uid

      t.timestamps
    end
  end
end
