class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
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
end
