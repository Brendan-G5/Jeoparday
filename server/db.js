const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Jeoparday', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false
});

const db = mongoose.connection;


db.on('error', console.error.bind(console, 'connection error:')); // eslint-disable-line no-console
db.once('open', function () {
  console.log('Connected with mongoose!');  // eslint-disable-line no-console
});

module.exports = mongoose;
