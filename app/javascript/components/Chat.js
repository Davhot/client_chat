import React from "react";
import { useForm } from "react-hook-form";

import toaster from 'toasted-notes';
import cookie from 'react-cookies'

function redirect_on_unauthorize() {
  let token = cookie.load('Authorization');
  if (!token || token == 'null') {
    cookie.remove('Authorization')
    location.href = '/login';
  }
}

export default function Chat(props) {
  async function logoutRequest() {
    const response = await fetch('/logout_api', {
      method: 'DELETE',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    });
    let notify_message;
    if(response.status != 204) {
      toaster.notify("Ошибка!", { duration: 2000, position: 'top-right' });
    } else {
      cookie.remove('Authorization');
      redirect_on_unauthorize();
    }
  }

  function log_out() {
    if(confirm('Are you sure?')){
      logoutRequest().catch(error => console.log(error));
    }
  }

  async function messageRequest(data) {
    const response = await fetch('/api/v1/clients/1/send_message', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    let notify_message;
    if(response.status != 200) {
      toaster.notify("Сообщение не отправлено", { duration: 2000, position: 'top-right' });
    } else {
      toaster.notify("Сообщение отправлено", { duration: 2000, position: 'top-right' });
    }
  }

  function onSubmit(values) {
    let params = {
      channel_id: '1',
      client: { message: values.message }
    }
    messageRequest(params).catch(error => console.log(error));
  }

  const { handleSubmit, register, errors } = useForm();

  redirect_on_unauthorize()
  return (
    <React.Fragment>
      <button onClick={() => log_out()}>
        <i className="fa fa-sign-out"></i>
        log out
      </button>

      <div className="container">
        <div className="login-form-wrapper">
          <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="login-body">
              <input className={errors.message ? "login-body-input error-field" : "login-body-input"}
                     autoFocus
                     type="message"
                     placeholder="write message..."
                     autoComplete="message"
                     name="message"
                     ref={register({ required: 'Required' })}/>
              <div className="error-message">
                {errors.message && errors.message.message}
              </div>
            </div>
            <div className="submit-wrapper">
              <input type="submit" className="form-button" value="send"/>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}
