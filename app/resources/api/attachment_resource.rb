class Api::AttachmentResource < JSONAPI::Resource
  attributes :author, :content, :name
  has_one :attachable, polymorphic: true
end
