import { Meteor } from 'meteor/meteor';
import React from 'react';

import expect from 'expect';

import { configure } from 'enzyme';
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });

import {PrivateHeader} from './PrivateHeader';
//* notice we are importing the "raw" PrivateHeader not the containerized one.

if (Meteor.isClient) {
  describe('PrivateHeader', () => {
    it('should set button text to logout', () => {
      const wrapper = mount(<PrivateHeader title="Test Title" handleLogout={() => { }} />);
      const buttonText = wrapper.find('button').text();

      expect(buttonText).toBe('Logout');
    });

    it('should use title prop as h1 text', () => {
      const testTitle = 'Test title here';
      const wrapper = mount(<PrivateHeader title={testTitle} handleLogout={() => { }}/>);
      const actualTitle = wrapper.find('h1').text();

      expect(actualTitle).toBe(testTitle);
    });

    it('should call handleLogout on click', () => {
      const spy = expect.createSpy();
      const wrapper = mount(<PrivateHeader title="Test Title" handleLogout={spy} />);
      wrapper.find('button').simulate('click');

      expect(spy).toHaveBeenCalledWith();
    });
  });
}