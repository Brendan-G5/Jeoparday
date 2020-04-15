const mongoose = require ('../db');

const dailyModel = new mongoose.Schema({
  title: {type:String, required: true},
  date: {type:Date, required: true},
  result: {type:Number, required: true},
});

module.exports = mongoose.model('questions', dailyModel);


