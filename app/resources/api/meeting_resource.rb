class Api::MeetingResource < Api::CommentableResource
  attributes :title, :description, :date, :begin, :end, :moderation, :clerk, :download
  has_one :organization
  has_many :actions, acts_as_set:true
  def download
    result =""
    begin
    result = ERB.new(@model.organization.meetinginvitationtemplate).result(binding)
    rescue SyntaxError
      result = "Fehler"
    end
    Base64.encode64(result)
  end
  def download=(value)
  end
  def self.creatable_fields(context)
    super + [:id]
  end
end
