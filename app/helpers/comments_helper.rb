module CommentsHelper
  def is_current_user comment
    p headers
    comment.author==headers["X-forwarded-user"]
  end
end
