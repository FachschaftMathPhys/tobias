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
      redirect_to organization_top_path( @top.organization,@top)
    else
      render 'edit'
    end
  end
  def new
    @organization = Organization.find(params[:organization_id])
    @meeting = Meeting.find(params[:meeting_id]) unless params[:meeting_id].nil?
    @top = @organization.tops.build
    @model = [@organization,@meeting,@top]
    @model = [@organization,@top] if params[:meeting_id].nil?
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
    @organization = Organization.find(params[:organization_id])
    unless params[:organization_id].nil?
      @meeting = Organization.find(params[:organization_id])
    else

    end
    @top = Top.find(params[:id])
    @model = [@organization,@top]
  end
  def destroy
    @organization = Organization.find(params[:organization_id])
    @top = Top.find(params[:id])
    @top.destroy
    redirect_to organization_path(@organization)
  end
  private
    def top_params
      params.require(:top).permit(:title,:description)
    end
end
