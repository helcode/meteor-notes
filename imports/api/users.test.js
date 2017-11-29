import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import { validateNewUser } from './users';

if (Meteor.isServer) {
  describe('users', () => {
    it('it should allow valid email address', () => {
      const testUser = {
        emails: [
          {
            address: 'test@example.com'
          }
        ]
      };
      const res = validateNewUser(testUser);
      expect(res).toBe(true);
    });

    it('should reject an invalid email address', () => {
      expect(() => {
        const testUser = {
          emails: [
            {
              address: 'testexample.com'
            }
          ]
        };
        validateNewUser(testUser);
      }).toThrow();
    });
  });
}

// const add = ( a, b ) => a + b; 
// describe('Math', () => {   
// it('should add two numbers', () => { 
//    const res = add(11, 9);     
//    expect(res).toBe(21); });
// });