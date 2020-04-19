import React from 'react'
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { deleteChannelRequest } from "./Requests";

class ChannelsTable extends React.Component {
  delete_channel(channel_id) {
    if (confirm('Are you sure?')) { this.props.deleteChannelRequest(channel_id) }
  }

  render () {
    return (
      <table className="table">
        <tbody>
          {this.props.channels.sort(function(a, b) { return a.id - b.id }).map((channel) =>
            <tr key={channel.id}>
              <td>{channel.name}</td>
              <td>
                <button className="btn" onClick={() => console.log("edit " + channel.id) }>
                  <i className="fa fa-pencil"></i>
                </button>
              </td>
              <td>
                <button className="btn" onClick={() => this.delete_channel(channel.id) }>
                  <i className="fa fa-trash"></i>
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    )
  }
}

const structuredSelector = createStructuredSelector({
  channels: state => state.channels
});

const mapDispatchToProps = { deleteChannelRequest };
export default connect(structuredSelector, mapDispatchToProps)(ChannelsTable);
