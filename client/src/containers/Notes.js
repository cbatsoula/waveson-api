import React, { useState } from 'react';
import NoteCard from '../components/NoteCard';
import Banner from '../components/Banner';
import AllNotesFilter from './AllNotesFilter';
import AllNotes from './AllNotes';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

class Notes extends React.Component {

  state = {
    allNotes: null,
    sortedNotes: null,
    //filter
    selectBeach: null,
    toggle: false,
    // selectTime: null,
    startDate: new Date(),
    endDate: new Date(),

  }

  renderNoteCards = () => {
    if (this.state.allNotes && this.state.selectBeach === "All") {
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

  handleBeachChange = (event) => {
    console.log("event", event.target)
    this.setState({
      selectBeach: event.target.value,
      sortedNotes: null,
      toggle: false,
    }, () => {console.log("handleChange", this.state)});

  }

  begForMe = () => {
    let filterNotes = []
    console.log("be there for me", this.state, "you're the crowd come on give it back to me", this.props, "beg for me, be there for me", this.state.startDate.toLocaleDateString('en-US'))

    let formatDate = this.state.startDate.toLocaleDateString('en-US')

    let notes = this.state.allNotes.map( note => {
      if (note.created_at) {
        // console.log("will THIS WORK????", note.created_at.toLocaleDateString('en-US'), note)
        let wut = moment(note.created_at, 'DD/MM/YYYY').format()
        console.log("wut", wut, note.created_at)
        filterNotes.push(note)
      }

    })
    console.log("begForMe: filterNotes", filterNotes)
  }

  handleStartChange = date => {
    console.log("incoming date", date)
    this.setState({
      startDate: date
    }, () => {this.begForMe();
      console.log("handleDateChange SET", this.state.startDate)});

    // let notes = this.state.allNotes.map( note => {
    //   return note.created_at
    // })



  };

  handleEndChange = date => {
    this.setState({
      endDate: date
    }, () => {console.log("end change", this.state)})
  }


  //upon submit, i want to setState for the array of notes to pass down as props to AllNotes
  //within AllNotes I want to map over each note and spit out a NoteCard comp. for each one. within this I should make an, if the case is "All" to map and return NoteCards, else, map and render sortedNotes as NoteCards


  handleSubmit = (event) => {

    event.preventDefault();
    console.log("submit!!", this.state, this.props);

    if (this.state.selectBeach === "All"){
      let allNotes = this.state.allNotes
      console.log("allNotes", allNotes)
      this.setState({
        sortedNotes: allNotes,
      }, () => {console.log("All!!", this.state)})
    } else {
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
  }

  renderSortedNoteCards = () => {
    if (this.state.sortedNotes.length > 0) {
      return this.state.sortedNotes.map( note => {
        return <NoteCard allBeaches={this.props.allBeaches} note={note} key={note.id} />
      })
    } else if (this.state.allNotes && this.state.selectBeach === "all") {
        return this.state.allNotes.map( note => {
          return <NoteCard allBeaches={this.props.allBeaches} note={note} key={note.id} />
        })

      } else {
      return <h3> No notes for the selected parameters </h3>
    }
  }


  setStartDate = () => {
    const [startDate, setStartDate] = useState(new Date());

  };

  setEndDate = () => {
    const [endDate, setEndDate] = useState(new Date());
  }

  render () {
    console.log("Notes", this.state)
    return (
      <>
      <div className="Banner">
      <Banner title={"All Notes"} />
      </div>

      <AllNotesFilter
      selectBeach={this.state.selectBeach}
      allBeaches={this.props.allBeaches}
      allNotes={this.state.allNotes}
      handleBeachChange={this.handleBeachChange}
      handleSubmit={this.handleSubmit}
      handleDateChange={this.handleDateChange}
      // selectTime={this.state.selectTime}
      selectedS={this.state.startDate}
      selectedE={this.state.endDate}
      handleStartChange={this.handleStartChange}
      handleEndChange={this.handleEndChange}
      setEndDate={this.setEndDate}
      setStartDate={this.setStartDate}
      minDate={this.state.startDate}
      />


      <div className="Note-Container">

        {
          this.state.toggle
          ?
          <AllNotes
          selectBeach={this.state.selectBeach}
          allNotes={this.state.allNotes}
          sortedNotes={this.state.sortedNotes}
          renderNoteCards={this.renderNoteCards}
          renderSortedNoteCards={this.renderSortedNoteCards}
          toggle={this.state.toggle}  />
          :
          <AllNotes
          selectBeach={this.state.selectBeach}
          allNotes={this.state.allNotes}
          sortedNotes={this.state.sortedNotes}
          renderNoteCards={this.renderNoteCards}
          renderSortedNoteCards={this.renderSortedNoteCards}
          toggle={this.state.toggle} />

        }
      </div>
      </>

    )
  }
}

export default Notes;
