import React from 'react'

import Sidebar from './Sidebar'
import Header from './Header'
import AdminWorkspace from './AdminWorkspace'
import Footer from './Footer'

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
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  render () {
    return (
      <React.Fragment>
        <button onClick={() => this.onSetSidebarOpen(true)}>
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
            open={this.state.sidebarOpen}
            onSetOpen={this.onSetSidebarOpen}
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

export default Admin;
