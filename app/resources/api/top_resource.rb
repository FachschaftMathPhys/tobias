class Api::TopResource < Api::CommentableResource
  #The submitter is the Antragssteller
  attributes :title, :description, :submitter, :author, :submitted_at
  has_one :organization,always_include_linkage_data:true
  before_save do
    @model.author = context[:current_user] if @model.new_record?
  end
end
