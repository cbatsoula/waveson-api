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
    // yes I was listening to Korn and sometimes making more names for variables and functions is hard
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

    let holdMe = []
    let theseNotes = this.state.allNotes.map(note => {
      //it doesnt seem like i NEED a switch, I'd have two switch cases with just two or three cases so maybe a switch case is not my solution but a creative way to use if/else if/else with a nested if within the else if of beach name, and else if of date-time

      // switch (expression) {
      //   case x:
      //   //
      //   break;
      //   case y:
      //   //
      //   break;
      //   default:
      //   //
      // }

      // if the user selects to see notes from all beaches = show all Notes
      // what if the user wants to see all Notes from one week?
      if (this.state.selectBeach === "All"){
        let allNotes = this.state.allNotes
        console.log("allNotes", allNotes)
        this.setState({
          sortedNotes: allNotes,
        }, () => {console.log("All!!", this.state)})


      // else, if the user selects a beach, show all notes from that beach
      //if this.state.startDate compare dates, sort notes and spit them out
      } else if (note.beach_name === this.state.selectBeach) {
        console.log("if", note)
        holdMe.push(note)
        console.log("holdMe", holdMe)
        return note


      //else, if the user selects a time period, show notes from that time period (layers on top of or after the previous, so all notes from THAT beach under this time)
      //this would NOT layer on top of if All beaches are selected
      } else if (this.state.startDate && this.state.endDate){
        console.log("else if", this.state)
        let formatDate = note.created_at.split("T")
        let justDate = formatDate.shift()

        console.log("and we have ", justDate)
        var format = function(input) {
          var array = (input || '').toString().split(/\-/g);
          array.push(array.shift());
          return array.join('/') || null;
        }

        //nested if, this.state.selectBeach === ALL, show notes from all beaches within this time frame
        if (this.state.selectBeach === "All") {
          //compare the date with justDate, if justDate fitz within the zone then holdMe.push(note)
        }
        // nested else if,


        console.log("LETS DO THIS NOW MERCY I CAN NOT ALLOW LETS DO THIS NOW")
        console.log("format!!!!!!!", format(justDate));
        console.log(format('2000-12-01'));

        debugger;

        //if no selection, show nothing
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

      startDate={this.state.startDate}
      endDate={this.state.endDate}
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
