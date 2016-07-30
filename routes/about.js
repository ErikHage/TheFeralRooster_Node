/**
 * Standard libraries required for route
 */
var express = require('express');
var path = require('path');

module.exports = function (config) {
  var app = express();
  app.set('views', path.join(global.appRoot, 'views'));
  app.set('view engine', 'ejs');
  
  /* GET about me page. */
  app.get('/', function (req, res, next) {
    res.render('aboutMe', {
      title: 'About Me',
      subtitle: "Who I Am",
      jumbotronBackgroundImage: 'circuit.jpg'
    });
  });
  
  
  return app;
};