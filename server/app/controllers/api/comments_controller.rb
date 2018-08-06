class Api::CommentsController < ApplicationController
  include JSONAPI::ActsAsResourceController
  def context
    {current_user: current_user}
  end
end
