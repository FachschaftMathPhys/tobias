JSONAPI.configure do |config|
  # Allowed values are :integer(default), :uuid, :string, or a proc
  config.resource_key_type = :uuid
  config.always_include_to_one_linkage_data = true
  config.always_include_to_many_linkage_data = true
end
