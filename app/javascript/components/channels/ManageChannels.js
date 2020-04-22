import React from 'react'
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import ChannelsTable from './ChannelsTable'
import AddChannelForm from './AddChannelForm'
import EditChannelForm from './EditChannelForm'
import { getChannelsRequest } from "./Requests";

class ManageChannels extends React.Component {
  render () {
    this.props.getChannelsRequest();

    let channelForm;
    if(this.props.editing) {
       channelForm = <EditChannelForm/>
    } else {
      channelForm = <AddChannelForm/>
    }

    return (
      <React.Fragment>
        <ChannelsTable/>
        { channelForm }
      </React.Fragment>
    )
  }
}

const structuredSelector = createStructuredSelector({
  editing: state => state.editing
});

const mapDispatchToProps = { getChannelsRequest };
export default connect(structuredSelector, mapDispatchToProps)(ManageChannels);
