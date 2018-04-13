class CreateTops < ActiveRecord::Migration[5.1]
  def change
    create_table :tops do |t|
      t.string :title
      t.string :description
      t.string :author
      t.datetime :date
      t.references :meeting, foreign_key: true

      t.timestamps
    end
  end
end
