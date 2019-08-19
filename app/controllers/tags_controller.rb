class TagsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    tags = Tag.all
    render json: Tag.all.to_json(:include => :notes)
  end

  def show
    tag = Tag.find(params[:id])
    render json: tag
  end

  def create
    tag = Tag.new(user_id: params[:user_id], beach_id: params[:beach_id], tag: params[:tag])
    if tag.save
      render json: tag
    else
      render json: {errors: tag.errors.full_messages}
    end
  end

  def update
    tag = Tag.find(params[:id])
    tag.update(tag: params[:tag])
    tag.save
    render json: tag
  end

  def destroy
    tag = Tag.find(params[:id])
    tag.destroy
    render json: tag
  end
end
