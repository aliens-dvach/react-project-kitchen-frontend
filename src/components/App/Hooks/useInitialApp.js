import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import PropTypes from 'prop-types';

import agent from '../../../agent';
import { store } from '../../../store';
import { APP_LOAD, REDIRECT } from '../../../constants/actionTypes';

export const currentUserTypes = PropTypes.shape({
  email: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
});

export const initialStateTypes = {
  appName: PropTypes.string.isRequired,
  currentUser: PropTypes.oneOfType([currentUserTypes, null]).isRequired,
  appLoaded: PropTypes.bool,
};

export const useInitialApp = () => {
  const dispatch = useDispatch();
  // @ts-ignore
  const common = useSelector((state) => state.common);
  PropTypes.checkPropTypes(initialStateTypes, common, 'common', 'useInitialApp');

  const {
    appName,
    redirectTo,
    currentUser,
    appLoaded,
  } = common;

  const onRedirect = useCallback(
    () => dispatch({ type: REDIRECT }),
    [dispatch],
  );

  const onLoad = useCallback(
    (payload, token) => dispatch({
      type: APP_LOAD,
      payload,
      token,
      skipTracking: true,
    }),
    [dispatch],
  );

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

  return {
    appName, redirectTo, currentUser, appLoaded,
  };
};

export default [useInitialApp];
