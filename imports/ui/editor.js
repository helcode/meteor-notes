import React from 'react';
import propTypes from 'prop-types';

import { withTracker } from 'meteor/react-meteor-data';

import { Notes } from '../api/notes';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';


export class Editor extends React.Component {
  constructor() {
    super();
    this.state = { someKey: 'editor comp. is built' };
  }

  handleBodyChange(e) {
    this.props.call('notes.update', this.props.note._id, {
      body: e.target.value
    });
  }

  handleTitleChange(e) {
    this.props.call('notes.update', this.props.note._id, {
      title: e.target.value
    });
  }

  render() {
    if (this.props.note) {
      return (
        <div>
          <input value={this.props.note.title} placeholder="Note title here" onChange={this.handleTitleChange.bind(this)} />
          <textarea value={this.props.note.body} placeholder="Your note here" onChange={this.handleBodyChange.bind(this)} ></textarea>
          <button>Delete Note</button>
        </div>
      );

    } else {
      return (
        <p>
          {this.props.selectedNoteId ? 'Note note found.' : 'Pick or create a note to get started.'}
        </p>
      );
    }
  }

  componentDidMount() {
    this.setState({ someKey: 'editor did mount ;)' });
  }
}

Editor.propTypes = {
  note: propTypes.object,
  selectedNoteId: propTypes.string,
  call: propTypes.func,
};


export default withTracker(props => {
  const selectedNoteId = Session.get('selectedNoteId');
  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call
  };
})(Editor);