import React from 'react';
import NoteCard from '../components/NoteCard';
import Banner from '../components/Banner';
import AllNotesFilter from './AllNotesFilter';
import AllNotes from './AllNotes';

class Notes extends React.Component {

  state = {
    allNotes: null,
    sortedNotes: null,
    //filter
    selectBeach: null,
    toggle: false,

  }

  renderNoteCards = () => {
    if (this.state.allNotes && this.state.selectBeach === "all") {
      return this.state.allNotes.map( note => {
        return <NoteCard allBeaches={this.props.allBeaches} note={note} key={note.id} />
      })

    }
  }

  componentDidMount = () => {

    console.log("allBeaches", this.props)

      // let thisOne = this.props.allBeaches.find(beach => {
      //   return beach.name === this.props.currentBeach.name
      // })
      let userID = this.props.currentUser.id
      console.log("userID", userID)
      fetch('/api/notes')
        .then( r => r.json())
        .then( stuff => {
          // let findFromNotes = stuff.filter( note => {
          //   return note.beach_id === thisOne.id && note.user_id === userID})
          let findFromNotes = stuff.filter( note => {
            return note.user_id === userID
          })
          console.log("pls", findFromNotes)
          // debugger;


          this.setState({
            allNotes: findFromNotes
          }, () => {console.log("fetchNotes", this.state.allNotes, userID)})

        })

  }

  handleChange = (event) => {
    console.log("event", event.target)
    this.setState({
      selectBeach: event.target.value,
      sortedNotes: null,
      toggle: false,
    }, () => {console.log("handleChange", this.state)});

  }

  //upon submit, i want to setState for the array of notes to pass down as props to AllNotes
  //within AllNotes I want to map over each note and spit out a NoteCard comp. for each one. within this I should make an, if the case is "All" to map and return NoteCards, else, map and render sortedNotes as NoteCards


  handleSubmit = (event) => {

    event.preventDefault();
    console.log("submit!!", this.state, this.props);

    if (this.state.selectBeach === "all"){
      console.log("SUBMIT!! ALL beaches", this.state)
    }
    let holdMe = []
    let theseNotes = this.state.allNotes.map(note => {
      if (note.beach_name === this.state.selectBeach){
        console.log("yah", note)
        holdMe.push(note)
        console.log("holdMe", holdMe)
        return note
      } else {
        console.log("nah", note)
      }
    })
    console.log("theseNotes", theseNotes, this.state, holdMe)

    this.setState({
      sortedNotes: holdMe,
      toggle: true,
    })
  }

  renderSortedNoteCards = () => {
    if (this.state.sortedNotes.length > 0) {
      return this.state.sortedNotes.map( note => {
        return <NoteCard allBeaches={this.props.allBeaches} note={note} key={note.id} />
      })
    } else {
      return <h3> No notes for the selected parameters </h3>
    }
  }

  render () {
    console.log("Notes", this.state)
    return (
      <>
      <div className="Banner">
      <Banner title={"All Notes"} />
      </div>

      <AllNotesFilter selectBeach={this.state.selectBeach} allBeaches={this.props.allBeaches} allNotes={this.state.allNotes} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>


      <div className="Note-Container">
        {
          this.state.toggle
          ?
          this.renderSortedNoteCards()
          :
          this.renderNoteCards()
        }

        <AllNotes selectBeach={this.state.selectBeach} allNotes={this.state.allNotes} sortedNotes={this.state.sortedNotes} />
      </div>
      </>

    )
  }
}

export default Notes;
