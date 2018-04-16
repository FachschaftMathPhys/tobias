class AddTitleToMeeting < ActiveRecord::Migration[5.1]
  def change
    add_column :meetings,:title, :string
  end
end
