import React from 'react';
import PropTypes from 'prop-types';

import {Link} from 'react-router';
import {Meteor} from 'meteor/meteor';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: this.props.error || ''
    };
  }

  onSubmit(e) {
    e.preventDefault(); // To prevent browser default action of refresh on submit

    let email = this
      .refs
      .emailRef
      .value
      .trim();
    let password = this
      .refs
      .passwordRef
      .value
      .trim();

    Meteor.loginWithPassword({
      email
    }, password, (err) => {
      if (err) {
        this.setState({error: 'Unable to login. Check email and password'});
      } else {
        this.setState({error: ''});
      }
    });
  }

  render() {
    // noValidate option at <form> tag is to disable browser builtin validation as
    // we will use server side vlaidation service through simpl-schema
    return (
      <div className="boxed-view">
        <div className='boxed-view__box'>
          <h1>Login</h1>

          {this.state.error
            ? <p>{this.state.error}</p>
            : undefined}

          <form
            onSubmit={this
            .onSubmit
            .bind(this)}
            noValidate
            className="boxed-view__form">
            <input type="email" ref='emailRef' name="email" placeholder="Email"></input>
            <input type="password" ref='passwordRef' name="password" placeholder="Password"></input>
            <button className="button">Login</button>
          </form>

          <Link to="/signup">Need an account?</Link>
        </div>
      </div>
    );
  }
}
