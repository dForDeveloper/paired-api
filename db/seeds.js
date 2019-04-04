const { User, Pairing } = require('./schema');
const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/paired';

(async () => {
  await mongoose.connect(mongoURI, { useNewUrlParser: true });

  const users = await User.create(
    [
      {
        name: 'Jeo',
        pronouns: 'he/him',
        module: 4,
        program: 'FE',
        skills: ['react', 'node'],
        interests: ['magic the gathering'],
        slack: '@jeo',
        email: 'jeo@gmail.com',
        image: 'http://www.image.com/jeo.jpeg'
      },
      {
        name: 'Aaron',
        pronouns: 'he/him',
        module: 4,
        program: 'BE',
        skills: ['ruby', 'rails'],
        interests: ['art'],
        slack: '@aaron',
        email: 'aaron@gmail.com',
        image: 'http://www.image.com/aaron.jpeg'
      },
      {
        name: 'Tiffany',
        pronouns: 'she/her',
        module: 4,
        program: 'FE',
        skills: ['react', 'testing'],
        interests: ['baking'],
        slack: '@tiffany',
        email: 'tiff@gmail.com',
        image: 'http://www.image.com/tiffany.jpeg'
      },
      {
        name: 'Hillary',
        pronouns: 'she/her',
        module: 4,
        program: 'FE',
        skills: ['react', 'redux'],
        interests: ['super market sweep'],
        slack: '@hillstew',
        email: 'hill@gmail.com',
        image: 'http://www.image.com/hill.jpeg'
      }
    ]
  );

  await Pairing.create(
    [
      {
        pairer: users[0]._id,
        pairee: null,
        date: 'Wed Apr 03 2019',
        time: 'lunch'
      },
      {
        pairer: users[0]._id,
        pairee: null,
        date: 'Thu Apr 04 2019',
        time: 'lunch'
      },
      {
        pairer: users[2]._id,
        pairee: users[0]._id,
        date: 'Wed Apr 03 2019',
        time: 'afternoon'
      },
      {
        pairer: users[1]._id,
        pairee: users[0]._id,
        date: 'Thu Apr 04 2019',
        time: 'morning'
      },
      {
        pairer: users[3]._id,
        pairee: null,
        date: 'Wed Apr 03 2019',
        time: 'morning'
      },
      {
        pairer: users[3]._id,
        pairee: users[2]._id,
        date: 'Fri Apr 05 2019',
        time: 'morning'
      },
    ]
  );

  mongoose.disconnect();
})();