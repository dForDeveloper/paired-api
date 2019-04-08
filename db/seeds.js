const { User, Pairing } = require('./schema');
const mongoose = require('mongoose');

const seedDB = async (uri, env = 'dev') => {
  await mongoose.connect(uri, { useNewUrlParser: true });

  await mongoose.connection.db.dropDatabase();

  const users = await User.create(
    [
      {
        name: 'Jeo D',
        pronouns: 'he/him',
        module: 4,
        program: 'FE',
        skills: ['react', 'node'],
        interests: ['magic the gathering'],
        slack: '@jeo',
        email: 'jeo@gmail.com',
        image: 'https://avatars1.githubusercontent.com/u/41239540?v=4',
        firebaseID: 'huRo8RxBxYfphGaJHtdik4eXlbq2'
      },
      {
        name: 'J Aaron Brooks-Roberts',
        pronouns: 'he/him',
        module: 4,
        program: 'BE',
        skills: ['ruby', 'rails'],
        interests: ['art'],
        slack: '@aaron',
        email: 'aaron@gmail.com',
        image: 'https://avatars2.githubusercontent.com/u/40776966?v=4',
        firebaseID: 'y4zY0CTSIsUoZld8WY6MPPsZ04n1'
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
        image: 'https://avatars1.githubusercontent.com/u/40586291?v=4',
        firebaseID: '0iBiB9uqejS774Dppwr6HwpbJxX2'
      },
      {
        name: 'Hill',
        pronouns: 'she/her',
        module: 4,
        program: 'FE',
        skills: ['react', 'redux'],
        interests: ['super market sweep'],
        slack: '@hillstew',
        email: 'hill@gmail.com',
        image: 'https://avatars3.githubusercontent.com/u/36748280?v=4',
        firebaseID: 'ECpHPLOBqmOp1mcgygQBJfbJqbI2'
      }
    ]
  );

    const devPairings = [
    {
      pairer: users[3]._id,
      pairee: users[0]._id,
      date: 'Mon Apr 15 2019',
      time: 'morning'
    },
    {
      pairer: users[3]._id,
      pairee: null,
      date: 'Mon Apr 15 2019',
      time: 'lunch'
    },
    {
      pairer: users[1]._id,
      pairee: users[3]._id,
      date: 'Mon Apr 15 2019',
      time: 'afternoon'
    },
    {
      pairer: users[2]._id,
      pairee: users[1]._id,
      date: 'Mon Apr 15 2019',
      time: 'morning'
    },
    {
      pairer: users[1]._id,
      pairee: users[0]._id,
      date: 'Mon Apr 15 2019',
      time: 'lunch'
    },
    {
      pairer: users[2]._id,
      pairee: null,
      date: 'Mon Apr 15 2019',
      time: 'afternoon'
    },
    {
      pairer: users[3]._id,
      pairee: null,
      date: 'Tue Apr 16 2019',
      time: 'morning'
    },
    {
      pairer: users[0]._id,
      pairee: users[3]._id,
      date: 'Tue Apr 16 2019',
      time: 'lunch'
    },
    {
      pairer: users[3]._id,
      pairee: null,
      date: 'Tue Apr 16 2019',
      time: 'afternoon'
    },
    {
      pairer: users[1]._id,
      pairee: users[2]._id,
      date: 'Tue Apr 16 2019',
      time: 'morning'
    },
    {
      pairer: users[2]._id,
      pairee: null,
      date: 'Tue Apr 16 2019',
      time: 'lunch'
    },
    {
      pairer: users[0]._id,
      pairee: users[2]._id,
      date: 'Tue Apr 16 2019',
      time: 'afternoon'
    },
    {
      pairer: users[2]._id,
      pairee: users[3]._id,
      date: 'Wed Apr 17 2019',
      time: 'morning'
    },
    {
      pairer: users[3]._id,
      pairee: null,
      date: 'Wed Apr 17 2019',
      time: 'lunch'
    },
    {
      pairer: users[3]._id,
      pairee: users[0]._id,
      date: 'Wed Apr 17 2019',
      time: 'afternoon'
    },
    {
      pairer: users[1]._id,
      pairee: null,
      date: 'Wed Apr 17 2019',
      time: 'morning'
    },
    {
      pairer: users[0]._id,
      pairee: null,
      date: 'Wed Apr 17 2019',
      time: 'lunch'
    },
    {
      pairer: users[1]._id,
      pairee: users[2]._id,
      date: 'Wed Apr 17 2019',
      time: 'afternoon'
    },
    {
      pairer: users[1]._id,
      pairee: users[3]._id,
      date: 'Thu Apr 18 2019',
      time: 'morning'
    },
    {
      pairer: users[0]._id,
      pairee: users[3]._id,
      date: 'Thu Apr 18 2019',
      time: 'lunch'
    },
    {
      pairer: users[2]._id,
      pairee: users[3]._id,
      date: 'Thu Apr 18 2019',
      time: 'afternoon'
    },
    {
      pairer: users[2]._id,
      pairee: null,
      date: 'Thu Apr 18 2019',
      time: 'morning'
    },
    {
      pairer: users[2]._id,
      pairee: null,
      date: 'Thu Apr 18 2019',
      time: 'lunch'
    },
    {
      pairer: users[1]._id,
      pairee: null,
      date: 'Thu Apr 18 2019',
      time: 'afternoon'
    },
    {
      pairer: users[3]._id,
      pairee: users[1]._id,
      date: 'Fri Apr 19 2019',
      time: 'morning'
    },
    {
      pairer: users[3]._id,
      pairee: null,
      date: 'Fri Apr 19 2019',
      time: 'lunch'
    },
    {
      pairer: users[3]._id,
      pairee: null,
      date: 'Fri Apr 19 2019',
      time: 'afternoon'
    },
    {
      pairer: users[2]._id,
      pairee: users[0]._id,
      date: 'Fri Apr 19 2019',
      time: 'morning'
    },
    {
      pairer: users[1]._id,
      pairee: users[2]._id,
      date: 'Fri Apr 19 2019',
      time: 'lunch'
    },
    {
      pairer: users[0]._id,
      pairee: null,
      date: 'Fri Apr 19 2019',
      time: 'afternoon'
    }
  ];

  const testPairings = [
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
  ];

  if (env === 'test') {
    await Pairing.create(testPairings);
  } else if (env === 'dev') {
    await Pairing.create(devPairings);
  }
};

module.exports = seedDB;
