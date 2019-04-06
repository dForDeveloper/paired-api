const typeDefs = require('./typeDefs');
const seedDB = require('../db/seeds');
const mongoose = require('mongoose');
const { User, Pairing } = require('../db/schema');

const mongoURI = 'mongodb://localhost:27017/paired_test';

beforeAll(async () => {
  await mongoose.connect(mongoURI, { useNewUrlParser: true });
});

describe('typeDefs', () => {
  beforeEach(async () => {
    await seedDB(mongoURI);
  });

  describe('Apollo Schema', () => {
    it('users should have attributes', async () => {
      const firstUser = await User.findOne();
      expect(firstUser).toHaveProperty("name");
      expect(firstUser).toHaveProperty("module");
      expect(firstUser).toHaveProperty("program");
      expect(firstUser).toHaveProperty("skills");
      expect(firstUser).toHaveProperty("interests");
      expect(firstUser).toHaveProperty("pronouns");
      expect(firstUser).toHaveProperty("slack");
      expect(firstUser).toHaveProperty("email");
      expect(firstUser).toHaveProperty("image");
    });

    it('pairings should have attributes', async () => {
      const firstPairing = await Pairing.findOne();
      expect(firstPairing).toHaveProperty('pairer')
      expect(firstPairing).toHaveProperty('pairee')
      expect(firstPairing).toHaveProperty('date')
      expect(firstPairing).toHaveProperty('time')
    });
  });
});

afterAll(() => {
  mongoose.disconnect();
});
