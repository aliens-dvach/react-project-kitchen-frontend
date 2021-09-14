import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { currentUserTypes } from '../../App/Hooks/useInitialApp';

function TopMenu({ currentUser }) {
  return (
    <ul className="nav navbar-nav pull-xs-right">
      <li className="nav-item">
        <Link to="/" className="nav-link">Home</Link>
      </li>
      {currentUser ? (
        <>
          <li className="nav-item">
            <Link to="/editor" className="nav-link">
              <i className="ion-compose" />
              {' '}
              New Post
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/settings" className="nav-link">
              <i className="ion-gear-a" />
              {' '}
              Settings
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to={`/@${currentUser.username}`}
              className="nav-link"
            >
              <span>
                Hello,
                {currentUser.username}
              </span>
            </Link>
          </li>
        </>
      ) : (
        <>
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              Sign in
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/register" className="nav-link">
              Sign up
            </Link>
          </li>
        </>
      )}
    </ul>
  );
}

export default TopMenu;

TopMenu.defaultProps = {
  currentUser: undefined,
};
TopMenu.propTypes = {
  currentUser: PropTypes.oneOfType([currentUserTypes]),
};
