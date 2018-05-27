class CreateAttachments < ActiveRecord::Migration[5.1]
  def change
    create_table :attachments, id: :uuid do |t|
      t.string :author
      t.binary :content
      t.string :name
      t.references :attachable, type: :uuid, polymorphic: true

      t.timestamps
    end
  end
end
