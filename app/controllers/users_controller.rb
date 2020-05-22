class UsersController < ApiController
  skip_before_action :verify_authenticity_token

  def index
    users = User.all
    render json: users
  end

  def show
    user = User.find(params[:id])
    render json: user
  end

  def create
    user = User.new(username: params[:username], password: params[:password], name: params[:name], location: params[:location])

    if user.save
      render json: user
    else
      render json: {errors: user.errors.full_messages}
    end

  end

  def update
    user = User.find(params[:id])
    user.update(location: params[:location])
    user.save

    render json: user
  end


end
