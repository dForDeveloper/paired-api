const { Query, Mutation } = require('./resolvers');
const seedDB = require('../db/seeds');
const mongoose = require('mongoose');
const { User, Pairing } = require('../db/schema');

const mongoURI = 'mongodb://localhost:27017/paired_test';

beforeAll(async () => {
  await mongoose.connect(mongoURI, { useNewUrlParser: true });
});

describe('resolvers', () => {
  beforeEach(async () => {
    await seedDB(mongoURI, 'test');
  });

  describe('Query', () => {
    it('should get the user with the matching id from the db', async () => {
      const newUser = await User.create({
        name: 'John',
        module: 1,
        program: 'FE'
      });
      const result = await Query.getUser(null, { id: newUser._id });
      expect(result.name).toEqual('John');
    });

    it('should get the user with the matching firebase id', async () => {
      const newUser = await User.create({
        name: 'Bob',
        module: 2,
        program: 'BE',
        firebaseID: 'abc123'
      });
      const result = await Query.getUserByFirebaseID(
        null,
        { id: newUser.firebaseID }
      );
      expect(result.name).toEqual('Bob');
    });

    it('should get an array of all users from the database', async () => {
      const expected = 4;
      const result = await Query.getUsers();
      expect(result).toHaveLength(expected);
    });

    it('should get the pairing with the matching id', async () => {
      const newUser = await User.create({
        name: 'Bob',
        module: 2,
        program: 'BE',
        firebaseID: 'abc123'
      });
      const newPairing = await Pairing.create({
        pairer: newUser._id,
        date: 'Thu May 02 2019',
        time: 'afternoon',
        notes: 'This is a new pairing.'
      });
      const result = await Query.getPairing(null, { id: newPairing._id });
      expect(result.date).toEqual('Thu May 02 2019');
      expect(result.time).toEqual('afternoon');
      expect(result.notes).toEqual('This is a new pairing.');
    });

    it('should get an array of all pairings from the database', async () => {
      const expected = 6;
      const result = await Query.getPairings();
      expect(result).toHaveLength(expected);
    });

    it('should get an array of available pairings from the db', async () => {
      const expected = 2;
      const filter = { program: 'FE', module: 4, date: 'Wed Apr 03 2019' };
      const result = await Query.getAvailablePairings(null, { filter });
      expect(result).toHaveLength(expected);
    });

    it('should get pairings that match the user id from the db', async () => {
      const expected = 4;
      const id = await User.findOne({ name: 'Jeo D' }).exec();
      const result = await Query.getUserPairings(null, { id });
      expect(result).toHaveLength(expected);      
    });
  });

  describe('Mutation', () => {
    it('should add a user to the database', async () => {
      const usersBefore = await User.find({}).exec();
      const user = {
        name: 'John',
        module: 1,
        program: 'FE'
      };
      await Mutation.createUser(null, { user });
      const usersAfter = await User.find({}).exec();
      expect(usersAfter).toHaveLength(usersBefore.length + 1);
    });

    it('should add a pairing to the database', async () => {
      const user = {
        name: 'John',
        module: 1,
        program: 'FE'
      };
      const { id } = await Mutation.createUser(null, { user });
      const pairingsBefore = await Pairing.find({}).exec();
      const pairing = {
        pairer: id,
        date: 'Wed Apr 03 2019',
        time: 'morning'
      };
      await Mutation.createPairing(null, { pairing });
      const pairingsAfter = await Pairing.find({}).exec();
      expect(pairingsAfter).toHaveLength(pairingsBefore.length + 1);
    });

    it('should edit user info in database', async () => {
      const foundUser = await User.findOne({ name: 'Jeo D' }).exec();
      const updatedUser = {
        id: foundUser._id,
        slack: 'robby',
        module: 2
      };
      const result = await Mutation.updateUser(null, { user: updatedUser });
      expect(result.slack).toEqual('robby');
      expect(result.module).toEqual(2);
    });

    it('should edit pairing info in database', async () => {
      const pairer = await User.findOne({ name: 'Jeo D' }).exec();
      const pairee = await User.findOne({ name: 'Hill' }).exec();
      let foundPairing = await Pairing.findOne({ pairer: pairer._id }).exec();
      const updatedPairing = {
        id: foundPairing._id,
        pairee: pairee._id
      };
      expect(foundPairing.pairee).toEqual(null);
      foundPairing = await Mutation.updatePairing(null, { pairing: updatedPairing });
      expect(foundPairing.pairee._id).toEqual(pairee._id);
    });

    it('should remove a user from the database', async () => {
      const usersBefore = await User.find({}).exec();
      const { _id: id } = usersBefore[0]; 
      const pairingsBefore = await Query.getUserPairings(null, { id });
      await Mutation.deleteUser(null, { id });
      const usersAfter = await User.find({}).exec();
      const pairingsAfter = await Query.getUserPairings(null, { id });
      expect(pairingsBefore).not.toHaveLength(0);
      expect(pairingsAfter).toHaveLength(0);
      expect(usersAfter).toHaveLength(usersBefore.length - 1);
    });
    
    it('should remove a pairing from the database', async () => {
      const pairingsBefore = await Pairing.find({}).exec();
      const { _id: id } = pairingsBefore[0]; 
      await Mutation.deletePairing(null, { id });
      const pairingsAfter = await Pairing.find({}).exec();
      expect(pairingsAfter).toHaveLength(pairingsBefore.length - 1);
    });

    it('should remove multiple pairings from the database', async () => {
      const users = await User.find({}).exec();
      const { _id: id } = users[0]; 
      const pairingsBefore = await Pairing.find({ $and: [{ pairer: id }, { pairee: null }] }).exec();
      await Mutation.deletePairings(null, { id });
      const pairingsAfter = await Pairing.find({ $and: [{ pairer: id }, { pairee: null }] }).exec();
      expect(pairingsBefore.length).not.toEqual(0);
      expect(pairingsAfter.length).toEqual(0);
    });

    it('should add multiple pairings to the database', async () => {
      const user = {
        name: 'John',
        module: 1,
        program: 'FE'
      };
      const { id } = await Mutation.createUser(null, { user });
      const pairingsBefore = await Pairing.find({}).exec();
      const pairings = [
        {
          pairer: id,
          date: 'Tue Apr 09 2019',
          time: 'morning'
        },
        {
          pairer: id,
          date: 'Tue Apr 09 2019',
          time: 'lunch'
        }
      ];
      await Mutation.createPairings(null, { pairings });
      const pairingsAfter = await Pairing.find({}).exec();
      expect(pairingsAfter).toHaveLength(pairingsBefore.length + 2);
    });
  });
});

afterAll(() => {
  mongoose.disconnect();
});
