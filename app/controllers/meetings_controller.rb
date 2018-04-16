class MeetingsController < ApplicationController
  def index
    @meetings = Meeting.order("created_at DESC")
  end
  def show
    @meeting = Meeting.find(params[:id])
  end
  def new
    @meeting = Meeting.new(organization_id:params[:organization_id])
  end
  def edit
    @meeting = Meeting.find(params[:id])
  end
  def create
    @meeting = Meeting.new(meeting_params)
    if @meeting.save!
        redirect_to organization_meeting_path(@meeting.organization,@meeting)
    else
      render 'new'
    end
  end
  def update
    @meeting = Meeting.find(params[:id])

    if @meeting.update(meeting_params)
      redirect_to organization_meeting_path( @meeting.organization, @meeting)
    else
      render 'edit'
    end
  end
  private
  def meeting_params
    params.require(:meeting).permit(:title, :description,:organization_id, :moderation,:date)
  end
end
