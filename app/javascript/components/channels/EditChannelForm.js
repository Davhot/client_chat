import React from 'react'
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { updateChannelRequest } from "./Requests"
import { setEditing } from "../globalActions"

class EditChannelForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.cancelEditing = this.cancelEditing.bind(this);
  }

  cancelEditing(e) {
    e.preventDefault();
    this.props.setEditing(false);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.updateChannelRequest({
      channel: {
        name: this.getName.value,
        id: this.getId.value
      }
    })
  }

  render () {
    console.log(this.props.editChannel)
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Name</label>
        <input ref={input => this.getId = input}
          type="hidden"
          value={this.props.editChannel.id}
        />
        <input ref={input => this.getName = input}
          type="text"
          name="name"
          defaultValue={this.props.editChannel.name}
        />
        <button>Edit channel</button>
        <button className="btn" onClick={ this.cancelEditing }>
          Cancel
        </button>
      </form>
    )
  }
}

const structuredSelector = createStructuredSelector({
  editChannel: state => state.editChannel
});
const mapDispatchToProps = { setEditing, updateChannelRequest };
export default connect(structuredSelector, mapDispatchToProps)(EditChannelForm);
