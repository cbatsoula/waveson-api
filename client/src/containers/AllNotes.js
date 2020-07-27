import React from 'react';
import NoteCard from '../components/NoteCard';

//switch to func comp, a waste of a class component
class AllNotes extends React.Component {

  state = {

  }


  componentDidMount = () => {

    console.log("yo", this.props)
  }



  render () {
    console.log("AllNotes", this.props)
    return (
      <div className="AllNotesS">
      {
        this.props.toggle
        ?
        this.props.renderSortedNoteCards()
        :
        this.props.renderNoteCards()
      }

      </div>

    )
  }
}

export default AllNotes;
