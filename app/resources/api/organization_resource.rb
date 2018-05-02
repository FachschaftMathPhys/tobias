class Api::OrganizationResource < JSONAPI::Resource
  attributes :title, :description
  has_many :tops
  has_many :meetings
end
