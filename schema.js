const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
} = require('graphql');
const mongoose = require('mongoose');

const connect = () => {
  return mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });
};

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    _id: { type: GraphQLString }, 
    name: { type: GraphQLString }, 
    pronouns: { type: GraphQLString }, 
    module: { type: GraphQLInt }, 
    program: { type: GraphQLString }, 
    // skills: { type: GraphQLList }, 
    // interests: { type: GraphQLList }, 
    slack: { type: GraphQLString }, 
    email: { type: GraphQLString }, 
    image: { type: GraphQLString }, 
    // pairings: { type: GraphQLList } 
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLString }
      },
      async resolve(parentValue, args) {
        const connection = await connect();
        const users = await connection.collection('users');
        return users;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});