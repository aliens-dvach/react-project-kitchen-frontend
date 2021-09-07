import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { currentUserTypes } from '../App/Hooks/useInitialApp';
import TopMenu from './TopMenu/TopMenu';

function Header({ appName, currentUser }) {
  return (
    <nav className="navbar navbar-light">
      <div className="container">

        <Link to="/" className="navbar-brand">
          {appName.toLowerCase()}
        </Link>
        <TopMenu currentUser={currentUser} />
      </div>
    </nav>
  );
}

export default Header;

Header.propTypes = {
  appName: PropTypes.string.isRequired,
  currentUser: PropTypes.oneOfType([currentUserTypes, null]).isRequired,
};
