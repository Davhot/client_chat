import React from 'react'
import { connect } from "react-redux";

import Sidebar from './Sidebar'
import Header from './Header'
import AdminWorkspace from './AdminWorkspace'
import Footer from './Footer'

import { onSetSidebarOpen } from "./SidebarActions"

import ReactSidebar from "react-sidebar";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const routes = [
  {
    path: "/admin/channels",
    main: () => <h2><Header/><p>channels</p></h2>
  },
  {
    path: "/admin/clients",
    main: () => <h2><Footer/><p>clients</p></h2>
  }
];

class Admin extends React.Component {
  render () {
    return (
      <React.Fragment>
        <button onClick={() => this.props.onSetSidebarOpen(true)}>
          Open sidebar
        </button>
        <Header/>
        <Router>
          <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={<route.main />}
              />
            ))}
          </Switch>
          <Footer/>

          <ReactSidebar
            sidebarClassName="sidebar"
            sidebar=<Sidebar/>
            open={this.props.sidebarOpen}
            onSetOpen={this.props.onSetSidebarOpen}
            styles={{ sidebar: { background: "white" } }}
            styles={{
                      content: {
                        position: ""
                      },
                      root: {
                        position: ""
                      }
                    }}
          >
            <p>1</p>
          </ReactSidebar>
        </Router>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) { return state }
const mapDispatchToProps = { onSetSidebarOpen }; // выносим методы отдельно от компонента
export default connect(mapStateToProps, mapDispatchToProps)(Admin);
