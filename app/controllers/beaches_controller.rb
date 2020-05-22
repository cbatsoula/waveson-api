class BeachesController < ApiController
  # skip_before_action :verify_authenticity_token

  def index
    beaches = Beach.all
    render json: beaches
  end

  def show
    beach = Beach.find(params[:id])
    render json: beach
  end

  def create
    if Beach.where(name: params[:name]).exists?
    # beach = Beach.find_or_create_by_name_and_lat_and_lng_and_vicinity(name: params[:name], lat: params[:lat], lng: params[:lng], vicinity: params[:vicinity])
    # beach.save
    render json: beach
    else
      beach = Beach.new(name: params[:name], lat: params[:lat], lng: params[:lng], vicinity: params[:vicinity])
      beach.save
      render json: beach
    end
  end

end
