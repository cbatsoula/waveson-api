import React from 'react';
import NoteCard from '../components/NoteCard';
import Banner from '../components/Banner';
import AllNotesFilter from './AllNotesFilter';

class AllNotes extends React.Component {

  state = {
    allNotes: null,
    //filter
    selectBeach: null,
  }

  renderNoteCards = () => {
    return this.state.allNotes.map( note => {
      return <NoteCard allBeaches={this.props.allBeaches} note={note} key={note.id} />
    })
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
      selectBeach: event.target.value
    }, () => {console.log("handleChange", this.state)});

  }

  handleSubmit = (event) => {
    // alert('Beach selected: ' + this.state.value);
    event.preventDefault();
    console.log("submit!!", this.state);
    // this.setState({
    //   selectBeach: event.target.value
    // });
  }

  render () {
    console.log("AllNotes", this.props)
    return (
      <>
      <div className="Banner">
      <Banner title={"All Notes"} />
      </div>

      <AllNotesFilter selectBeach={this.state.selectBeach} allBeaches={this.props.allBeaches} allNotes={this.state.allNotes} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>


      <div className="AllNote-Container">
        {
          this.state.allNotes
          ?
          this.renderNoteCards()
          :
          null
        }
      </div>
      </>

    )
  }
}

export default AllNotes;
