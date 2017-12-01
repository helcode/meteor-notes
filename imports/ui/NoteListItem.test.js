import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { NoteListItem } from './NoteListItem';
import { testNotes } from '../fixtures/fixtures';

configure({ adapter: new Adapter() });

if (Meteor.isClient) {
  describe('NoteListItem', () => {
    let dummySession;

    beforeEach(() => {
      dummySession = {
        set: expect.createSpy()
      };
    });
    //* above Session set as spy will allow us to create a spy before each it.expect combo and inject it into component under test.
    //* notes that we have defined a 'set' property to mock the called function (props.Session.set).

    it('should set default title if not title set', () => {
      //* Test NOT passing the title into the component. (default title)
      const wrapper = mount(<NoteListItem note={testNotes[1]} Session={dummySession} />);

      expect(wrapper.find('h5').text()).toBe('Untitled note');
    });

    it('should render title and timestamp', () => {
      const wrapper = mount(<NoteListItem note={testNotes[0]} Session={dummySession} />);

      expect(wrapper.find('h5').text()).toBe(testNotes[0].title);
      expect(wrapper.find('p').text()).toBe(' 2017-02-03 ');
    });

    it('should call set on click', () => {
      const wrapper = mount(<NoteListItem note={testNotes[0]} Session={dummySession} />);
      wrapper.find('div').simulate('click');

      expect(dummySession.set).toHaveBeenCalledWith('selectedNoteId', testNotes[0]._id);
    });

  });
}