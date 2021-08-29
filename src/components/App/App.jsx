import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import agent from '../../agent';
import Header from '../Header';
import { APP_LOAD, REDIRECT } from '../../constants/actionTypes';

import { store } from '../../store';
import AppRouter from './AppRouter/AppRouter';

const mapStateToProps = (state) => ({
  appLoaded: state.common.appLoaded,
  appName: state.common.appName,
  currentUser: state.common.currentUser,
  redirectTo: state.common.redirectTo,
});

const mapDispatchToProps = (dispatch) => ({
  onLoad: (payload, token) => dispatch({
    type: APP_LOAD,
    payload,
    token,
    skipTracking: true,
  }),
  onRedirect: () => dispatch({ type: REDIRECT }),
});

function App({
  appName,
  redirectTo,
  currentUser,
  appLoaded,
  onRedirect,
  onLoad,
}) {
  useEffect(() => {
    const token = window.localStorage.getItem('jwt');

    if (token) {
      agent.setToken(token);
    }

    onLoad(token ? agent.Auth.current() : null, token);
  }, []);

  useEffect(() => {
    if (redirectTo) {
      store.dispatch(push(redirectTo));
      onRedirect();
    }
  }, [redirectTo]);

  return (
    <div>
      <Header appName={appName} currentUser={currentUser} />
      {appLoaded ? (
        <AppRouter />
      ) : null}
    </div>
  );
}

App.defaultProps = {
  appLoaded: false,
  appName: '',
  redirectTo: undefined,
  currentUser: undefined,
  onLoad: () => {},
  onRedirect: () => {},
};

App.propTypes = {
  appLoaded: PropTypes.bool,
  appName: PropTypes.string,
  redirectTo: PropTypes.string,
  currentUser: PropTypes.shape({
    email: PropTypes.string,
    token: PropTypes.string,
    username: PropTypes.string,
  }.isRequired),
  onLoad: PropTypes.func,
  onRedirect: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
