import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Helmet } from 'react-helmet';

import configureStore from '../configureStore'
const store = configureStore()

class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <Helmet>
          <title>Chat</title>
          <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
        </Helmet>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={() => { return (<h1>Hello</h1>) }} />
          </Switch>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App;
