class Api::EmailResource < JSONAPI::Resource
  attributes :address, :subject, :body, :created_at
  has_one :referencable, polymorphic: true
  def self.creatable_fields(context)
    super + [:id]
  end
end
