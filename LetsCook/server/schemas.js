var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  title: String,
  sourceUrl: String,
  sourceName: String,
  aggregateLikes: Number
});