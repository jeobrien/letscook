var Recipe = require('./models');
var request = require('request-promise');
var key = require('../keys');

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
          timeFrame: req.query.time
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
        // use mongoose to get all recipes in the database
      Recipe.find(function(err, recipes) {

        // if there is an error retrieving, send the error. 
        // nothing after res.send(err) will execute
        if (err)
            res.send(err);

        res.json(recipes); // return all recipes in JSON format
      });
    });

    // route to handle creating goes here (app.post)
    app.post('/api/plans', function (req, res) {
        // use mongoose to get all recipes in the database
      var recipe_data = {
        title: req.body.title,
        sourceUrl: req.body.sourceUrl,
        sourceName: req.body.sourceName,
        aggregateLikes: req.body.aggregateLikes
      };
      var recipe = new Recipe(recipe_data);
      recipe.save(function (err, data) {
        if (err) {
          res.json(err);
        } else {
          res.json(data);
        }
      });
    });
    // route to handle delete goes here (app.delete)

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function (req, res) {
        res.sendfile('../client/index.html'); // load public/index.html file
    });

  };