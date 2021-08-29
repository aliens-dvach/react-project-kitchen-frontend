/* eslint-disable react/jsx-fragments */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { privateRouters, publicRouters } from '../routers/routers';

export default function AppRouter() {
  // TODO Add a global authorization flag
  const isAuth = true;

  return (
    <Switch>
      {publicRouters.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          component={route.component}
          exact={route.exact}
        />
      ))}
      {isAuth ? (
        <React.Fragment>
          {privateRouters.map((route) => (

            <Route
              key={route.path}
              path={route.path}
              component={route.component}
              exact={route.exact}
            />

          ))}
          <Redirect to="/login" />
        </React.Fragment>
      ) : null}
    </Switch>
  );
}
