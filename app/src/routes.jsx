import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Globals
import App from './components/layouts/app';
import NotFound from './components/pages/notFound';

import HomePage from './components/pages/home';

export default () => (
  <div>
    <App>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path="*" name="Not Found" component={NotFound} />
      </Switch>
    </App>
  </div>
);
