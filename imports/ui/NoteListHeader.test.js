import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });

//* import module under test
import { NoteListHeader } from './NoteListHeader';


if (Meteor.isClient) {
  describe('NoteListHeader', () => {
    it('should call meteorCall on click', () => {
      const spy = expect.createSpy();
      const wrapper = mount(<NoteListHeader meteorCall={spy} />);

      wrapper.find('button').simulate('click');

      expect(spy).toHaveBeenCalledWith('notes.insert');
    });
  });
}