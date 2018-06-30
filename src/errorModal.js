import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import $ from 'jquery'
import 'bootstrap'

class ErrorModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: null,
      id: Date.now()
    }
  }
  show(message) {
    this.setState({
      message
    })
    $(`#${this.state.id}`).modal()
  }
  render() {
    return (
      <div className="modal fade" id={this.state.id} tabIndex="-1" role="dialog" aria-labelledby={`${this.state.id}-title`} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`${this.state.id}-title`}>Error</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {this.state.message}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ErrorModal