import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { store, history } from './store';

import './library.css';

import App from './components/App/App';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" component={App} />
        </Switch>
      </ConnectedRouter>
    </Router>
  </Provider>,

  document.getElementById('root'),
);
