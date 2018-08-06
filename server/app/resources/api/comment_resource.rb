class Api::CommentResource < JSONAPI::Resource
  attributes :author, :content, :title
  has_one :commentable, polymorphic:true
  before_save do
    @model.author = context[:current_user] if @model.new_record?
  end
  def self.creatable_fields(context)
    super + [:id]
  end
end
