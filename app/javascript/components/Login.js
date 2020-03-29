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

  function onSubmit(values) {
    let params = {
      user: {
        email: values.email,
        password: values.password
      }
    }
    loginRequest(params).catch(error => console.log(error));
  }

  const { handleSubmit, register, errors } = useForm();

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
            <a href='#'>Forgot Password?</a>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
