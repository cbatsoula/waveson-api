import React from 'react';

class NoteCard extends React.Component {

  formatDate = (string) => {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(this.props.note.created_at).toLocaleString([],options);
    // more than one solution, the beauty of code
    // note.created_at.split("T")

  }

  findBeachName= () => {
    // let thisOne = this.props.allBeaches.find(beach => {
    //   return beach.name === this.props.currentBeach.name
    let thisBeach = this.props.note.beach_id
    console.log("thisBeach", thisBeach)
    console.log("AllBeaches", this.props.allBeaches)

    let findBeach = this.props.allBeaches.find(beach => {
      if (beach.id = thisBeach) {
        console.log("HELL YEA", beach)
        return beach
      } else {
        console.log(beach)
      }

    })
    console.log("findBeach", findBeach)

  }


  renderTags = () => {
    // console.log(this.props)
    if (this.props.note.tags) {
      return this.props.note.tags.map(tag => {
        return tag.tag
      })
    }
  }
  // <li>Tags: {this.renderTags()}</li>

  render () {
    console.log(" note card props ", this.props)
    // console.log("note card", window.location)
    return (
      <div className="Note-Card">
        <div className="Note-Text">
        <ul>
          <li>{this.props.note.note}</li>
          <li>{this.formatDate()}</li>
          <li>{this.props.note.beach_name}</li>
        </ul>
        </div>
        {
          this.props.note.photo
          ?
          <img src={this.props.note.photo} width="500" crop="scale" />
          :
          null
        }

        {
          window.location.pathname === "/notes"
          ?
          null
          :
          <>
            <button classname="button" onClick={() => {this.props.handleDelete(this.props.note)}}>DELETE</button>
            <button classname="button" onClick={() => {this.props.handleEdit(this.props.note)}}>EDIT</button>
          </>

        }



      </div>
    )
  }

}
export default NoteCard
