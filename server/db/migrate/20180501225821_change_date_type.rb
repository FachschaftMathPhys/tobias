class ChangeDateType < ActiveRecord::Migration[5.1]
  def change
    change_column :meetings, :date, :date
  end
end
