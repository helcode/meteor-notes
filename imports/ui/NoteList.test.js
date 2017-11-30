import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });

import { NoteList } from './NoteList';

const testNotes = [
  {
    _id: 'noteId1',
    title: 'Test title',
    body: '',
    updatedAt: 0,
    userId: 'userId1'
  },{
    _id: 'noteId2',
    title: 'Test title 2',
    body: '',
    updatedAt: 0,
    userId: 'userId2'
  }
];

if (Meteor.isClient) {
  describe('NoteList', () => {
    it('should render NoteListItem for each note', () => {
      const wrapper = mount(<NoteList notes ={testNotes}/>);

      expect(wrapper.find('NoteListItem').length).toBe(2);
      expect(wrapper.find('NoteListEmptyItem').length).toBe(0);
    });

    it('should render NoteListEmptyItem if zero notes', () => {
      const wrapper = mount(<NoteList notes={[]} />);

      expect(wrapper.find('NoteListItem').length).toBe(0);
      expect(wrapper.find('NoteListEmptyItem').length).toBe(1);
    });
  });
};