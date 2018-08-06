class Api::CommentableResource < JSONAPI::Resource
  abstract
  has_many :comments
end
