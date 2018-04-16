class CreateActions < ActiveRecord::Migration[5.1]
  def change
    create_table :actions do |t|
      t.references :top, foreign_key: true
      t.references :meeting, foreign_key: true
      t.references :protocol, foreign_key: true
      t.bigint :position

      t.timestamps
    end
  end
end
