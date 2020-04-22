// Функции обращения к API
import React from "react";
import cookie from 'react-cookies';
import toaster from 'toasted-notes';

import { redirect_on_unauthorize_response } from "../user/Actions";

import {
  getChannelsSuccess,
  createChannelSuccess,
  deleteChannelSuccess,
  updateChannelSuccess
} from "./Actions"

function show_toaster_message(notify_message) {
  toaster.notify(notify_message, { duration: 2000, position: 'top-right' });
}

export function getChannelsRequest() {
  return dispatch => {
    return fetch('/api/v1/channels', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': cookie.load('Authorization')
      }
    }).then(response => redirect_on_unauthorize_response(response))
      .then(response => response.json())
      .then(json => dispatch(getChannelsSuccess(json.data)))
      .catch(error => console.log(error));
  }
};

export function createChannelRequest(data) {
  return dispatch => {
    return fetch('/api/v1/channels', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': cookie.load('Authorization')
      },
      body: JSON.stringify(data)
    }).then(response => redirect_on_unauthorize_response(response))
      .then(response => response.json())
      .then(json => {
        if(json.error) {
          return dispatch({type: 'ADD_ERROR', error: json});
        } else {
          return dispatch(createChannelSuccess(json));
        }
      })
      .catch(err => dispatch({type: 'ADD_ERROR', error: err}));
  };
};

export function deleteChannelRequest(id) {
  return dispatch => {
    return fetch('/api/v1/channels/' + id, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': cookie.load('Authorization')
      }
    }).then(response => redirect_on_unauthorize_response(response))
      .then(response => function (response) {
          if (response.status == 204){
            return response;
          } else {
            return null;
          }
        }
      )
      .then(response => dispatch(deleteChannelSuccess(id)))
      .then(show_toaster_message('Успешно удалено!'))
      .catch(error => console.log(error));
  }
};

export function updateChannelRequest(data) {
  return dispatch => {
    return fetch('/api/v1/channels/' + data.channel.id, {
      method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': cookie.load('Authorization')
      },
      body: JSON.stringify(data)
    }).then(response => redirect_on_unauthorize_response(response))
      .then(response => response.json())
      .then(json => dispatch(updateChannelSuccess(json)))
      .then(show_toaster_message('Успешно обновлено!'))
      .catch(error => console.log(error));
  };
}
