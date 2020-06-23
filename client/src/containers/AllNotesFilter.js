import React from 'react';
import NoteCard from '../components/NoteCard';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class AllNotesFilter extends React.Component {

  state = {
    // startDate: new Date(),
  }
  componentDidMount = () => {

  }

  sortedList = () => {
    return this.props.allBeaches.map(beach => <option key={beach.id} value={beach.name} onChange={this.props.handleChange}>{beach.name}</option>);
  }

  render () {
    console.log("render props", this.props)
    return (
      <div className="AllNotesFilter-Container">
        <form onSubmit={this.props.handleSubmit}>
        <h3>Filter by...</h3>
        <label>Beach</label>
          <select value={this.props.selectBeach} onChange={this.props.handleBeachChange}>
            <option value="Select" onChange={this.props.handleBeachChange}>Select</option>
            <option value="All" onChange={this.props.handleBeachChange}>All</option>
           {this.sortedList()}
          </select>
        <label>Week of </label>
        <DatePicker selected={this.props.startDate} onChange={this.props.handleDateChange} />
        <input type="submit" value="Submit" />
        </form>

      </div>

    )
  }
}

export default AllNotesFilter;
