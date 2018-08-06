class CreateTops < ActiveRecord::Migration[5.1]
  def change
    create_table :tops, id: :uuid do |t|
      t.string :title
      t.text :description
      t.string :submitter
      t.string :author
      t.string :submitted_at
      t.references :organization, type: :uuid, foreign_key: true

      t.timestamps
    end
  end
end
