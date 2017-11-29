import { Meteor } from 'meteor/meteor';
import React from 'react';

import expect from 'expect';

import { configure } from 'enzyme';
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });

import { Signup } from './Signup';
//notice we are importing the "raw" named-export Signup not the containerized one default one.

if (Meteor.isClient) {
  describe('Signup', () => {
    it('Should error messages', () => {
      const error = 'This is not working';
      const wrapper = mount(<Signup createUser={() => { }} />);

      wrapper.setState({ error: error });

      expect(wrapper.find('p').text()).toBe(error);

      wrapper.setState({ error: '' });

      expect(wrapper.find('p').length).toBe(0);
    });

    it('should call createUser with the form data', () => {
      const email = 'helcode@example.com';
      const password = 'password123';
      const spy = expect.createSpy();
      const wrapper = mount(<Signup createUser={spy} />);

      wrapper.find('input[name="email"]').instance().value = email;
      wrapper.find('input[name="password"]').instance().value = password;
      wrapper.find('form').simulate('submit');

      expect(spy.calls[0].arguments[0]).toEqual({ email, password });
    });

    it('should set error for short password', () => {
      const email = 'helcode@example.com';
      const password = 'bad';
      const spy = expect.createSpy();
      const wrapper = mount(<Signup createUser={spy} />);

      wrapper.find('input[name="email"]').instance().value = email;
      wrapper.find('input[name="password"]').instance().value = password;
      wrapper.find('form').simulate('submit');

      expect(wrapper.state('error').length).toBeGreaterThan(0);
    });

    it('Should set createUser callback errors', () => {
      const password = 'password123';
      const reason = 'This is why it failed';
      const spy = expect.createSpy();
      const wrapper = mount(<Signup createUser={spy} />);

      wrapper.find('input[name="password"]').instance().value = password;
      wrapper.find('form').simulate('submit');

      spy.calls[0].arguments[1]({reason}); 
      
      expect(wrapper.state('error')).toBe(reason);

      spy.calls[0].arguments[1]();

      expect(wrapper.state('error')).toBe('');
    });

  });
}