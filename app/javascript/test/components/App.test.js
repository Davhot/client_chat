import React from 'react';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { BrowserRouter, Switch, Route, Router } from 'react-router-dom'
import { MemoryRouter } from 'react-router';
import { createBrowserHistory } from "history";

import App from 'app/javascript/components/App';

import '../setupTests';
import { shallow, mount } from 'enzyme';

import configureStore from 'app/javascript/configureStore'
const store = configureStore()

describe('App', () => {
  it('should render h1', () => {
    const history = createBrowserHistory();
    history.push('/');
    const wrapper = mount(
      <Router history={history}>
        <App/>
      </Router>
    );
    expect(wrapper.find("h1").length).toBe(1);
  });
});
