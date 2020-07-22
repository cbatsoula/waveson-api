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

  formatDate = function(string) {
    var options = { year: 'numeric', month: '2-digit', day: 'numeric' };
    return new Date(string).toLocaleString([],options);
    // 2-digit
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("handleSubmit - formatDate on state", this.formatDate(this.state.startDate), this.formatDate(this.state.endDate))

    console.log("submit!!", this.state, this.props);

    let holdMe = []
    let compare = []
    let allNotes = this.state.allNotes
    console.log("allNotes", allNotes)
    // if the user selects to see notes from all beaches = show all Notes
    // what if the user wants to see all Notes from one week?
    if (this.state.selectBeach === "All"){
      this.setState({
        sortedNotes: allNotes,
      }, () => {console.log("All!!", this.state)})
    }
    let theseNotes = this.state.allNotes.map(note => {
    //i can either sort and spit with arrays in the backend or frontend
    //the cons of doing it in client is it will take a while for all this computing-i think
    //the cons of doing in backend would be - more fetch requests which also take time but learning to manipulate more in the backend could be good for me as a developer bc its safer to do that generally speaking, my app doesnt hold sensitive data like that so I have less conseq.
    //i miss rubber ducking talking out my code but studio lyfe means constant noise

      //it does seem like i NEED a switch statement for at least three conditions
      //All beaches
        //all notes from all beaches
        //some notes from all beaches based on time slot
      //Selected beach
        //all notes from selected
        //some notes from selected beach based on time slot
      //

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



      // else, if the user selects a beach, show all notes from that beach
      //if this.state.startDate compare dates, sort notes and spit them out
      if (note.beach_name === this.state.selectBeach) {
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
        let a1 = format(justDate)

        let formatStart = this.formatDate(this.state.startDate)
        let formatEnd = this.formatDate(this.state.endDate)
        // console.log("COMPARE TO NOTE'S DATE - A1", formatStart, formatEnd)

        // refSTR.localeCompare(compSTR)
        // -1 if referenceStr occurs before compareString;
        // 1 if the referenceStr occurs after compareString;
        // 0 if they are equivalent;

        // console.log("start - a1:",formatStart,":",a1, formatStart.localeCompare(a1))
        //is formatStart before or after a1?
        //-1 06/14/2020 is before 06/18/2020 - true, push
        //-1 06/14/2020 is before 06/19/2020 - true, push
        //-1 06/14/2020 is before 06/25/2020 - true, but a1 is after fE
        //
        // console.log("end - a1:",formatEnd,":",a1, formatEnd.localeCompare(a1))
        // is formatEnd before or after a1?
        //1 06/20/2020 is after 06/18/2020 -  true, push
        //1 06/20/2020 is after 06/19/2020 ...not
        //-1 06/20/2020 is before 06/25/2020 - true, but dont push
        //
        // console.log("a1 - end:",a1,":",formatEnd, a1.localeCompare(formatEnd))
        //is a1 before or after formatEnd?
        //-1 06/18/2020 is before 06/20/2020 - true, push
        //-1 06/19/2020 is before 6/20/2020 - true, push
        //1 06/25/2020 is after 06/20/2020 - true but dont push
        //so if a1.localeCompare(formatEnd) === -1

        // if (a1.localeCompare(formatEnd) === -1){
        //   console.log("a1 - end === -1 push")
        // }
        // console.log("a1 - start:",a1,":",formatStart, a1.localeCompare(formatStart))
        //
        // if (a1.localeCompare(formatStart) === 1){
        //   console.log("a1 - start === 1 push")
        // }

        if (a1.localeCompare(formatStart) >= 1 && a1.localeCompare(formatEnd) <= -1){
          holdMe.push(note)
          console.log("holdMe", holdMe)
          return note
          console.log("a1 - start === 1 push && a1 - end === -1")
        } else if (a1.localeCompare(formatStart) === 0 || a1.localeCompare(formatEnd) ===0) {
          holdMe.push(note)
          console.log("holdMe", holdMe)
          return note
          console.log("a1 - start === 0 push && a1 - end === 0")
        }
        //is a1 before or after formatStart?
        //1 06/18/2020 is after 06/14/2020 -  true, push
        //1 06/19/2020 is after 06/14/2020 - true, push
        //1 06/25/2020 is after 06/14/2020 - true, push


        //if this returns 1, that note comes after
        //if this returns 0, that note is equal
        //if it returns -1, that note comes beforee

        // compare.push(a1)
        // holdMe.push(note)
        debugger;
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
