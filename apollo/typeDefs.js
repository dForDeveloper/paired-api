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

  input CreateUserInput {
    name: String!
    module: Int!
    program: String!
    skills: [String]
    interests: [String]
    pronouns: String
    slack: String
    email: String
    image: String
    firebaseID: ID!
  }

  input UpdateUserInput {
    id: ID!
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

  type Pairing {
    id: ID!
    pairer: User!
    pairee: User
    date: String!
    time: String!
    notes: String
  }

  type UnpopulatedPairing {
    id: ID!
    pairer: ID!
    pairee: ID
    date: String!
    time: String!
    notes: String
  }

  type DeletedPairing {
    id: ID
    pairer: ID
    pairee: ID
    date: String
    time: String
    notes: String
  }

  input CreatePairingInput {
    pairer: ID!
    pairee: ID
    date: String!
    time: String!
    notes: String
  }

  input UpdatePairingInput {
    id: ID!
    pairer: ID
    pairee: ID!
    date: String
    time: String
    notes: String
  }

  input PairingFilter {
    module: Int!
    program: String!
    date: String!
  }

  type Query {
    getUser(id: ID!): User
    getUserByFirebaseID(id: String!): User
    getUsers: [User]
    getPairings: [Pairing]
    getAvailablePairings(filter: PairingFilter): [Pairing]
    getUserPairings(id: ID): [Pairing]
  }

  type Mutation {
    createUser(user: CreateUserInput): User!
    createPairing(pairing: CreatePairingInput): Pairing!
    updateUser(user: UpdateUserInput): User
    updatePairing(pairing: UpdatePairingInput): Pairing
    deleteUser(id: ID!): User
    deletePairing(id: ID!): Pairing
    deletePairings(id: ID!): DeletedPairing
    createPairings(pairings: [CreatePairingInput]): [UnpopulatedPairing]
  }
`;

module.exports = typeDefs;
