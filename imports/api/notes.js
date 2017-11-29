import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

import SimpleSchemea from 'simpl-schema';
import moment from 'moment';
import { SimpleSchema } from 'simpl-schema/dist/SimpleSchema';

export const Notes = new Mongo.Collection('notes');

if (Meteor.isServer) {
  Meteor.publish('notes', function () {
    return Notes.find({ userId: this.userId });
  });
}

Meteor.methods(
  {
    'notes.insert'() {
      if (!this.userId) {
        throw new Meteor.Error('not-authorized');
      }
      return Notes.insert({
        title: '',
        body: '',
        userId: this.userId,
        updatedAt: moment().valueOf()
      });
    },

    'notes.remove'(_id) {
      if (!this.userId) {
        throw new Meteor.Error('not-authorized');
      }

      new SimpleSchemea({
        _id: {
          type: String,
          min: 1
        }
      }).validate({ _id });

      Notes.remove({ _id, userId: this.userId });
      // userId: this.userId will ensures that not any authenticated user can delete a note via Id, 
      // To delete a note(_id), you have to be authenticated and owner of that note.
    },

    'notes.update'(_id, updates) {
      if (!this.userId) {
        throw new Meteor.Error('not-authorized');
      }

      new SimpleSchema({
        _id: {
          type: String,
          min: 1
        },
        title: {
          type: String,
          optional: true
        },
        body: {
          type: String,
          optional: true
        }
      }).validate({
        _id,
        ...updates
        /* The spread operator '...' above will push everything received in updates into validation
        under SimpleSchema, this way we can make sure that whatever updates received from users will
        be restricted to _id, title & body and nothing else added to the database.
        */
      });

      Notes.update({
        _id,
        userId: this.userId
      }, {
        $set: {
          updatedAt: moment().valueOf(),
          ...updates
        }
      });
    }
  });