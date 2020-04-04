import React from 'react'
import cookie from 'react-cookies'
import toaster from 'toasted-notes';

function redirect_on_unauthorize() {
  if (!cookie.load('Authorization')) {
    cookie.remove('Authorization')
    location.href = '/login';
  }
}

class Header extends React.Component {
  async logoutRequest() {
    const response = await fetch('/logout_api', {
      method: 'DELETE',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
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

  async send_email() {
    const response = await fetch('/api/v1/channels/send_email', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': cookie.load('Authorization')
      }
    });
    let notify_message;
    if(response.status != 200) {
      notify_message = "Ошибка!";
    } else {
      notify_message = "Успешно!";
    }
    toaster.notify(notify_message, { duration: 2000, position: 'top-right' });
  }

  log_out() {
    if(confirm('Are you sure?')){
      this.logoutRequest().catch(error => console.log(error));
    }
  }

  render () {
    redirect_on_unauthorize()
    return (
      <React.Fragment>
        <button onClick={() => this.log_out()}>
          <i className="fa fa-sign-out"></i>
          log out
        </button>

        <button onClick={() => this.send_email()}>
          <i className="fa fa-plus"></i>
          send email
        </button>
      </React.Fragment>
    )
  }
}

export default Header;
