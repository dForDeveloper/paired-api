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

  type Group {
    id: ID!
    name: String!
    location: String
    lead: String!
    coLead: [String]
    category: String!
    attendees: [String]
    agenda: String
    date: String
    time: [String]
  }

  input CreateGroupInput {
    name: String!
    location: String
    lead: String!
    coLead: [String]
    type: String!
    attendees: [String]
    agenda: String
    date: String
    time: [String]
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
    getPairing(id: ID!): Pairing
    getPairings: [Pairing]
    getAvailablePairings(filter: PairingFilter): [Pairing]
    getUserPairings(id: ID): [Pairing]
    getGroups: [Group]
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
    createGroup(group: CreateGroupInput): Group!
  }
`;

module.exports = typeDefs;
