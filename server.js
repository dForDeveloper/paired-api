const app = require('./app');

app.set('PORT', process.env.PORT || 3001);

app.listen(app.get('PORT'), () => {
  console.log(`Server running on ${app.get('PORT')}.`);
});
