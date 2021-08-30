/* eslint-disable react/jsx-fragments */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { privateRouters, publicRouters } from '../routers/routers';

export default function AppRouter() {
  // TODO Add a global authorization flag
  const isAuth = true;

  return (
    <Switch>
      {publicRouters.map(({ component: Component, path, exact }) => (
        <Route
          key={path}
          path={path}
            // eslint-disable-next-line react/jsx-props-no-spreading
          render={(props) => <Component {...props} />}
          exact={exact}
        />

      ))}
      {isAuth ? (
        <React.Fragment>
          {privateRouters.map(({ component: Component, path, exact }) => (

            <Route
              key={path}
              path={path}
              // eslint-disable-next-line react/jsx-props-no-spreading
              render={(props) => <Component {...props} />}
              exact={exact}
            />

          ))}
          <Redirect to="/login" />
        </React.Fragment>
      ) : null}
    </Switch>
  );
}
