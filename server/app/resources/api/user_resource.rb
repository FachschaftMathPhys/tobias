class Api::UserResource < JSONAPI::Resource
  #The submitter is the Antragssteller
  attributes :pic, :name, :fullname
  def self.creatable_fields(context)
    super + [:id]
  end
end
