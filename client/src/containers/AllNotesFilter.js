import React from 'react';
import NoteCard from '../components/NoteCard';

class AllNotesFilter extends React.Component {

  state = {
    // selectBeach: null,
  }
  componentDidMount = () => {

  }

  // handleChange = (event) => {
  //   console.log("event", event.target)
  //   this.setState({
  //     selectBeach: event.target.value
  //   }, () => {console.log("handleChange", this.state)});
  //
  // }
  //
  // handleSubmit = (event) => {
  //   // alert('Beach selected: ' + this.state.value);
  //   event.preventDefault();
  //   console.log("submit!!", this.state);
  //   // this.setState({
  //   //   selectBeach: event.target.value
  //   // });
  // }

  sortedList = () => {
    return this.props.allBeaches.map(beach => <option key={beach.id} value={beach.name} onChange={this.props.handleChange}>{beach.name}</option>);
  }
  // <option key={index}>{location}</option>


  render () {
    console.log("render props", this.props)

    return (
      <div className="AllNotesFilter-Container">

        <form onSubmit={this.props.handleSubmit}>
        <h3>Filter by...</h3>
        <label>Beach</label>
          <select value={this.props.selectBeach} onChange={this.props.handleChange} >
           {this.sortedList()}
          </select>
        <input type="submit" value="Submit" />
        </form>

      </div>

    )
  }
}

export default AllNotesFilter;
