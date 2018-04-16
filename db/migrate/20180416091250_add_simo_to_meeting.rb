class AddSimoToMeeting < ActiveRecord::Migration[5.1]
  def change
    add_column :meetings, :moderation, :string
  end
end
