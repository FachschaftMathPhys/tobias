class Api::OrganizationResource < JSONAPI::Resource
  attributes :title, :description,:meetinginvitationtemplate
  has_many :tops
  has_many :meetings
end
