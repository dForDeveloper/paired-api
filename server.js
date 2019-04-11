const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require('./apollo/typeDefs');
const resolvers = require('./apollo/resolvers');
const cors = require('cors');

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/paired'

mongoose.connect(mongoURI, { useNewUrlParser: true })
mongoose.connection.once('open', () => console.log('MongoDB connected.'));

const app = express();
app.use(cors());

app.set('PORT', process.env.PORT || 3001);

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen(app.get('PORT'), () => {
  console.log(`Server is running on port ${app.get('PORT')}.`); 
});