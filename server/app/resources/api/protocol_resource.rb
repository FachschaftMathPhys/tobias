class Api::ProtocolResource < JSONAPI::Resource
  attributes :content, :result, :status
  def self.creatable_fields(context)
    super + [:id]
  end
end
