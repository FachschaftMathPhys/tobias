class AddDescriptionToMeeting < ActiveRecord::Migration[5.1]
  def change
    add_column :meetings,:description, :string
  end
end
