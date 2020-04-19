import cookie from 'react-cookies';

export function render_root_page() {
  location.href = '/'
}

export function check_auth() {
  let token = cookie.load('Authorization');
  if (token && token != 'null') { render_root_page() }
}

export function log_out() {
  if(confirm('Are you sure?')){
    logoutRequest().catch(error => console.log(error));
  }
}

async function logoutRequest() {
  const response = await fetch('/logout_api', {
    method: 'DELETE',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
  });
  let notify_message;
  if(response.status != 204) {
    toaster.notify("Ошибка!", { duration: 2000, position: 'top-right' });
  } else {
    cookie.remove('Authorization', { path: '/' });
    redirect_on_unauthorize();
  }
}

export function redirect_on_unauthorize() {
  let token = cookie.load('Authorization');
  if (!token || token == 'null') {
    cookie.remove('Authorization')
    location.href = '/login';
  }
}
