import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { currentUserTypes } from '../../App/Hooks/useInitialApp';

function SettingsForm({ onSubmitForm, currentUser }) {
  const [formField, setFormField] = useState({
    image: '',
    username: '',
    bio: '',
    email: '',
    password: '',
  });

  const updateState = (field) => (ev) => {
    const newState = { ...formField, [field]: ev.target.value };

    setFormField(newState);
  };

  const submitForm = (ev) => {
    ev.preventDefault();
    const user = { ...formField };

    if (!user.password) {
      delete user.password;
    }

    onSubmitForm(user);
  };

  useEffect(() => {
    if (currentUser) {
      setFormField({
        ...formField,
        ...{
          image: currentUser.image || '',
          username: currentUser.username,
          bio: currentUser.bio,
          email: currentUser.email,
        },
      });
    }
  }, [currentUser]);

  return (
    <form onSubmit={submitForm}>
      <fieldset>

        <fieldset className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="URL of profile picture"
            value={formField.image}
            onChange={updateState('image')}
          />
        </fieldset>

        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="text"
            placeholder="Username"
            value={formField.username}
            onChange={updateState('username')}
          />
        </fieldset>

        <fieldset className="form-group">
          <textarea
            className="form-control form-control-lg"
            rows={8}
            placeholder="Short bio about you"
            value={formField.bio}
            onChange={updateState('bio')}
          />
        </fieldset>

        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="email"
            placeholder="Email"
            value={formField.email}
            onChange={updateState('email')}
          />
        </fieldset>

        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="password"
            placeholder="New Password"
            value={formField.password}
            onChange={updateState('password')}
          />
        </fieldset>

        <button
          className="btn btn-lg btn-primary pull-xs-right"
          type="submit"
        //   disabled={this.state.inProgress}
        >
          Update Settings
        </button>

      </fieldset>
    </form>
  );
}

export default SettingsForm;

SettingsForm.defaultProps = {
  currentUser: undefined,
};

SettingsForm.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
  currentUser: PropTypes.oneOfType([currentUserTypes]),
};
