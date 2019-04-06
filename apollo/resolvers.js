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
      return await Pairing.find({})
        .populate('pairer')
        .populate('pairee')
        .exec();
    },
    getAvailablePairings: async (_, { filter: { module, program, date } }) => {
      const availablePairings = await Pairing.find({ pairee: null, date })
        .populate('pairer')
        .exec();
      return availablePairings.filter(pairing => {
        const { pairer } = pairing;
        return pairer.module === module && pairer.program === program;
      });
    }
  },
  Mutation: {
    createUser: async (_, { user }) => {
      return await User.create(user)
    },
    createPairing: async (_, { pairing }) => {
      const newPairing = new Pairing(pairing);
      await newPairing.save();
      return await Pairing.findById(newPairing._id)
        .populate('pairer')
        .populate('pairee')
        .exec();
    },
    updateUser: async (_, { user }) => {
      return await User.findByIdAndUpdate(user._id, user, { new: true })
        .lean()
        .exec();
    },
    updatePairing: async (_, { pairing }) => {
      return await Pairing.findByIdAndUpdate(pairing._id, pairing, { new: true })
        .lean()
        .exec();
    }
  }
}

module.exports = resolvers;
