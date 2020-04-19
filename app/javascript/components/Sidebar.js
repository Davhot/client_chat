import React from 'react'
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import { connect } from "react-redux";

import { onSetSidebarOpen } from "./SidebarActions";
import { log_out } from "./user/Actions";

class Sidebar extends React.Component {
  render () {
    return (
      <ul>
        <li id="login-wrapper">
          <p id="login">example@email.com</p>
          <button className="btn" onClick={() => log_out() }>
            <i className="fa fa-sign-out"></i>
            log out
          </button>
        </li>
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
const mapDispatchToProps = { onSetSidebarOpen };
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
