class Api::InmailResource < JSONAPI::Resource
  attributes :fromaddress, :subject, :body, :uid, :fromname, :avatar
  def avatar
    begin
    return "data:image/png;base64,"+Base64.encode64(User.where(name:@model.fromaddress.split("@")[0]).first.pic)
  rescue
    "avatar"
    end
  end
  def self.creatable_fields(context)
    super + [:id]
  end
end
