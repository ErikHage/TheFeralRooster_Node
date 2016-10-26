/**
 * Standard libraries required for route
 */
var express = require('express');
var path = require('path');

module.exports = function (config) {
  var app = express();
  app.set('views', path.join(global.appRoot, 'views'));
  app.set('view engine', 'ejs');
  
  app.get('/', function (req, res, next) {

    config.Skills.find({})
        .sort('+order')
        .exec(function(err, skills){
            res.render('skills', {
                title: 'Skills',
                subtitle: 'What I Know',
                jumbotronBackgroundImage: 'maxresdefault.jpg',
                skills: skills
            });
        });
  });
  
  
  return app;
};