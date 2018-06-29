import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import './app.global.scss';
import { createHashHistory } from 'history';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';

const browserHistory = createHashHistory();

const routingStore = new RouterStore();

const history = syncHistoryWithStore(browserHistory, routingStore);

render(
  <AppContainer>
    <Root store={routingStore} history={history} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot store={routingStore} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
