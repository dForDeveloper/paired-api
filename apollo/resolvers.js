const { User, Pairing } = require('../db/schema');

const resolvers = {
  Query: {
    getUser: async (_, { name }) => {
      return await User.findOne({ name }).exec();
    },
    getUsers: async () => {
      return await User.find({}).exec();
    },
    getPairings: async () => {
      return await Pairing.find({}).exec();
    },
    getAvailablePairings: async () => {
      return await Pairing.find({ pairee: null }).populate('pairer').exec();
    }
  },
  Mutation: {
    createUser: async (_, { user }) => {
      return await User.create(user)
    },
    createPairing: async (_, { pairing }) => {
      return await Pairing.create(pairing)
    }
  }
}

module.exports = resolvers;
