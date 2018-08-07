class Api::InmailResource < JSONAPI::Resource
  attributes :fromaddress, :subject, :body, :uid, :fromname, :avatar
  def avatar
    begin
      #TODO: check ob gleiche Domain
    return User.where(name:@model.fromaddress.split("@")[0]).first.pic
  rescue
    "avatar"
    end
  end
  def self.creatable_fields(context)
    super + [:id]
  end
end
