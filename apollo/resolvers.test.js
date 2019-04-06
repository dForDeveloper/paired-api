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
    await seedDB(mongoURI);
  });

  describe('Query', () => {
    it('should get the user with the matching name from the db', async () => {
      const expected = await User.create({
        name: 'John',
        module: 1,
        program: 'FE'
      });
      const result = await Query.getUser(null, { name: 'John' });
      expect(result._id).toEqual(expected._id);
    });

    it('should get an array of all users from the database', async () => {
      const expected = 4;
      const result = await Query.getUsers();
      expect(result).toHaveLength(expected);
    });

    it('should get an array of all pairings from the database', async () => {
      const expected = 6;
      const result = await Query.getPairings();
      expect(result).toHaveLength(expected);
    });

    it('should get an array of available pairings from the db', async () => {
      const expected = 2;
      const filter = { program: "FE", module: 4, date: "Wed Apr 03 2019" };
      const result = await Query.getAvailablePairings(null, { filter });
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
      }
      await Mutation.createPairing(null, { pairing });
      const pairingsAfter = await Pairing.find({}).exec();
      expect(pairingsAfter).toHaveLength(pairingsBefore.length + 1);
    });
  });
});

afterAll(() => {
  mongoose.disconnect();
});