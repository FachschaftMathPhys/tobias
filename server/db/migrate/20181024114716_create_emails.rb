class CreateEmails < ActiveRecord::Migration[5.1]
  def change
    create_table :emails, id: :uuid do |t|
      t.string :address
      t.string :subject
      t.string :body
      t.references :referencable, polymorphic: true

      t.timestamps
    end
  end
end
