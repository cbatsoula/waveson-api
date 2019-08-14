class FavsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def show
    fav = Fav.find(params[:id])
    render json: fav
  end

  def index
    favs = Fav.all
    render json: favs
  end

  def create
    fav = Fav.new(user_id: params[:user_id], beach_id: params[:beach_id])

    if fav.save
      render json: fav
    else
      render json: {errors: fav.errors.full_messages}
    end

  end

  def destroy
    fav = Fav.find(params[:id])
    fav.destroy
    render json: fav
  end
end
