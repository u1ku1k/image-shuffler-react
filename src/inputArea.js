import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

const patternUrl = /^http(?:s)?\:\/{2}(?:m\.)?imgur\.com\/(?:a|gallery)\/(.*)$/

class InputArea extends React.Component {
  constructor(props) {
    super(props)
    this.validate = this.validate.bind(this)
    this.textInput = React.createRef()
  }
  validate() {
    const albumUrl = this.textInput.current.value
    if (!patternUrl.test(albumUrl)) {
      this.props.onError('This is not imgur-album url')
      return
    }
    this.props.onSubmit(patternUrl.exec(albumUrl)[1])
  }
  setLink(link) {
    this.textInput.current.value = link;
  }
  render() {
    return (
      <div className="input-group mb-3">
        <input 
          onKeyPress={(ev) => ev.key == 'Enter' && this.validate()}
          disabled={this.props.disabled}
          type="text" className="form-control" placeholder="Imgur Album Url" aria-label="Imgur Album Url" 
          ref={this.textInput} />
        <div className="input-group-append">
          <button 
            className="btn btn-outline-primary" 
            type="button" 
            onClick={this.validate} 
            disabled={this.props.disabled}>
            Shuffle!
          </button>
        </div>
      </div>
    )
  }
}

export default InputArea