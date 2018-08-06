module CommentsHelper
  def is_current_user comment
    p headers["X-Forwarded-User"]
    comment.author==headers["X-Forwarded-User"]
  end
end
