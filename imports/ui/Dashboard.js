import React from 'react';

//import PropTypes from 'prop-types';
//import { Accounts } from 'meteor/accounts-base';

import PrivateHeader from './PrivateHeader';
import NoteList from './NoteList';


export default function Dashboard() {
  return (
    <div>
      <PrivateHeader title="Dashboard" />
      <div className="page-content">
        <NoteList />
      </div>
    </div>
  );
}