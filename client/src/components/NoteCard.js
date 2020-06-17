import React from 'react';

class NoteCard extends React.Component {

  formatDate = (string) => {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(this.props.note.created_at).toLocaleString([],options);

  }


  renderTags = () => {
    // console.log(this.props)
    if (this.props.note.tags) {
      return this.props.note.tags.map(tag => {
        return tag.tag
      })
    }
  }

  renderBeach = () => {
    if (this.props.allBeaches.length > 0 ) {
      let beachID = this.props.note.beach_id
      console.log("beachID", beachID)

      let foundBeach = this.props.allBeaches.map(beach =>
        console.log("beach", beach);
        beach.id === beachID;
       )
      console.log("foundBeach", foundBeach)

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
          <li>{this.renderBeach()}</li>
        </ul>
        </div>
        {
          this.props.note.photo
          ?
          <img src={this.props.note.photo} width="500" crop="scale" />
          :
          null
        }
          <button classname="button" onClick={() => {this.props.handleDelete(this.props.note)}}>DELETE</button>
          <button classname="button" onClick={() => {this.props.handleEdit(this.props.note)}}>EDIT</button>




      </div>
    )
  }

}
export default NoteCard
