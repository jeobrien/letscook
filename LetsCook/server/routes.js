var Recipe = require('./models');

  module.exports = function(app) {

      // server routes ===========================================================
      // handle things like api calls
      // authentication routes

      // sample api route
    app.get('/api/plans', function(req, res) {
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
    app.post('/api/plans', function(req, res) {
        // use mongoose to get all recipes in the database
      var recipe_data = {
        title: req,
        sourceUrl: 'dummy.com',
        calories: 500
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
    app.get('*', function(req, res) {
        res.sendfile('./client/index.html'); // load public/index.html file
    });

  };