const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
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
    id: ID!
    pairer: User!
    pairee: User
    date: String!
    time: String!
  }

  input PairingInput {
    pairer: ID!
    pairee: ID
    date: String!
    time: String!
  }

  input PairingFilter {
    module: Int!
    program: String!
    date: String!
  }

  type Query {
    getUser(name: String): User
    getUsers: [User]
    getPairings: [Pairing]
    getAvailablePairings(filter: PairingFilter): [Pairing]
  }

  type Mutation {
    createUser(user: UserInput): User!
    createPairing(pairing: PairingInput): Pairing!
    updateUser(user: UserInput): User
    updatePairing(pairing: PairingInput): Pairing
  }
`;

module.exports = typeDefs;
