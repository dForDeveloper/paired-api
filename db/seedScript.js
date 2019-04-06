const mongoose = require('mongoose');
const seedDB = require('./seeds');
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/paired';

(async () => {
  await seedDB(mongoURI);
  mongoose.disconnect();
})();
