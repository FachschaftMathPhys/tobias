class Api::MeetingResource < Api::CommentableResource
  attributes :title, :description, :date, :begin, :end, :moderation, :clerk
  has_one :organization
  has_many :tops
end
