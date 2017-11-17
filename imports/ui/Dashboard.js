import React from 'react';
import PropTypes from 'prop-types';

import PrivateHeader from './PrivateHeader';

export default() => (
  <div>
    <PrivateHeader title="Dashboard"/>
    <div className="page-content">
      Dashboard Page content.
    </div>
  </div>
);
