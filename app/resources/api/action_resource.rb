class Api::ActionResource < JSONAPI::Resource
  has_one :protocol
  has_one :meeting
  has_one :top
  attributes :position
end
