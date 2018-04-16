class TopsController < ApplicationController
  def show
    @top=Top.find(params[:id])
  end
  def index
    @meeting= Meeting.find(params[:meeting_id])
    @tops = @meeting.tops.all
  end
  def update
    @top = Top.find(params[:id])

    if @top.update(top_params)
      redirect_to organization_meeting_top_path( @top.meeting.organization, @top.meeting,@top)
    else
      render 'edit'
    end
  end
  def new
    @organization = Organization.find(params[:organization_id])
    @meeting = Meeting.find(params[:meeting_id])
    @top = @organization.tops.build
  end
  def create
    @meeting = Meeting.find(params[:meeting_id])
    @organization = Organization.find(params[:organization_id])
    t = top_params
    t[:author] = current_user
    @top = @organization.tops.create t
    if @top.save!
        action= Action.create(meeting:@meeting,top:@top, protocol:Protocol.create)
        action.save
        redirect_to [@meeting.organization,@meeting]
    else
      render 'new'
    end
  end
  def edit
    @meeting = Meeting.find(params[:meeting_id])
    @top = Top.find(params[:id])
  end
  def destroy
    @meeting = Meeting.find(params[:meeting_id])
    @top = @meeting.tops.find(params[:id])
    @top.destroy
    redirect_to organization_meeting_path(@meeting.organization,@meeting)
  end
  private
    def top_params
      params.require(:top).permit(:title,:description)
    end
end
