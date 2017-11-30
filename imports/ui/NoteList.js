import React from 'react';
import PropTypes from 'prop-types';

import { Meteor } from 'meteor/meteor';
import { Notes } from '../api/notes';

import { withTracker } from 'meteor/react-meteor-data';
//! withTracker replaces createContainer was deprecated in react-meteor-data@0.2.13. Use withTracker instead.
//! https://github.com/meteor/react-packages/tree/devel/packages/react-meteor-data#usage

import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';

export const NoteList = (props) => {

  return (
    <div>
      <NoteListHeader />
      {props.notes.length === 0 ? <NoteListEmptyItem /> : undefined}
      {props.notes.map((oneNote) => {
        return (<NoteListItem key={oneNote._id} note={oneNote} />);
      })}

      NoteList {props.notes.length}
    </div>
  );
};


NoteList.PropTypes = {
  notes: PropTypes.array.isRequired
};

export default withTracker(props => {
  Meteor.subscribe('notes');
  return {
    notes: Notes.find().fetch()
  };
})(NoteList);