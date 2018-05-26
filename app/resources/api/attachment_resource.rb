class Api::AttachmentResource < JSONAPI::Resource
  attributes :author, :content, :name
  has_one :attachable, polymorphic: true
  def self.creatable_fields(context)
    super + [:id]
  end
end
