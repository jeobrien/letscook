var mongoose = require('mongoose');
var recipeSchema = require('./schemas');

module.exports = mongoose.model('Recipe', recipeSchema);