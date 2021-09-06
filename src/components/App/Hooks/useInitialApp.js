import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import agent from '../../../agent';
import { store } from '../../../store';
import { APP_LOAD, REDIRECT } from '../../../constants/actionTypes';

export const useInitialApp = () => {
  const dispatch = useDispatch();

  const {
    appName,
    redirectTo,
    currentUser,
    appLoaded,
    // @ts-ignore
  } = useSelector((state) => state.common);

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
