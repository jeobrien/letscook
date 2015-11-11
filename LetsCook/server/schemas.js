var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  title: { type: String }, 
  sourceUrl: String,
  calories: Number
});