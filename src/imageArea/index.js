import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../style.css'
import './imageArea.css'

class ImageArea extends React.Component {
  constructor(props) {
    super(props)
    this.getImgStyle = this.getImgStyle.bind(this)
    this.getCurrentImage = this.getCurrentImage.bind(this)
  }
  getCurrentImage() {
    return this.props.album.images[this.props.imageIndex]
  }
  getImgStyle() {
    return {
      backgroundImage: `url(${this.getCurrentImage().link})`,
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain'
    }
  }
  render() {
    return (
      <div className="d-flex flex-column flex-grow">
        { this.props.album && this.props.imageIndex > -1 &&
        <div className="d-flex flex-column flex-grow">
          <div className="card flex-grow image" style={this.getImgStyle()} />
          <div className="image-desc">
            <span>{this.getCurrentImage().description}</span>
            <ul className="list-inline mb-0">
              <li className="list-inline-item">Album: <a href={this.props.album.url} target="_blank">{this.props.album.title}</a></li>
              <li className="list-inline-item"><a href={`https://imgur.com/${this.getCurrentImage().id}`} target="_blank">Open this image on imgur</a></li>
            </ul>
          </div>
        </div>
        }
      </div>
    )
  }
}

export default ImageArea