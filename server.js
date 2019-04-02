const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.set('PORT', process.env.PORT || 3001);

app.listen(app.get('PORT'), () => {
  console.log(`Server running on ${app.get('PORT')}.`);
});

app.get('/', (req, res) => {
  res.send('The server is running');
});