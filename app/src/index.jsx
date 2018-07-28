import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createReduxStore from './config/store';
import { BrowserRouter, browserHistory } from 'react-router-dom';
// import cookie from 'react-cookie';
import Routes from './routes';

const store = createReduxStore();

ReactDOM.render(
  (
    <Provider store={store}>
      <BrowserRouter history={browserHistory}>
        <Routes />
      </BrowserRouter>
    </Provider>
  ),
  document.getElementById('app'),
);
