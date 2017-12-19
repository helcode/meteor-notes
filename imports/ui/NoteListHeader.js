import React from 'react';
import propTypes from 'prop-types';

import { Meteor } from 'meteor/meteor';

import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

export const NoteListHeader = (props) => {
  return (
    <div className="item-list__header" >
      <button className="button" onClick={() => { 
        /** important note block
         * MONGODB .INSERT CALLBACK FUNCTION
         * below line was originally 
         *! props.meteorCall('notes.insert');
         * but as we would like to set 'selectedNoteId' Session value = the new created note
         * so it will get automatically selected in the app window,
         * We will have to insert a callback function as below
         *! props.meteorCall('notes.insert', () => {});
         * in that case the callback function () => {} will allow us to set the needed session value
         * we will need to pass arguments into call back function as below
         *! props.meteorCall('notes.insert', (err, res) => {});
         * where err: is error 
         * & res: is the response from Notes.insert function in Mongodb which should be the new note Id
         * hence, we should set the new selectedNoteId value as below
         *! props.Session.set('selectedNoteId', res);
        **/ 
        props.meteorCall('notes.insert', (err, res) => {
          if(res) {
            props.Session.set('selectedNoteId', res);
          }
        }); 

      }}>Create Note</button>
    </div>
  );
};


NoteListHeader.propTypes = {
  meteorCall: propTypes.func.isRequired, 
  Session: propTypes.object.isRequired
};

export default withTracker(props => {
  return {
    meteorCall: Meteor.call,
    Session
  };
})(NoteListHeader);