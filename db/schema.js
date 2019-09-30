const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  module: {
    type: Number,
    required: true
  },
  program: {
    type: String,
    required: true
  },
  skills: [String],
  interests: [String],
  pronouns: String,
  slack: String,
  email: String,
  image: String,
  firebaseID: String
});

const pairingSchema = new mongoose.Schema({
  pairer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  pairee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  date: String,
  time: String,
  notes: String
});

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: String,
  lead: {
    type: String, 
    required: true
  },
  coLead: [String],
  category: { 
    type: String,
    required: true
  },
  attendees: [String], 
  agenda: String,
  date: String,
  time: [String]
});

module.exports = {
  User: mongoose.model('user', userSchema),
  Pairing: mongoose.model('pairing', pairingSchema),
  Group: mongoose.model('group', groupSchema)
};