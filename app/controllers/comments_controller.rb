class CommentsController < ApplicationController
  def new
    @comment = Comment.new(commentable:Top.find(params[:top_id]))
  end
  def index
  end
  def create
    @top = Top.find(params[:top_id])
    c = comment_params
    c[:author]= current_user
    @comment = @top.comments.create c
    redirect_to organization_top_path(@comment.commentable.organization,@comment.commentable)
  end
  def edit
    @comment =Comment.find(params[:id])
  end
  def update
    @comment = Comment.find(params[:id])
    if is_current_user?(@comment.author)
      if @comment.update(comment_params)
        redirect_to organization_top_path( @comment.commentable.organization,@comment.commentable)
      else
        render 'edit'
      end
    else
      redirect_to organization_top_path( @comment.commentable.organization,@comment.commentable)
    end
  end
  def destroy
    @comment = Comment.find(params[:id])
    @top = @comment.top
    @comment.destroy

    redirect_to organization_meeting_top_path(@top.meeting.organization,@top.meeting,@top)
  end
  private
  def comment_params
    params.require(:comment).permit(:title,:content)
  end
end
