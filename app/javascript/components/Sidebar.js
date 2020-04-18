import React from 'react'
import { BrowserRouter as Router, NavLink } from "react-router-dom";

class Sidebar extends React.Component {
  render () {
    return (
      <ul>
        <li>
          <NavLink to="/admin/channels" activeClassName="active">manage channels</NavLink>
        </li>
        <li>
          <NavLink to="/admin/clients" activeClassName="active">manage clients</NavLink>
        </li>
      </ul>
    )
  }
}

export default Sidebar;
