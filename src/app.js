import React from 'react'
import InputArea from './inputArea'
import ImageArea from './imageArea'
import ErrorModal from './errorModal'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      album: null,
      imageIndex: -1,
      disabled: false
    }

    this.isImageSelected = this.isImageSelected.bind(this)
    this.shuffle = this.getRandomImageIndex.bind(this)
    this.onUrlSubmit = this.onUrlSubmit.bind(this)
    this.onError = this.onError.bind(this)
    this.inputArea = React.createRef()
    this.errorModal = React.createRef()
  }
  componentWillMount() {
    const hash = window.location.hash
    if (!hash || hash.length <= 0 ) 
      return
    this.onUrlSubmit(hash.substr(1))
  }
  isImageSelected() {
    return this.state.imageIndex > -1 && this.state.album && this.state.album.images[this.state.imageIndex]
  }
  getRandomImageIndex(count) {
    return Math.floor(Math.random()*count);
  }
  onUrlSubmit(albumId) {
    if (this.state.album && this.state.album.id == albumId) {
      this.setState({
        imageIndex: this.getRandomImageIndex(this.state.album.images.length)
      })
      return
    }
    this.setState({ disabled: true })
    fetch(`https://api.imgur.com/3/album/${albumId}`, {
        headers: {
            Authorization: 'Client-ID 0b80b885e3d6809'
        }
    })
    .then(result => {
        if (result.ok) {
            return result.json()
        } else {
            throw 'There was an error while getting the album information'
        }
    })
    .then(json => {
        if (json.data && json.data.images) {
            this.setState({
              album: json.data,
              disabled: false,
              imageIndex: this.getRandomImageIndex(json.data.images.length)
            }, () => {
              window.location.hash = `#${albumId}`
              this.inputArea.current.setLink(json.data.link)
            })
        } else {
            throw 'This album was corrupted or does not have images'
        }
    })
    .catch(error => {
      this.onError(error)
      this.setState({ disabled: false })
    })
  }
  onError(error) {
    this.errorModal.current.show(error)
  }
  render() {
    return (
      <div className="container-fluid d-flex align-items-center justify-content-center flex-column h-100" style={this.state.disabled ? {backgroundColor: '#fff', opacity: 0.5} : null}>
        <div className={"card text-center m-3 " + (this.isImageSelected() ? 'w-100 h-100' : 'w-75')}>
          <div className="card-header">
            Image Shuffler
          </div>
          <div className="card-body d-flex flex-column flex-grow">
            <InputArea onSubmit={this.onUrlSubmit} onError={this.onError} disabled={this.state.disabled} link={this.state.album && this.state.album.link} ref={this.inputArea}/>
            <ImageArea album={this.state.album} imageIndex={this.state.imageIndex} />
          </div>
        </div>
        <ErrorModal message={this.state.error} ref={this.errorModal}/>
      </div>
    )
  }
}

export default App