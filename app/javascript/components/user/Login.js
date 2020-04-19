import React from "react";
import { useForm } from "react-hook-form";

import toaster from 'toasted-notes';
import cookie from 'react-cookies'

export default function Login(props) {
  function render_root_page() {
    location.href = '/'
  }

  async function loginRequest(data) {
    const response = await fetch('/login_api', {
      credentials: 'omit',
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    let notify_message;
    if(response.status != 200) {
      toaster.notify("Неверный логин/пароль", { duration: 2000, position: 'top-right' });
    } else {
      cookie.save('Authorization', response.headers.get('Authorization'));
      render_root_page();
    }
  }

  function onSubmit(values) {
    let params = {
      user: {
        email: values.email,
        password: values.password
      }
    }
    loginRequest(params).catch(error => console.log(error));
  }

  function check_auth() {
    let token = cookie.load('Authorization');
    if (token && token != 'null') { render_root_page() }
  }

  const { handleSubmit, register, errors } = useForm();

  check_auth();
  return (
    <React.Fragment>
      <div className="container">
        <div className="login-form-wrapper">
          <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="login-body">
              <input className={errors.email ? "login-body-input error-field" : "login-body-input"}
                     autoFocus
                     type="email"
                     placeholder="email"
                     autoComplete="email"
                     name="email"
                     ref={register({
                            required: 'Required',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                              message: "invalid email address"
                            }
                         })}/>
              <div className="error-message">
                {errors.email && errors.email.message}
              </div>
            </div>
            <div className="login-body">
              <input className={errors.password ? "login-body-input error-field" : "login-body-input"}
                     type="password"
                     placeholder="password"
                     name="password"
                     autoComplete="new-password"
                     ref={ register({ required: 'Required' }) }/>
              <div className="error-message">
                {errors.password && errors.password.message}
              </div>
            </div>
            <div className="submit-wrapper">
              <input type="submit" className="form-button" value="Login"/>
            </div>
          </form>
          <div className="login-footer">
            <a href='/forgot_password'>Forgot Password?</a>
            <div>
              <span>Are you new?</span>
              <a href='/sign_up'>SIGN UP</a>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
