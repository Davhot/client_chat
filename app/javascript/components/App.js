import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Helmet } from 'react-helmet'
import cookie from 'react-cookies'
import toaster from 'toasted-notes';

import Login from './Login'
import Signup from './Signup'
import ForgotPassword from './ForgotPassword'
import Header from './Header'
import ConfirmEmail from './ConfirmEmail'

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
            <Route exact path="/" component={Header} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/sign_up" component={Signup} />
            <Route exact path="/forgot_password" component={ForgotPassword} />
            <Route exact path="/confirm_email" component={ConfirmEmail} />
          </Switch>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App;
