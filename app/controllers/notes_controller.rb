class NotesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    notes = Note.all
    render json: notes
  end

  def show
    note = Note.find(params[:id])
    render json: note
  end

  def create
    note = Note.new(user_id: params[:user_id], beach_id: params[:beach_id], note: params[:note])
    if note.save
      render json: note
    else
      render json: {errors: note.errors.full_messages}
    end
  end

  def update
    note = Note.find(params[:id])
    note.update(note: params[:note])
    note.save
    render json: note
  end

  def destroy
    note = Note.find(params[:id])
    note.destroy
    render json: note
  end

end
