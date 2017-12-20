import React from 'react';
import propTypes from 'prop-types';
import { Session } from 'meteor/session';

import { withTracker } from 'meteor/react-meteor-data';

import { Accounts } from 'meteor/accounts-base';
import { createContainer } from 'meteor/react-meteor-data';

// Warning: createContainer was deprecated in react-meteor-data@0.2.13. Use withTracker instead.
// https://github.com/meteor/react-packages/tree/devel/packages/react-meteor-data#usage


export const PrivateHeader = props => {
  const navImageSrc = props.isNavOpen ? '/images/x.svg' : '/images/bars.svg';

  return (
    <div className="header">
      <div className="header__content">
        <img className="header__nav-toggle" onClick={props.handleNavToggle} src={navImageSrc} />
        <h1 className="header__title">{props.title}</h1>
        <button className="button button--link-text" onClick={() => props.handleLogout()}>
          Logout
        </button>
        {/* We can also use a function inside Private header and reference it in onClick instead of ES6 arrow function */}
      </div>
    </div>
  );
};

PrivateHeader.propTypes = {
  title: propTypes.string.isRequired,
  handleLogout: propTypes.func.isRequired,
  isNavOpen: propTypes.bool.isRequired,
  handleNavToggle: propTypes.func.isRequired
};

// Above is a presentational component that don't know anything but handling props without knowing anything else.
// We took the above presentational component and transferred it into a containerized component through "createContainer"
// createContainer() is a function that has been made available via meteor/react-meteor-data.

export default withTracker(props => {
  return { 
    handleLogout: () => Accounts.logout(),
    handleNavToggle: () => Session.set('isNavOpen', !Session.get('isNavOpen')),
    isNavOpen: Session.get('isNavOpen')
  };
})(PrivateHeader);

// export default createContainer(() => {
//   return {
// * check original return above.
//   };
// }, PrivateHeader);