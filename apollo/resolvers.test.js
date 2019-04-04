const resolvers = require('./resolvers');
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
    it('should return a single user with the matching name', async () => {
      const expected = await User.create({
        name: 'John',
        module: 1,
        program: 'FE'
      });
      const result = await resolvers.Query.getUser(null, { name: 'John' });
      expect(result._id).toEqual(expected._id);
    });

    it('should get an array of all users', async () => {
      const expected = 4;
      const result = await resolvers.Query.getUsers();
      expect(result).toHaveLength(expected);
    });

    it('should get an array of all pairings', async () => {
      const expected = 6;
      const result = await resolvers.Query.getPairings();
      expect(result).toHaveLength(6);
    });
  });

  describe('Mutation', () => {

  });
});

afterAll(() => {
  mongoose.disconnect();
});