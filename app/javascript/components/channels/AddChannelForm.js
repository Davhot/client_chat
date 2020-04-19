import React from 'react'
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { createChannelRequest } from "./Requests";

class AddChannelForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createChannelRequest({ channel: { name: this.getName.value } })
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Name</label>
        <input ref={input => this.getName = input} type="text" name="name" />
        <button>Add new channel</button>
      </form>
    )
  }
}

const structuredSelector = createStructuredSelector({});
const mapDispatchToProps = { createChannelRequest };
export default connect(structuredSelector, mapDispatchToProps)(AddChannelForm);
