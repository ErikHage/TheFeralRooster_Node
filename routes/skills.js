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
    
    var now = new Date();
    if (config.skills == null || now.setMinutes(now.getMinutes() - config.refreshInterval) > config.lastUpdatedJsonTime) {
      config.lastUpdatedJsonTime = new Date();
      config.refreshFiles();
    }
    
    res.render('skills', {
      title: 'Skills',
      subtitle: 'What I Know',
      jumbotronBackgroundImage: 'maxresdefault.jpg',
      skills: config.skills.skills
    });
  });
  
  
  return app;
};