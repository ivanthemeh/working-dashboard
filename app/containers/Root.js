// @flow
import React, { Component } from 'react';
import { Router } from 'react-router';
import { Provider } from 'mobx-react';
import Routes from '../routes';
import '../store/database';

type Props = {
  store: {},
  history: {}
};

export default class Root extends Component<Props> {
  render() {
    return (
      <Provider>
        <Router history={this.props.history}>
          <Routes />
        </Router>
      </Provider>
    );
  }
}
