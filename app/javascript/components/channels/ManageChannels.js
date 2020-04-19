import React from 'react'
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import ChannelsTable from './ChannelsTable'
import { getChannelsRequest } from "./Requests";

class ManageChannels extends React.Component {
  render () {
    this.props.getChannelsRequest();
    return (
      <ChannelsTable/>
    )
  }
}

const structuredSelector = createStructuredSelector({});

const mapDispatchToProps = { getChannelsRequest };
export default connect(structuredSelector, mapDispatchToProps)(ManageChannels);
