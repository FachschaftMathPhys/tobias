class Top < ApplicationRecord
  belongs_to :organization
  has_many :attachments, as: :attachable
  has_many :comments, as: :commentable
  has_many :actions
  has_many :meetings, through: :actions
end
