import React from 'react';
import NoteCard from '../components/NoteCard';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';


class AllNotesFilter extends React.Component {

  state = {
    // startDate: new Date(),
  }
  componentDidMount = () => {

  }

  sortedList = () => {
    return this.props.allBeaches.map(beach => <option key={beach.id} value={beach.name} onChange={this.props.handleChange}>{beach.name}</option>);
  }

  // <DatePicker selected={this.props.startDate} onChange={this.props.handleDateChange} />
  render () {
    console.log("render props", this.props)
    return (
      <div className="AllNotesFilter-Container">
        <form onSubmit={this.props.handleSubmit}>
        <h3>Filter by</h3>
        <label>Beach</label>
          <select value={this.props.selectBeach} onChange={this.props.handleBeachChange}>
            <option value="Select" onChange={this.props.handleBeachChange}>Select</option>
            <option value="All" onChange={this.props.handleBeachChange}>All</option>
           {this.sortedList()}
          </select><br />
        <label>Between these dates</label>
          <DatePicker
          placeholderText="Click to select a date"
          dateFormat="MM/dd/yyyy"
          startDate={this.props.startDate}
          endDate={this.props.endDate}
          selected={this.props.startDate}
          selectsStart
          onChange={this.props.handleStartChange}/>

          <DatePicker
          placeholderText="Click to select a date"
          dateFormat="MM/dd/yyyy"
          startDate={this.props.startDate}
          endDate={this.props.endDate}
          minDate={this.props.startDate}
          selected={this.props.endDate}
          selectsEnd
          onChange={(date) => {this.props.handleEndChange(date)}}/>

        <input type="submit" value="Submit" />
        </form>

      </div>

    )
  }
}

export default AllNotesFilter;
