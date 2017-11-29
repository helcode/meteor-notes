import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import '../imports/api/users'; // short hand to execute the users.js without exporting anything
import '../imports/api/notes';
import '../imports/startup/simple-schema-configuration.js';

Meteor.startup(() => {});
