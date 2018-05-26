class CreateActions < ActiveRecord::Migration[5.1]
  def change
    create_table :actions, id: :uuid do |t|
      t.references :top, type: :uuid, foreign_key: true
      t.references :meeting, type: :uuid, foreign_key: true
      t.references :protocol, type: :uuid, foreign_key: true
      t.bigint :position

      t.timestamps
    end
  end
end
