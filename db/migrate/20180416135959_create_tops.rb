class CreateTops < ActiveRecord::Migration[5.1]
  def change
    create_table :tops do |t|
      t.string :title
      t.text :description
      t.string :submitter
      t.string :author
      t.string :submitted_at
      t.references :organization, foreign_key: true

      t.timestamps
    end
  end
end
