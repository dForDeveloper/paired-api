const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const expressGraphQL = require('express-graphql');
const schema = require('./schema');

const connect = () => {
  return mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });
};

const app = express();

app.use(cors());
app.use(express.json());

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

module.exports = app;