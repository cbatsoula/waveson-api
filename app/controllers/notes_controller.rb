class NotesController < ApiController
  # skip_before_action :verify_authenticity_token

  def index
    notes = Note.all
    render json: Note.all.to_json(:include => :tags)
  end

  def show
    note = Note.find(params[:id])
    render json: note
  end

  def create
    note = Note.new(user_id: params[:user_id], beach_id: params[:beach_id], note: params[:note], photo: params[:photo], beach_name: params[:beach_name])

    if note.save
      # Note.last.tags << Tag.last
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
