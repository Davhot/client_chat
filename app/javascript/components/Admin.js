import React from 'react'
import { connect } from "react-redux";

import Sidebar from './Sidebar'
import Header from './Header'
import AdminWorkspace from './AdminWorkspace'
import Footer from './Footer'
import ManageChannels from './channels/ManageChannels'
import ManageClients from './ManageClients'

import { onSetSidebarOpen } from "./SidebarActions";
import { redirect_on_unauthorize } from "./user/Actions";

import ReactSidebar from "react-sidebar";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const routes = [
  {
    path: "/admin/channels",
    main: () =>
      <React.Fragment>
        <Header children=<h1>channels</h1> />
        <ManageChannels/>
      </React.Fragment>
  },
  {
    path: "/admin/clients",
    main: () =>
      <React.Fragment>
        <Header children=<h1>clients</h1> />
        <ManageClients/>
      </React.Fragment>
  },
  {
    path: "/admin",
    main: () =>
      <React.Fragment>
        <Header children=<h1>clients</h1> />
        <ManageClients/>
      </React.Fragment>
  }
];

class Admin extends React.Component {
  render () {
    redirect_on_unauthorize()
    return (
      <React.Fragment>
        <Router>
          <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={true}
                children={<route.main/>}
              />
            ))}
          </Switch>

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
            <p></p>
          </ReactSidebar>
        </Router>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) { return state }
const mapDispatchToProps = { onSetSidebarOpen }; // выносим методы отдельно от компонента
export default connect(mapStateToProps, mapDispatchToProps)(Admin);
