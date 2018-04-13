class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :set_current_user
  before_action :set_current_user_name
  def set_current_user
    @current_user = "henrik"
  end
  def set_current_user_name
    @current_user_name="Henrik Reinstädtler"
  end
end
