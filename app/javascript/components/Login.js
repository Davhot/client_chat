import React, { useState } from "react";

import toaster from 'toasted-notes';
import cookie from 'react-cookies'

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function render_root_page() {
    location.href = '/'
  }

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function loginRequest(data) {
    const response = await fetch('/login_api', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: { 'Content-Type': 'application/json' },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data)
    });
    let notify_message;
    if(response.status != 200) {
      notify_message = "Неверный логин/пароль";
    } else {
      cookie.save('Authorization', response.headers.get('Authorization'));
      notify_message = "Вы успешно вошли!";
      render_root_page();
    }
    toaster.notify(notify_message, { duration: 2000, position: 'top-right' });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let params = {
      user: {
        email: email,
        password: password
      }
    }
    loginRequest(params).catch(error => console.log(error));
  }

  return (
    <React.Fragment>
      <div className="container">
        <div className="login-form-wrapper">
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-body">
              <input className="login-body-input"
                     autoFocus
                     type="email"
                     value={email}
                     onChange={e => setEmail(e.target.value)}
                     placeholder="email"
                     autoComplete="email" />
            </div>
            <div className="login-body">
              <input className="login-body-input"
                     value={password}
                     type="password"
                     onChange={e => setPassword(e.target.value)}
                     placeholder="password"
                     autoComplete="new-password" />
            </div>
            <div className="submit-wrapper">
              <input type="submit" className="form-button" value="Login"/>
            </div>
          </form>
          <div className="login-footer">
            <a href='#'>Forgot Password?</a>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
