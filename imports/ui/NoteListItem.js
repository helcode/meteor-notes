import React from 'react';
import propTypes from 'prop-types';

import { withTracker } from 'meteor/react-meteor-data';

import moment from 'moment';
import { Session } from 'meteor/session';

export const NoteListItem = (props) => {
  return (
    <div onClick={() => { props.Session.set('selectedNoteId', props.note._id); }} >
      <h5>{props.note.title || 'Untitled note'}</h5>
      {props.note.selected ? 'selected' : undefined}
      <p> {moment(props.note.updatedAt).format('YYYY-MM-DD')} </p>
    </div>
  );
};

NoteListItem.propTypes = {
  note: propTypes.object.isRequired,
  Session: propTypes.object.isRequired
};

export default withTracker(props => {
  return { Session };
})(NoteListItem);