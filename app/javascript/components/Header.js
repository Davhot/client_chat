import React from 'react';
import cookie from 'react-cookies';
import { connect } from "react-redux";

import { onSetSidebarOpen } from "./SidebarActions";

class Header extends React.Component {
  render () {
    return (
      <header>
        <button className="btn" onClick={() => this.props.onSetSidebarOpen(true)}>
          <i className="fa fa-bars"></i>
        </button>
        { this.props.children }
      </header>
    )
  }
}

function mapStateToProps(state) { return state }
const mapDispatchToProps = { onSetSidebarOpen }; // выносим методы отдельно от компонента
export default connect(mapStateToProps, mapDispatchToProps)(Header);
