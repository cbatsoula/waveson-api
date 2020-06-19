import React from 'react';
import NoteCard from '../components/NoteCard';


class AllNotes extends React.Component {

  state = {

  }

  // renderNotes = () => {
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
    // this.renderNotes()
    console.log("yo")
  }



  render () {
    console.log("AllNotes", this.props)
    return (
      <div className="AllNotesS">

      </div>

    )
  }
}

export default AllNotes;
