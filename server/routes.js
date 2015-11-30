var Recipe = require('./models');
var request = require('request-promise');
var key = process.env.MASHAPE_API_KEY || require('../keys');
var mongoose = require('mongoose');

  module.exports = function(app) {

    // server routes ===========================================================
    app.get('/recipes', function (req, res) {
      var options = {
        uri: 'https://webknox-recipes.p.mashape.com/recipes/search',
        qs: {
          cuisine: req.query.cuisine,
          diet: req.query.diet,
          excludeIngredients: req.query.exclude,
          intolerances: req.query.intolerances,
          number: 5,
          offset: 0,
          query: req.query.query,
          type: req.query.type
        },
        headers: {
          'X-Mashape-Key': key,
          Accept: 'application/json'
        },
        json: true
      };
      request(options)
      .then(function (result) {
        res.send(result);
      })
      .catch(function (err) {
        res.send(err);
      });
    });

    app.get('/question', function (req, res) {
      var options = {
        uri: 'https://webknox-recipes.p.mashape.com/recipes/quickAnswer',
        qs: {
          q: req.query.question
        },
        headers: {
          'X-Mashape-Key': key,
          Accept: 'application/json'
        },
        json: true
      };
      request(options)
      .then(function (result) {
        res.send(result);
      })
      .catch(function (err) {
        res.send(err);
      });
    });

    app.get('/searchplan', function (req, res) {
      var options = {
        uri: 'https://webknox-recipes.p.mashape.com/recipes/mealplans/generate',
        qs: {
          targetCalories: req.query.calories,
          timeFrame: 'day'
        },
        headers: {
          'X-Mashape-Key': key,
          Accept: 'application/json'
        },
        json: true
      };
      request(options)
      .then(function (result) {
        res.send(result);
      })
      .catch(function (err) {
        res.send(err);
      });
    });

    app.get('/recipecard', function (req, res) {
      var options = {
        uri: 'https://webknox-recipes.p.mashape.com/recipes/extract',
        qs: {
          forceExtraction: false,
          url: req.query.url
        },
        headers: {
          'X-Mashape-Key': key,
          Accept: 'application/json'
        },
        json: true
      };
      request(options)
      .then(function (result) {
        res.send(result);
      })
      .catch(function (err) {
        res.send(err);
      });
    });

    app.get('/api/plans', function (req, res) {
      Recipe.find(function(err, recipes) {
        if (err) {
          res.send(err);
        }
        res.json(recipes);
      });
    });

    app.post('/api/plans', function (req, res) {
      var recipe = new Recipe({
        plan: req.body
      });
      recipe.save(function (err, data) {
        if (err) {
          res.json(err);
        } else {
          res.json(data);
        }
      });
    });

  };