import React from 'react';
import NoteCard from '../components/NoteCard';

//switch to func comp, a waste of a class component
class AllNotes extends React.Component {

  state = {

  }

  // renderNotes = () => {
  //
  //   if (this.props.selectBeach === "all"){
  //     return this.props.allNotes.map( note => {
  //       return <NoteCard allBeaches={this.props.allBeaches} note={note} key={note.id} />
  //     })
  //   } else {
  //     return this.props.sortedNotes.map( note => {
  //       return <NoteCard allBeaches={this.props.allBeaches} note={note} key={note.id} />
  //   })
  // }
  //
  // }


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
