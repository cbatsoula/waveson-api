class NoteTagsController < ApiController
  # skip_before_action :verify_authenticity_token

  def index
    # note = Note.all
    # tag = Tag.all
    # tag.notes << note
    # tag.save
    # tag.notes.all

    # note_tags = NoteTag.all
    # note_tag = note.tags.all
    # render json: note_tag
    render json: Note.all.to_json(:include => {:tags => {:only => :id}})

  end

  def show
    # note_tag = NoteTag.find(params[:id])
    note_tag = Note.find()
    render json: note_tag
  end

  def create
    byebug
    note = @tag.note_tag.create({note_id: params[:note_id], tag_id: params[:tag_id]})
    Note.last.tags << Tag.last
    note.save
    # note = Note.find(8)
    # tag = Tag.find(1)
    # tag.notes << note
    # tag.save
    # tag.notes.all
    # note_tag = NoteTag.new(note_id: params[:note_id], tag_id: params[:tag_id])
    # note_tag.save
    render json: Tag.all.to_json(:include => :notes)
  end



end
