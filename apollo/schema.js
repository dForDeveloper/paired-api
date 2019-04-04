const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: String
    name: String
    module: Int
    program: String
    skills: [String]
    interests: [String]
    pronouns: String
    slack: String
    email: String
    image: String
  }

  input UserInput {
    name: String!
    module: Int!
    program: String!
    skills: [String]
    interests: [String]
    pronouns: String
    slack: String
    email: String
    image: String
  }

  type Pairing {
    pairerID: ID
    paireeID: ID
    date: String!
    time: String!
  }

  input PairingInput {
    pairerID: ID!
    paireeID: ID
    date: String!
    time: String!
  }

  type Query {
    getUser(name: String): User
    getUsers: [User]
    getPairings: [Pairing]
    getAvailablePairings: [Pairing]
  }

  type Mutation {
    createUser(name: String, module: Int, program: String): User!
    createPairing(pairerID: ID, date: String, time: String): Pairing!
  }
`;

module.exports = typeDefs;
