import React from 'react';

//import propTypes from 'prop-types';
//import { Accounts } from 'meteor/accounts-base';

import PrivateHeader from './PrivateHeader';
import NoteList from './NoteList';
import Editor from './editor';


export default function Dashboard() {
  return (
    <div>
      <PrivateHeader title="Dashboard" />
      <div className="page-content">
        <NoteList />
        <Editor />
      </div>
    </div>
  );
}