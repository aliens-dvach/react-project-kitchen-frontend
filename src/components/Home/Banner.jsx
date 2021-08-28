import React from 'react';
import PropTypes from 'prop-types';

const Banner = ({ appName, token }) => {
  if (token) {
    return null;
  }
  return (
    <div className="banner">
      <div className="container">
        <h1 className="logo-font">
          {appName.toLowerCase()}
        </h1>
        <p>Your community project starter pack.</p>
      </div>
    </div>
  );
};

Banner.propTypes = {
  appName: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

export default Banner;
