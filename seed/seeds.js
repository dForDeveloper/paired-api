const { User, Pairing, Date } = require('../schema');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });

const users = [
  new User({
    name: 'Jeo',
    pronouns: 'he/him',
    module: 4,
    program: 'FE',
    skills: ['javascript', 'redux'],
    interests: ['everything'],
    slack: '@thisguy',
    email: 'anything@xyz.com',
    image: 'http://www.cheatsheet.com/wp-content/uploads/2016/01/Close-up-Of-A-Smiling-Man.jpg',
    pairings: []
  }),
  new User({
    name: 'Aaron',
    pronouns: 'he/him',
    module: 4,
    program: 'BE',
    skills: ['ruby', 'rails'],
    interests: ['coding'],
    slack: '@aaron',
    email: 'aaron@gmail.com',
    image: 'http://www.image.com/aaron.jpeg',
    pairings: []
  }),
  new User({
    name: 'Tiffany',
    pronouns: 'she/her',
    module: 4,
    program: 'FE',
    skills: ['javascript', 'redux'],
    interests: ['coding'],
    slack: '@tiffany',
    email: 'tiff@gmail.com',
    image: 'http://www.image.com/tiffany.jpeg',
    pairings: []
  }),
  new User({
    name: 'Hillary',
    pronouns: 'she/her',
    module: 4,
    program: 'FE',
    skills: ['react', 'redux'],
    interests: ['super market sweep'],
    slack: '@hillstew',
    email: 'hill@gmail.com',
    image: 'http://www.image.com/hill.jpeg',
    pairings: []
  })
];

const dates = [
  new Date({
    date: 'Tues 9th',
    timeslots: {
      morning: [],
      lunch: [],
      afternoon: []
      }
  }),
  new Date({
    date: 'Thurs 11th',
    timeslots: {
      morning: [],
      lunch: [],
      afternoon: []
      }
  })
];

const userIds = [];

Promise.all(users.map(async user => {
  const newUser = await user.save()
  userIds.push(newUser._id)
  return newUser;
}))
.then(() => {
  console.log(userIds);
  mongoose.disconnect()
})
.catch((error) => console.log(error));

const dateIds = [];

Promise.all(dates.map(async date => {
  const newDate = await date.save()
  dateIds.push(newDate._id)
  return newDate;
}))
.then(() => mongoose.disconnect())
.catch((error) => console.log(error));

const pairings = [
  new Pairing({
    pairedUserID: userIds[0],
    dateID: dateIds[0],
    timeslot: 'morning',
    role: 'pairer'

  }),
  new Pairing({
    pairedUserID: userIds[1],
    dateID: dateIds[1],
    timeslot: 'afternoon',
    role: 'pairee'
  })
];

// Promise.all(pairings.map(pairing => {
//   return paring.save()
// }))
// .then(() => mongoose.disconnect())
// .catch((error) => console.log(error));
