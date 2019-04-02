const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { User, Pairing, Date } = require('./schema');

const connect = () => {
  return mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });
};

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('The server is running');
});

app.post('/testendpoint', (req, res) => {
  const { name, email } = req.body;
  connect()
    .then(async connection => {
      const user = await User.create({ name, email });
      res.status(201).json(user);
    })
    .catch(error => console.log(error));
});

module.exports = app;