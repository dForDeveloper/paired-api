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

const pairings = [
  new Pairing({
    timeslot: 'morning',
    role: 'mentor'
  }),
  new Pairing({
    timeslot: 'afternoon',
    role: 'mentee'
  })
];

Promise.all(users.map(user => {
  return user.save()
}))
.then(() => mongoose.disconnect())
.catch((error) => console.log(error));

Promise.all(dates.map(date => {
  return date.save()
}))
.then(() => mongoose.disconnect())
.catch((error) => console.log(error));

Promise.all(pairings.map(paring => {
  return paring.save()
}))
.then(() => mongoose.disconnect())
.catch((error) => console.log(error));
