const { User, Pairing } = require('../db/schema');

const resolvers = {
  Query: {
    getUser: async (_, { id }) => {
      return await User.findById(id).exec();
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
    },
    getUserPairings: async(_, { id }) => {
      return await Pairing.find({ $or: [{ pairer: id }, { pairee: id }]})
        .populate('pairer')
        .populate('pairee')
        .exec();
    }
  },
  Mutation: {
    createUser: async (_, { user }) => {
      return await User.create(user);
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
      const { id } = user;
      return await User.findByIdAndUpdate(id, user, { new: true }).exec();
    },
    updatePairing: async (_, { pairing }) => {
      const { id } = pairing;
      return await Pairing.findByIdAndUpdate(id, pairing, { new: true })
        .populate('pairer')
        .populate('pairee')
        .exec();
    },
    deleteUser: async (_, { id }) => {
      await Pairing.deleteMany({ $or: [{ pairer: id }, { pairee: id }]});
      return await User.findByIdAndDelete(id).exec();
    },
    deletePairing: async (_, { id }) => {
      return await Pairing.findByIdAndDelete(id)
        .populate('pairer')
        .populate('pairee')
        .exec();
    }
  }
}

module.exports = resolvers;
