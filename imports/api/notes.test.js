import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import { Notes } from './notes';

if (Meteor.isServer) {
  describe('notes', () => {
    const noteOne = {
      _id: 'testNoteId1',
      title: 'My Title',
      body: 'My body for note',
      updatedAt: 0,
      userId: 'testUserId1'
    };

    const noteTwo = {
      _id: 'testNoteId2',
      title: 'Things to buy',
      body: 'Couch',
      updatedAt: 0,
      userId: 'testUserId2'
    };

    beforeEach(() => {
      Notes.remove({}); //This is not going to affect production data, Mocha+Meteor in test-mode will setup a test db. Hence, the remove() will not affect the actual data.
      Notes.insert(noteOne);
      Notes.insert(noteTwo);
    });

    it('should insert new note', () => {
      const userId = 'testId';
      const _id = Meteor.server.method_handlers['notes.insert'].apply({ userId });

      expect(Notes.findOne({ _id, userId })).toBeTruthy();  //toExist
    });

    it('should not insert note if not authenticated', () => {
      expect(() => {
        Meteor.server.method_handlers['notes.insert']();
      }).toThrow();
    });

    it('should remove note', () => {
      Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId }, [noteOne._id]);
      /* NOTE: What happened in the above line?
      We used Meteor.server.method_handlers to call notes.remove
      We need to use .apply() method to pass the userId we should use
      Apply Methods receives two arguments (An Object + An Array)
      First argument is an object that sets the contexts. (in upper case using the userId)
      Second argument is an array that will be used to passed values to the called function-under-test
      Hence, we will pass 'testNoteId' (noteId not userId) into notes.remove(_id) "check notes.js method notes.remove()"
      */
      expect(Notes.findOne({ _id: noteOne.userId })).toNotExist(); //toBeUndefined
    });

    it('should not remove note if unauthenticated', () => {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({}, [noteOne._id]);
      }).toThrow();
    });

    it('should not remove note if invalid _id', () => {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId });
      }).toThrow();
    });

    it('should update note', () => {
      const title = 'This is an updated title';
      Meteor.server.method_handlers['notes.update'].apply({
        userId: noteOne.userId
      }, [
        noteOne._id,
        { title }
      ]);

      const note = Notes.findOne(noteOne._id);

      expect(note.updatedAt).toBeGreaterThan(0);
      expect(note).toMatch({ //toMatchObject
        title,
        body: noteOne.body
      });
    });

    it('should throw error if extra updates', () => {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({
          userId: noteOne.userId
        }, [
          noteOne._id,
          { NewObject: 'this should not be inserted' }
        ]);
      }).toThrow();
    });

    it('should not update note if user was not creator', () => {
      const title = 'This is an updated title';
      Meteor.server.method_handlers['notes.update'].apply({
        userId: 'randomTestUserId'
      }, [
        noteOne._id,
        { title }
      ]);

      const note = Notes.findOne(noteOne._id);

      expect(note).toMatch(noteOne); //toMatchObject
    });

    it('should not update note if unauthenticated', () => {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({}, [
          noteOne._id, 
          {title: 'title from unauthenticated user'}
        ]);
      }).toThrow();
    });

    it('should not update note if invalid _id', () => {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({ userId: noteOne.userId });
      }).toThrow();
    });

    it('should return only the user\'s notes', () => {
      const res = Meteor.server.publish_handlers.notes.apply({userId: noteOne.userId});
      //note that we use .Note directly without the ['   '] surrounding because the published method not have no special
      //characters in its name opposite to name of meteor methods we uses (ex. notes.remove, notes.update etc.)
      
      const notes = res.fetch();

      expect(notes.length).toBe(1);
      expect(notes[0]).toMatch(noteOne); //toMatchObject
      
    });

    it('should return zero notes for a user that has none', () => {
      const res = Meteor.server.publish_handlers.notes.apply({ userId: 'undefinedUserId' });

      const notes = res.fetch();

      expect(notes.length).toBe(0);
    });

  });
}