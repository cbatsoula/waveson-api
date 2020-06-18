import React from 'react';
import NoteCard from '../components/NoteCard';

class AllNotesFilter extends React.Component {

  state = {

  }
  componentDidMount = () => {

  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleSubmit = (event) => {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }

  sortedList = () => {
    this.props.allBeaches.map((location, index) => <option key={index}>{location}</option>);
  }


  render () {


    return (
      <div className="AllNotesFilter-Container">

        <form onSubmit={this.handleSubmit}>
        <h3>Filter by...</h3>
        <label>Beach</label>
          <select value={this.props.allBeaches} onChange={this.handleChange} >
           {this.sortedList()}
          </select>
        <input type="submit" value="Submit" />
        </form>

      </div>

    )
  }
}

export default AllNotesFilter;
