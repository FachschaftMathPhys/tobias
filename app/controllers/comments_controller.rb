class CommentsController < ApplicationController
  def new
    @comment = Comment.new(top_id:params[:top_id])
  end
  def index
  end
  def create
    @top = Top.find(params[:top_id])
    @comment = @top.comments.create comment_params
    redirect_to organization_meeting_top_path(@comment.top.meeting.organization,@comment.top.meeting,@comment.top)
  end
  def edit
    @comment =Comment.find(params[:id])
  end
  def update
    @comment = Comment.find(params[:id])

    if @comment.update(comment_params)
      redirect_to organization_meeting_top_path( @comment.top.meeting.organization, @comment.top.meeting,@comment.top)
    else
      render 'edit'
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
