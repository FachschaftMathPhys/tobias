class CreateComments < ActiveRecord::Migration[5.1]
  def change
    create_table :comments, id: :uuid do |t|
      t.string :author
      t.text :content
      t.string :title
      t.references :commentable, type: :uuid, polymorphic: true

      t.timestamps
    end
  end
end
