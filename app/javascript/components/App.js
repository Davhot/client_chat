import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Helmet } from 'react-helmet'
import cookie from 'react-cookies'
import toaster from 'toasted-notes';

import Login from './Login'
import Signup from './Signup'
import ForgotPassword from './ForgotPassword'

import configureStore from '../configureStore'
const store = configureStore()

function redirect_on_unauthorize() {
  console.log(cookie)
  console.log(cookie.load('Authorization') === "")

  if (!cookie.load('Authorization')) {
    cookie.remove('Authorization')
    location.href = '/login';
  }
}

class App extends React.Component {
  async logoutRequest() {
    const response = await fetch('/logout_api', {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: { 'Content-Type': 'application/json' },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer' // no-referrer, *client
    });
    let notify_message;
    if(response.status != 204) {
      notify_message = "Ошибка!";
    } else {
      cookie.remove('Authorization');
      notify_message = "Вы успешно вышли!";
      redirect_on_unauthorize();
    }
    toaster.notify(notify_message, { duration: 2000, position: 'top-right' });
  }

  log_out() {
    if(confirm('Are you sure?')){
      this.logoutRequest().catch(error => console.log(error));
    }
  }

  render () {
    return (
      <Provider store={store}>
        <Helmet>
          <title>Chat</title>
          <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
        </Helmet>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={() => { redirect_on_unauthorize(); return (<button onClick={() => this.log_out()}><i className="fa fa-sign-out"></i>log out</button>) }} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/sign_up" component={Signup} />
            <Route exact path="/forgot_password" component={ForgotPassword} />
          </Switch>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App;
