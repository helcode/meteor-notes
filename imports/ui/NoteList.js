import React from 'react';
import propTypes from 'prop-types';

import { Meteor } from 'meteor/meteor';
import { Notes } from '../api/notes';

import { withTracker } from 'meteor/react-meteor-data';
//* withTracker replaces createContainer was deprecated in react-meteor-data@0.2.13. Use withTracker instead.
//* https://github.com/meteor/react-packages/tree/devel/packages/react-meteor-data#usage

import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';
import { Session } from 'meteor/session';

export const NoteList = (props) => {
  return (
    <div className="item-list">
      <NoteListHeader />
      {props.notes.length === 0 ? <NoteListEmptyItem /> : undefined}
      {props.notes.map((oneNote) => {
        return (<NoteListItem key={oneNote._id} note={oneNote} />);
      })}

      NoteList {props.notes.length}
    </div>
  );
};


NoteList.propTypes = {
  notes: propTypes.array.isRequired
};

export default withTracker(props => {
  const selectedNoteId = Session.get('selectedNoteId');

  //? WHy the following line is wrong?
  //? notes: Notes.find({ $query: {}, $orderby:{updatedAt:1} }).fetch().map((anyNote) => {...}) 

  Meteor.subscribe('notes');
  return {
    notes: Notes.find({}, {
      sort: { updatedAt: -1 }
    })
      .fetch().map((anyNote) => {
        return {
          ...anyNote,
          selected: anyNote._id === selectedNoteId
        };
      })
  };
})(NoteList);

