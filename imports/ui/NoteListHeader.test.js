import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });


//* import module under test
import { NoteListHeader } from './NoteListHeader';
import { testNotes } from '../fixtures/fixtures';


if (Meteor.isClient) {
  describe('NoteListHeader', () => {
    let dummyMeteorCall;
    let dummySession;

    beforeEach(() => {
      dummyMeteorCall = expect.createSpy();
      dummySession = {
        set: expect.createSpy()
      };
    });

    it('should call meteorCall on click', () => {
      const wrapper = mount(<NoteListHeader meteorCall={dummyMeteorCall} Session = {dummySession}/>);

      wrapper.find('button').simulate('click');
      dummyMeteorCall.calls[0].arguments[1](undefined, testNotes[0]._id);

      expect(dummyMeteorCall.calls[0].arguments[0]).toBe('notes.insert');
      expect(dummySession.set).toHaveBeenCalledWith('selectedNoteId',testNotes[0]._id);
    });

    it('should not set session for failed insert', () => {
      const wrapper = mount(<NoteListHeader meteorCall={dummyMeteorCall} Session={dummySession} />);

      wrapper.find('button').simulate('click');
      dummyMeteorCall.calls[0].arguments[1]('error', undefined);

      expect(dummyMeteorCall.calls[0].arguments[0]).toBe('notes.insert');
      expect(dummySession.set).toNotHaveBeenCalled();
    });
  });
}