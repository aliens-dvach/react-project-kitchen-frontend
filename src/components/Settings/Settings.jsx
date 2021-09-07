// @ts-nocheck
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import agent from '../../agent';
import ListErrors from '../ListErrors';
import SettingsForm from './SettingsForm/SettingsForm';
import {
  SETTINGS_SAVED,
  //   SETTINGS_PAGE_UNLOADED,
  LOGOUT,
} from '../../constants/actionTypes';

function Settings() {
  const dispatch = useDispatch();
  const { errors } = useSelector((state) => state.settings);
  const currentUser = useSelector((state) => state.currentUser);

  const onClickLogout = () => dispatch({ type: LOGOUT });
  const onSubmitForm = (user) => dispatch({ type: SETTINGS_SAVED, payload: agent.Auth.save(user) });
  //   const onUnload = () => dispatch({ type: SETTINGS_PAGE_UNLOADED });

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">

            <h1 className="text-xs-center">Your Settings</h1>

            <ListErrors errors={errors} />

            <SettingsForm
              currentUser={currentUser}
              onSubmitForm={onSubmitForm}
            />

            <hr />

            <button
              className="btn btn-outline-danger"
              onClick={onClickLogout}
              type="button"
            >
              Or click here to logout.
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
