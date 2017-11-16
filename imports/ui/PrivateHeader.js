import React from 'react';
import PropTypes from 'prop-types';

import { Accounts } from 'meteor/accounts-base';


const PrivateHeader = ( props ) => {
  return (
    <div className="header">
      <div className="header__content">
        <h1 className="header__title">{props.title}</h1>
        <button className="button button--link-text" onClick={() => Accounts.logout()}>Logout</button>
        {/* We can also use a function inside Private header and reference it in onClick instead of ES6 arrow function */}
      </div>
    </div>
  );
};

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired
};

export default PrivateHeader;