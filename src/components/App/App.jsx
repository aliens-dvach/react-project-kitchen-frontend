import React from 'react';
import Header from '../Header';
import AppRouter from './AppRouter/AppRouter';
import { useInitialApp } from './Hooks/useInitialApp';

function App() {
  const {
    appName,
    currentUser,
    appLoaded,
  } = useInitialApp();

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
