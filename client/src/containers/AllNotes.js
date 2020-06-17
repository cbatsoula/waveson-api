import React from 'react';
import NoteCard from '../components/NoteCard';
import Banner from '../components/Banner';

class AllNotes extends React.Component {

  state = {
    allNotes: null,
  }

  renderNoteCards = () => {
    return this.state.allNotes.map( note => {
      return <NoteCard handleEdit={this.props.handleEdit}
      handleDelete={this.props.handleDelete} handleChange={this.props.handleChange} allBeaches={this.props.allBeaches} note={note} key={note.id} />
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

  render () {
    console.log("AllNotes", this.props)
    return (
      <>
      <div className="Banner">
      <Banner title={"All Notes"} />
      </div>

      <form className="Note-Form" onSubmit={this.handleSubmit}>
        <br />
        <textarea
        id="styled"
        onChange={this.props.handleChange}
        name="note"
        value={this.props.oneNote ? this.props.oneNote.note : this.props.note}
        rows="4"
        cols="50"
        type="text"
        placeholder="Start your entry here!"/>
        <input className="button" type="submit" value="Submit" />
      </form>
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
