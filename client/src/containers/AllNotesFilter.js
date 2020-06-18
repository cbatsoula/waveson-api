import React from 'react';
import NoteCard from '../components/NoteCard';

class AllNotesFilter extends React.Component {

  state = {

  }
  componentDidMount = () => {

  }

  changeOption = () => {
    console.log("hi hello")
  }

  handleSubmit = () => {
    console.log("hello hi")
  }

  render () {

    return (
      <div className="AllNotesFilter-Container">
      {
        this.props.allBeaches
        ?
        <>
        <form onSubmit={this.handleSubmit}>
        <h3>Filter by...</h3>
        <label>Beach</label>
        <select id="nation" value={this.props.allBeaches} onChange={this.changeOption} >
         <option value="Name">"Name"</option>
        </select>
        <input type="submit" value="Submit" />
        </form>
        </>
        :
        null

      }
      </div>

    )
  }
}

export default AllNotesFilter;
