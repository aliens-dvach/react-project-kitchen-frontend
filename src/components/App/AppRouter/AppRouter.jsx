import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from '../routers/PrivateRoute/PrivateRoute';
import { privateRouters, publicRouters } from '../routers/routers';

export default function AppRouter() {
  return (
    <Switch>
      {publicRouters.map(({ component: Component, path, exact }) => (
        <Route
          key={path}
          path={path}
          exact={exact}
        >
          <Component />
        </Route>

      ))}
      {privateRouters.map(({ component: Component, path, exact }) => (
        <PrivateRoute
          key={path}
          path={path}
          exact={exact}
        >
          <Component />
        </PrivateRoute>
      ))}
    </Switch>
  );
}
