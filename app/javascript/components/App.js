import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Helmet } from 'react-helmet'
import cookie from 'react-cookies'
import toaster from 'toasted-notes';

import Login from './user/Login'
import Signup from './user/Signup'
import ForgotPassword from './user/ForgotPassword'
import ConfirmEmail from './user/ConfirmEmail'

import Header from './Header'
import Chat from './Chat'
import Admin from './Admin'

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
            <Route exact path="/" component={Chat} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/sign_up" component={Signup} />
            <Route exact path="/forgot_password" component={ForgotPassword} />
            <Route exact path="/confirm_email" component={ConfirmEmail} />
            <Route path="/admin" component={Admin} />
          </Switch>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App;
