class CreateAttachments < ActiveRecord::Migration[5.1]
  def change
    create_table :attachments do |t|
      t.string :author
      t.binary :content
      t.string :name
      t.references :attachable, polymorphic: true

      t.timestamps
    end
  end
end
