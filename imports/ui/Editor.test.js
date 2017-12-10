import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { Editor } from './Editor';
import { testNotes } from '../fixtures/fixtures';



configure({ adapter: new Adapter() });

if (Meteor.isClient) {
  describe('Editor', () => {
    let dummyBrowserHistory;
    let dummyCall;

    beforeEach(() => {
      dummyCall = expect.createSpy();
      dummyBrowserHistory = {
        push: expect.createSpy()
      };
    });

    it('should render pick note message', () => {
      const wrapper = mount(<Editor browserHistory={dummyBrowserHistory} call={dummyCall} />);
      
      expect(wrapper.find('p').text()).toBe('Pick or create a note to get started.');
    });

    it('should render not found message', () => {
      const wrapper = mount(<Editor browserHistory={dummyBrowserHistory} call={dummyCall} selectedNoteId={testNotes[0]._id} />);

      expect(wrapper.find('p').text()).toBe('Note note found.');
    });

    it('should remove note', () => {
      const wrapper = mount(<Editor browserHistory={dummyBrowserHistory} call={dummyCall} selectedNoteId={testNotes[0]._id} note={testNotes[0]} />);
      wrapper.find('button').simulate('click');

      expect(dummyCall).toHaveBeenCalledWith('notes.remove', testNotes[0]._id);
      //* remember, dummyBrowserHistory is just an object, .push is where the spy lives
      expect(dummyBrowserHistory.push).toHaveBeenCalledWith('/dashboard');
    });

    it('should update the note body on textarea change', () => {
      const wrapper = mount(<Editor browserHistory={dummyBrowserHistory} call={dummyCall} selectedNoteId={testNotes[0]._id} note={testNotes[0]} />);
      
      //* handleBodyChange(e) expects e.target.value to be equal to the new body
      //* as we will be passing e, hence we need to make sure change second argument is an object
      //* in that object, we will have to make sure that .target.value === newBody
      const newBody = 'THis is my new body text';
      wrapper.find('textarea').simulate('change',{
        target: {
          value: newBody
        }
      });

      expect(wrapper.state('body')).toBe(newBody);
      expect(dummyCall).toHaveBeenCalledWith('notes.update', testNotes[0]._id, {body: newBody});
    });

    it('should update the note title on input change', () => {
      const wrapper = mount(<Editor browserHistory={dummyBrowserHistory} call={dummyCall} selectedNoteId={testNotes[0]._id} note={testNotes[0]} />);
      const newTitle = 'New test title here';
      wrapper.find('input').simulate('change', {
        target: {
          value: newTitle
        }
      });

      expect(wrapper.state('title')).toBe(newTitle);
      expect(dummyCall).toHaveBeenCalledWith('notes.update', testNotes[0]._id, { title: newTitle });
    });

    it('should set state for new note', () => {
      const wrapper = mount(<Editor browserHistory={dummyBrowserHistory} call={dummyCall} />);
      wrapper.setProps({
        selectedNoteId: testNotes[0]._id,
        note: testNotes[0]
      });

      expect(wrapper.state('title')).toBe(testNotes[0].title);
      expect(wrapper.state('body')).toBe(testNotes[0].body);
    });

    it('should not set state if note prop not provided', () => {
      const wrapper = mount(<Editor browserHistory={dummyBrowserHistory} call={dummyCall} />);
      wrapper.setProps({
        selectedNoteId: testNotes[0]._id
      });

      expect(wrapper.state('title')).toBe('');
      expect(wrapper.state('body')).toBe('');
    });

  });
}