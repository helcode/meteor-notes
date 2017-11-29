import React from 'react';
import PropTypes from 'prop-types';

import { Accounts } from 'meteor/accounts-base';
import { Link } from 'react-router';

import { createContainer } from 'meteor/react-meteor-data';
// Warning: createContainer was deprecated in react-meteor-data@0.2.13. Use withTracker instead.
// https://github.com/meteor/react-packages/tree/devel/packages/react-meteor-data#usage

export class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: this.props.error || '' };
  }

  onSubmit(e) {
    e.preventDefault(); // To prevent browser default action of refresh on submit

    let email = this.refs.emailRef.value.trim();
    let password = this.refs.passwordRef.value.trim();

    if (password.length < 6) {
      return this.setState({ error: 'Password must be more than 5 characters long' });
    }

    this.props.createUser({ email, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '' });
      }
    });
  }

  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Join</h1>

          {this.state.error ? <p>{this.state.error}</p> : undefined}

          <form
            onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
            <input type="email" ref='emailRef' name="email" placeholder="Email"></input>
            <input type="password" ref='passwordRef' name="password" placeholder="Password"></input>
            <button className="button">Create Account</button>
          </form>

          <Link to="/">Already have an account?</Link>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  createUser: PropTypes.func.isRequired
};

export default createContainer (() => {
  return {
    createUser: Accounts.createUser
  };
}, Signup);