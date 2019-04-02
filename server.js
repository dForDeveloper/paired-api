const app = require('./app');

app.set('PORT', process.env.PORT || 3001);

app.listen(app.get('PORT'), () => {
  console.log(`Server running on ${app.get('PORT')}.`);
});



var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
  title:  String,
  author: String,
  body:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
});