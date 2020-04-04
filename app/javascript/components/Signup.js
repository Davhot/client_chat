import React from "react";
import { useForm } from "react-hook-form";

import toaster from 'toasted-notes';
import cookie from 'react-cookies'

export default function Signup(props) {
  function render_root_page() {
    location.href = '/'
  }

  async function signupRequest(data) {
    const response = await fetch('/signup_api', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    let notify_message;
    if(response.status != 200) {
      toaster.notify("Такой email уже зарегистрирован!", { duration: 2000, position: 'top-right' });
    } else {
      cookie.save('Authorization', response.headers.get('Authorization'));
      render_root_page();
    }
  }

  function onSubmit(values) {
    let params = {
      user: {
        email: values.email,
        password: values.password,
        password_confirmation: values.password_confirmation
      }
    }
    signupRequest(params).catch(error => console.log(error));
  }

  const { handleSubmit, register, errors, watch } = useForm();

  function check_auth() {
    if (cookie.load('Authorization')) { render_root_page() }
  }

  check_auth()
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
                     ref={ register({ required: true, minLength: 6 }) }/>
              <div className="error-message">
                {errors.password && errors.password.type === "required" && "Required"}
                {errors.password && errors.password.type === "minLength" && "Не меньше 6 символов"}
              </div>
            </div>
            <div className="login-body">
              <input className={errors.password_confirmation ? "login-body-input error-field" : "login-body-input"}
                     type="password"
                     placeholder="password confirmation"
                     name="password_confirmation"
                     autoComplete="new-password_confirmation"
                     ref={ register({ validate: (value) => value === watch('password') }) }/>
              <div className="error-message">
                {errors.password_confirmation && errors.password_confirmation.type === "validate" && "Должно совпадать с полем пароль"}
              </div>
            </div>
            <div className="submit-wrapper">
              <input type="submit" className="form-button" value="Sign up"/>
            </div>
          </form>
          <div className="login-footer">
            <span>already have an account?</span>
            <a href='/login'>SIGN IN</a>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
