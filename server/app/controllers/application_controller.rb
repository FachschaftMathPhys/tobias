class ApplicationController < ActionController::Base
  helper_method :current_user, :is_current_user?
  def current_user
    request.headers['X-Forwarded-User']
  end
  def is_current_user?(name)
    request.headers['X-Forwarded-User']==name
  end
  before_action :set_current_user
  before_action :set_current_user_name
  def set_current_user
    @current_user = "henrik"
  end
  def set_current_user_name
    @current_user_name="Henrik Reinstädtler"
  end
  def index
    render inline: '', layout: 'application' # Avoid having an empty view file.
  end
  def context
    {current_user: current_user}
  end
  # Prevent CSRF attacks by raising an exception.
 # For APIs, you may want to use :null_session instead.
 #protect_from_forgery with: :null_session
end
