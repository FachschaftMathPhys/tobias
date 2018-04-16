class Comment < ApplicationRecord
  belongs_to :top
  validates :author, presence: true
end
