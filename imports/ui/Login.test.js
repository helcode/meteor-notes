import { Meteor } from 'meteor/meteor';
import React from 'react';

import expect from 'expect';

import { configure } from 'enzyme';
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });

import { Login } from './Login';
//notice we are importing the "raw" named-export Login not the containerized one default one.

if (Meteor.isClient) {
  describe('Login', () => {
    it('Should show error messages', () => {
      const error = 'This is not working';
      const wrapper = mount(<Login loginWithPassword={() => { }} />);
      
      wrapper.setState({ error: error });

      expect(wrapper.find('p').text()).toBe(error);

      wrapper.setState({error: ''});

      expect(wrapper.find('p').length).toBe(0);
    });

    it('should call loginWithPassword with the form data', () => {
      const email = 'helcode@example.com';
      const password = 'password123';
      const spy = expect.createSpy();
      const wrapper = mount (<Login loginWithPassword={spy}/>);

      //Notice use of .ref below to pick the right element through its ref
      //Notice the use of node.value below to set the value through standard HTMLInputElement methods
      //More about HTMLInputElement @ https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement
      //Note that this is already deprecated as react recommends to use callbacks instead of string refs.
      //There are recent open issue threads on the Enzyme repo related to this (enzyme issue #566)
      //wrapper.ref('emailRef').node.value = email;
      //wrapper.ref('passwordRef').node.value = password;

      //notice the change, node ==> instance() due to deprecation of use of private properties by enzyme.
      wrapper.find('input[name="email"]').instance().value = email;
      wrapper.find('input[name="password"]').instance().value = password;


      wrapper.find('form').simulate('submit');

      expect(spy.calls[0].arguments[0]).toEqual({email:email});
      expect(spy.calls[0].arguments[1]).toBe(password);
      //above we used toBe (instead of toEqual) because second argument is a variable not object
    });

    it('Should set loginWithPassword callback errors', () => {
      const spy = expect.createSpy();
      const wrapper = mount(<Login loginWithPassword={spy} />);

      wrapper.find('form').simulate('submit');
      
      spy.calls[0].arguments[2]({});
      //notice we are calling the spy with the third argument 
      //as empty object to trigger the error in Login component.
      
      expect(wrapper.state('error')).toNotBe('');

      spy.calls[0].arguments[2]();

      expect(wrapper.state('error')).toBe('');
    });

  });
}