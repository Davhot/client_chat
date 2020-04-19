// Функции обращения к API
import React from "react";
import cookie from 'react-cookies';

import { redirect_on_unauthorize_response } from "../user/Actions";

import { getChannelsSuccess } from "./Actions"

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
