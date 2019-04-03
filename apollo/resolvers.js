const { User, Pairing } = require('../db/schema');
const mongoose = require('mongoose');

const resolvers = {
  Query: {
    getUser: async (_, { name }) => {
      return await User.find({ name }).exec();
    },
    getUsers: async() => {
      const users = await User.find({}).exec();
      return users;
    }
  }
}

module.exports = resolvers;