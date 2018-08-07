class Api::UsersController < JSONAPI::ResourceController
  def me
    ob= User.find_or_create_by(name:request.headers['X-Forwarded-User'])
    ob.pic = "" if ob.pic.nil?
    ob.fullname = "" if ob.fullname.nil?
    es = JSONAPI::ResourceSerializer.new(Api::UserResource).serialize_to_hash(Api::UserResource.new(ob, nil))
    es[:data]["id"]="me"
    render json: es , content_type: "application/vnd.api+json"
  end
  def update_me
    ob= User.find_or_create_by(name:request.headers['X-Forwarded-User'])
    ob.fullname = user_params[:data]["attributes"]["fullname"]
    ob.pic = user_params[:data]["attributes"]["pic"]
    ob.save!
    es = JSONAPI::ResourceSerializer.new(Api::UserResource).serialize_to_hash(Api::UserResource.new(ob, nil))
    es[:data]["id"]="me"
    render json: es , content_type: "application/vnd.api+json"
  end
  private

  def user_params
    # NOTE: Using `strong_parameters` gem
    # todo: only allowed params
    params.permit!
  end
end
