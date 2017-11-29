import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import NoteListItem from './NoteListItem';

configure({ adapter: new Adapter() });

if (Meteor.isClient) {
  describe('NoteListItem', () => {
    const noteOne = {
      _id: 'testNoteId1',
      title: 'My Title',
      body: 'My body for note',
      updatedAt: 1486137505429,
      userId: 'testUserId1'
    };

    it('should set default title if not title set', () => {
      //* Test NOT passing the title into the component. (default title)
      const wrapper = mount(<NoteListItem note={{ title: '' }} />);

      expect(wrapper.find('h5').text()).toBe('Untitled note');

    });

    it('should render title and timestamp', () => {
      const title = 'My title here';
      const updatedAt = 1486137505429;
      const wrapper = mount(<NoteListItem note={{ title, updatedAt }} />);

      expect(wrapper.find('h5').text()).toBe(title);

      expect(wrapper.find('p').text()).toBe(' 2017-02-03 ');

    });

  });
}