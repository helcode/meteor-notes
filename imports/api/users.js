import { Meteor } from 'meteor/meteor';
import SimpleSchemea from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';


Accounts.validateNewUser( ( user ) => {
  const email = user.emails[ 0 ].address;
  new SimpleSchemea( {
    email: {
      type: String,
      regEx: SimpleSchemea.RegEx.Email
    }
  } ).validate( { email: email } ); //we can use ES6 property shorhand and replace {email:email} with {email}

  return true;
} );
