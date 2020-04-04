import React from "react";
import { useForm } from "react-hook-form";

import toaster from 'toasted-notes';
import cookie from 'react-cookies'

export default function ConfirmEmail(props) {
  function render_root_page() {
    location.href = '/login'
  }

  async function resentEmailRequest(data) {
    const response = await fetch('/confirmations/resend_email', {
      method: 'PATCH',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    let notify_message;
    if(response.status != 200) {
      toaster.notify("Пользователь не найден.", { duration: 2000, position: 'top-right' });
    } else {
      render_root_page();
    }
  }

  function onSubmit(values) {
    let params = { email: values.email }
    resentEmailRequest(params).catch(error => console.log(error));
  }

  function check_auth() {
    if (cookie.load('Authorization')) { render_root_page() }
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
                     placeholder="email confirmation"
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
            <div className="submit-wrapper">
              <input type="submit" className="form-button" value="send instructions"/>
            </div>
          </form>
          <div className="login-footer">
            <a href='/login'>SIGN IN</a>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
