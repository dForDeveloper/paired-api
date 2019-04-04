const { User, Pairing } = require('../db/schema');

const resolvers = {
  Query: {
    getUser: async (_, { name }) => {
      console.log('name', name);
      const [match] = await User.find({ name }).exec();
      return match;
    },
    getUsers: async () => {
      return await User.find({}).exec();
    },
    getPairings: async () => {
      return await Pairing.find({}).exec();
    },
    getAvailablePairings: async () => {
      return await Pairing.find({ paireeID: null }).populate('user').exec();
    }
  },
  Mutation: {
    createUser: async (_, args) => {
      return await User.create(args)
    }
  }
}


module.exports = resolvers;
