var Recipe = require('./models');

  module.exports = function(app) {

      // server routes ===========================================================
      // handle things like api calls
      // authentication routes

      // sample api route
      app.get('/api/recipes', function(req, res) {
          // use mongoose to get all nerds in the database
        Recipe.find(function(err, recipes) {

            // if there is an error retrieving, send the error. 
                            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(recipes); // return all nerds in JSON format
        });
      });

      // route to handle creating goes here (app.post)
      // route to handle delete goes here (app.delete)

      // frontend routes =========================================================
      // route to handle all angular requests
      app.get('*', function(req, res) {
          res.sendfile('./client/index.html'); // load public/index.html file
      });

  };