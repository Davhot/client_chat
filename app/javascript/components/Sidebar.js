import React from 'react'
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import { connect } from "react-redux";

import { onSetSidebarOpen } from "./SidebarActions"

class Sidebar extends React.Component {
  render () {
    return (
      <ul>
        <li>
          <NavLink
            to="/admin/channels"
            activeClassName="active"
            onClick={() => this.props.onSetSidebarOpen(false)}
          >
            manage channels
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/clients"
            activeClassName="active"
            onClick={() => this.props.onSetSidebarOpen(false)}
          >
            manage clients
          </NavLink>
        </li>
      </ul>
    )
  }
}

function mapStateToProps(state) { return state }
const mapDispatchToProps = { onSetSidebarOpen }; // выносим методы отдельно от компонента
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
