/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CalendarPage from './containers/CalendarPage';

export default () => (
  <App>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/calendar" exact component={CalendarPage} />
    </Switch>
  </App>
);
