class Meeting < ApplicationRecord
  belongs_to :organization
  has_many :actions
  has_many :attachments, as: :attachable
  has_many :comments, as: :commentable
  has_many :tops, :through=> :actions
end
