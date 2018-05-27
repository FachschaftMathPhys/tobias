class Api::ActionResource < JSONAPI::Resource
  has_one :protocol
  has_one :meeting
  has_one :top
  attributes :position
  def self.creatable_fields(context)
    super + [:id]
  end
end
