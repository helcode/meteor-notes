import React from 'react';
import propTypes from 'prop-types';

import {Link} from 'react-router';

export default() => (
  <div className="boxed-view">
    <div className="boxed-view__box">
      <h1>404 - Page Not Found</h1>
      <p>We're unable to find that page.</p>
      <Link to="/" className="button button--link">HEAD HOME</Link>
    </div>
  </div>
);
