import React from 'react';
import PropTypes from 'prop-types';

import { Accounts } from 'meteor/accounts-base';
import {createContainer} from 'meteor/react-meteor-data';
// Warning: createContainer was deprecated in react-meteor-data@0.2.13. Use withTracker instead.
// https://github.com/meteor/react-packages/tree/devel/packages/react-meteor-data#usage


export const PrivateHeader = props => (
  <div className="header">
    <div className="header__content">
      <h1 className="header__title">{props.title}</h1>
      <button className="button button--link-text" onClick={() => props.handleLogout()}>
        Logout
      </button>
      {/* We can also use a function inside Private header and reference it in onClick instead of ES6 arrow function */}
    </div>
  </div>
);

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired
};

// Above is a presentational component that don't know anything but handling props without knowing anything else.
// We took the above presentational component and transferred it into a containerized component through "createContainer"
// createContainer() is a function that has been made available via meteor/react-meteor-data.

export default createContainer(() => {
  return {
    handleLogout: () => {
      Accounts.logout();
    }

  };
}, PrivateHeader);