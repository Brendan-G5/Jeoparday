const mongoose = require ('../db');

const dailyModel = new mongoose.Schema({
  title: {type: String, required: true},
  clues: {type:Array, required: true},
  date: {type:Date, required: true},
});

module.exports = mongoose.model('questions', dailyModel);


