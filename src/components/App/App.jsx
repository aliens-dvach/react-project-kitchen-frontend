import React from 'react';
import PropTypes from 'prop-types';

import Header from '../Header/Header';
import AppRouter from './AppRouter/AppRouter';
import { initialStateTypes, useInitialApp } from './Hooks/useInitialApp';

function App() {
  const propsInitialApp = useInitialApp();
  PropTypes.checkPropTypes(initialStateTypes, propsInitialApp, 'props', 'app');

  const {
    appName,
    currentUser,
    appLoaded,
  } = propsInitialApp;

  return (
    <div>
      <Header appName={appName} currentUser={currentUser} />
      {appLoaded ? (
        <AppRouter />
      ) : null}
    </div>
  );
}

export default App;
