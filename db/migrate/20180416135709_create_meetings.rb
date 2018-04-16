class CreateMeetings < ActiveRecord::Migration[5.1]
  def change
    create_table :meetings do |t|
      t.datetime :date
      t.datetime :begin
      t.datetime :end
      t.string :moderation
      t.string :clerk
      t.references :organization, foreign_key: true

      t.timestamps
    end
  end
end
