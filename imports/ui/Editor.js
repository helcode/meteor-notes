import React from 'react';
import propTypes from 'prop-types';

import { withTracker } from 'meteor/react-meteor-data';

import { Notes } from '../api/notes';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';

//New Editor.js file again

export class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: ''
    };
  }

  handleBodyChange(e) {
    const body = e.target.value;
    this.setState({ body });
    this.props.call('notes.update', this.props.note._id, { body });
  }

  handleTitleChange(e) {
    const title = e.target.value;
    this.setState({ title });
    this.props.call('notes.update', this.props.note._id, { title });
  }

  handleRemoval() {
    this.props.call('notes.remove', this.props.note._id);
    this.props.browserHistory.push('/dashboard');
  }

  componentDidUpdate(prevProps, prevState) {
    const currentNoteId = this.props.note ? this.props.note._id : undefined;
    const prevNoteId = prevProps.note ? prevProps.note._id : undefined;

    if (currentNoteId && currentNoteId !== prevNoteId) {
      this.setState({
        title: this.props.note.title,
        body: this.props.note.body
      });
    }
  }

  render() {
    if (this.props.note) {
      return (
        <div className="editor">
          <input value={this.state.title} placeholder="Note title here" onChange={this.handleTitleChange.bind(this)} />
          <textarea value={this.state.body} placeholder="Your note here" onChange={this.handleBodyChange.bind(this)} ></textarea>
          <button onClick={this.handleRemoval.bind(this)} >Delete Note</button>
        </div>
      );

    } else {
      return (
        <div className="editor">
          <p>
            {this.props.selectedNoteId ? 'Note note found.' : 'Pick or create a note to get started.'}
          </p>
        </div>
      );
    }
  }


}

Editor.propTypes = {
  note: propTypes.object,
  selectedNoteId: propTypes.string,
  call: propTypes.func.isRequired,
  browserHistory: propTypes.object.isRequired
};


export default withTracker(props => {
  const selectedNoteId = Session.get('selectedNoteId');
  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call,
    browserHistory
  };
})(Editor);