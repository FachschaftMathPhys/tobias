class Api::OrganizationResource < JSONAPI::Resource
  attributes :title, :description,:meetinginvitationtemplate
  has_many :tops
  has_many :meetings
  def self.creatable_fields(context)
    super + [:id]
  end
end
