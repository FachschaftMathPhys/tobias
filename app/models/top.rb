class Top < ApplicationRecord
  belongs_to :meeting
  has_many :comments, dependent: :destroy
end
