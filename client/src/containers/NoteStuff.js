import React from 'react';
import { Link } from 'react-router-dom';
import NoteCard from '../components/NoteCard';
import PhotoUpload from './PhotoUpload';
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
import cloudinary from 'cloudinary-react';


class NoteStuff extends React.Component {

  state = {
    note: null,
    allNotes: null,
    oneNote: null,
    select: false,
    // tag: null,
    // oneTag: null,
    // allTags: null,
    photoInfo: null,
    loading: false,
    idkmydude: null,
  }

  handleSubmit = event => {
  event.preventDefault();

  let thisOne = this.props.allBeaches.find(beach => {
    return beach.name === this.props.currentBeach.name
  })

  if (this.props.select){
    console.log("this.props.oneNote.id", this.props.oneNote.id)
    fetch(`/api/notes/${this.props.oneNote.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "PATCH",
        "Access-Control-Allow-Origin": "http://localhost"
      },
      body: JSON.stringify({
        note: this.props.note,
        user_id: this.props.currentUser.id,
        beach_id: thisOne.id,
       })
    })
      .then(r => r.json())
      .then(data => {
        // console.log("data", data)
        //update one object in state array
        let updatedNotes = this.state.allNotes.map(note => {
          if (note.id === this.props.oneNote.id){
            return this.props.oneNote
          } else {
            return note
          }
        })
        this.setState({
          note: "",
          allNotes: updatedNotes,
          select: false,
        })
      })

  } else {
    this.postNotes()
    // this.postTags()
    }
  };


//not inn use
  // postTags = () => {
  //   let thisOne = this.props.allBeaches.find(beach => {
  //     return beach.name === this.props.currentBeach.name
  //   })
  //   fetch(`/api/tags`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Accept": "application/json"
  //     },
  //     body: JSON.stringify({
  //       tag: this.state.tag,
  //       user_id: this.props.currentUser.id,
  //       beach_id: thisOne.id,
  //     })
  //   })
  //     .then( res => res.json())
  //     .then( data => {
  //       console.log("back from post tag", data)
  //       this.setState({
  //         tag: "",
  //         allTags: [...this.state.allTags, data]
  //       }, () => {console.log("POSTED TAG", this.state.allTags)})
  //     })
  // }

  ifPhoto = () => {
    if (this.state.photoInfo){
      return this.state.photoInfo[0].secure_url
    } else {
      return null
    }
  }

  postNotes = () => {
    let thisOne = this.props.allBeaches.find(beach => {
      return beach.name === this.props.currentBeach.name
    })
    // this.setState({
    //
    // })
    // perhaps make another function, add Note, that looks through
    // allNotes and places this newly made note to the tip top
    // would need at least one arg, the id, to find from the time of
    // submit to push it up


    // let thisPhoto = this.state.photoInfo[0].secure_url

    console.log("body:", this.state.note, this.props.currentUser.id, thisOne.id, this.props.currentBeach)
    fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        note: this.state.note,
        user_id: this.props.currentUser.id,
        beach_id: thisOne.id,
        photo: this.ifPhoto(),
        beach_name: this.props.currentBeach.name
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log("back from post", data)
        this.setState({
          note: " ",
          select: false,
          allNotes: [data, ...this.state.allNotes]
        }
        , () => {console.log("POSTED NOTE immed", this.state.allNotes)}
       )
        console.log("POSTED NOTE", this.state.allNotes)
      });
  }

  componentDidMount() {
    this.fetchNotes()
    // this.fetchTags()
  }

  fetchNotes = () => {
    let thisOne = this.props.allBeaches.find(beach => {
      return beach.name === this.props.currentBeach.name
    })
    let userID = this.props.currentUser.id
    console.log("userID", userID)
    fetch('/api/notes')
      .then( r => r.json())
      .then( stuff => {
        let findFromNotes = stuff.filter( note => {
          return note.beach_id === thisOne.id && note.user_id === userID})
        console.log("pls", findFromNotes)
        // debugger;


        this.setState({
          allNotes: findFromNotes
        }, () => {console.log("fetchNotes", this.state.allNotes, userID)})

      })
  }
  // fetchTags = () => {
  //   let thisOne = this.props.allBeaches.find(beach => {
  //     return beach.name === this.props.currentBeach.name
  //   })
  //   let userID = this.props.currentUser.id
  //   fetch('/api/tags')
  //     .then( r => r.json())
  //     .then( stuff => {
  //       let findFromTags = stuff.filter( tag => {
  //         return tag.beach_id === thisOne.id && tag.user_id === userID})
  //
  //       this.setState({
  //         allTags: findFromTags
  //       })
  //
  //     })
  // }

  handleChange = (event) => {
    this.setState({
      oneNote: {...this.state.oneNote, [event.target.name]: event.target.value},
      [event.target.name]: event.target.value,
      oneTag: {...this.state.oneTag, [event.target.name]: event.target.value},
    });
  };

  handleEdit = (thing) => {
  // console.log("one note", thing, thing.id)
    this.setState({
      oneNote: thing,
      select: true
    });

  }

  handleDelete = (thing) => {
  // console.log("delete this review", thing.id)
   fetch(`/api/notes/${thing.id}`, {
     method: "DELETE",
   })
     .then( r => r.json())
     .then( data => {
       console.log("removed", data)
       var newItems = this.state.allNotes.filter((note) => {
         return note.id !== thing.id});
     this.setState({ allNotes: newItems });
     })
  }

  renderNoteCards = () => {
    return this.state.allNotes.map( note => {
      return <NoteCard allBeaches={this.props.allBeaches} note={note} key={note.id} handleEdit={this.handleEdit} handleDelete={this.handleDelete} handleChange={this.handleChange} />
    })
  }

  setShit = (result) => {
    this.setState({
      photoInfo: result,
      loading: null,
      idkmydude: "Photo selected and ready to upload!"

    })
  }

  uploadWidget() {
    this.setState({
      loading: true,
    })
    window.cloudinary.openUploadWidget({ cloud_name: 'dlybpe5za', upload_preset: 'waveson'},
        (error, result) => {
            // console.log(result);
            if (result) {
              this.setShit(result)
            }

        });
      }

      // <input
      // onChange={this.handleChange}
      // name="tag"
      // type="text"
      // value={this.state.oneTag ? this.state.oneTag.tag : this.state.tag}
      // placeholder="tags"/>
      // <Image cloudName="dlybpe5za" publicId="sample" width="300" crop="scale" />
  render () {
    console.log("note", this.state)
    console.log("note props", this.props)
    return (
      <div className="Note-Container">
            <div className="upload">
                <button onClick={this.uploadWidget.bind(this)} className="upload-button">
                    📷 ADD IMAGE 📸
                </button>

                {
                  this.state.idkmydude
                  ?
                  this.state.idkmydude
                  :
                  null
                }
            </div>

        <form className="Note-Form" onSubmit={this.handleSubmit}>
          <br />
          <textarea
          id="styled"
          onChange={this.handleChange}
          name="note"
          value={this.state.oneNote ? this.state.oneNote.note : this.state.note}
          rows="4"
          cols="50"
          type="text"
          placeholder="Start your entry here!"/>
          <input className="button" type="submit" value="Submit" />
        </form>
      {
        this.state.allNotes
        ?
        this.renderNoteCards()
        :
        <div className="Loader"/>
      }

      </div>
    )
  }
}
export default NoteStuff
