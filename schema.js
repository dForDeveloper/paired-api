const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const pairing = new mongoose.Schema({
  pairedUserID: ObjectId,
  dateID: ObjectId,
  timeslot: String,
  role: String
});

const user = new mongoose.Schema({
  name: String,
  pronouns: String,
  module: Number,
  program: String,
  skills: [String],
  interests: [String],
  slack: String,
  email: String,
  image: String,
  pairings: [pairing]
});

const date = new mongoose.Schema({
  date: String,
  timeslots: {
    morning: [ObjectId],
    lunch: [ObjectId],
    afternoon: [ObjectId]
  }
});

const User = mongoose.model('user', user);
const Pairing = mongoose.model('pairing', pairing);
const Date = mongoose.model('date', date);

module.exports = {
  User,
  Pairing,
  Date
}