import React from 'react';
import propTypes from 'prop-types';

import { withTracker } from 'meteor/react-meteor-data';

import { Notes } from '../api/notes';
import { Session } from 'meteor/session';


export class Editor extends React.Component {
  constructor() {
    super();
    this.state = { someKey: 'Editor is here' };
  }

  render() {
    if (this.props.note) {
      return (<p>We got the note!</p>);
    } else if (this.props.selectedNoteId) {
      return (<p>Note note found</p>);
    } else {
      return (<p>Pick or create a note to get started.</p>);
    }
  }

  componentDidMount() {
    this.setState({ someKey: 'otherValue' });
  }
}

Editor.propTypes = {
  note: propTypes.object,
  selectedNoteId: propTypes.string,
};


export default withTracker(props => {
  const selectedNoteId = Session.get('selectedNoteId');
  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId)
  };
})(Editor);