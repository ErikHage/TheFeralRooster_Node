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
    if (config.projects == null || now.setMinutes(now.getMinutes() - config.refreshInterval) > config.lastUpdatedJsonTime) {
      config.lastUpdatedJsonTime = new Date();
      config.refreshFiles();
    }
    
    res.render('projects', {
      title: 'Projects',
      subtitle: "What I've Done",
      jumbotronBackgroundImage: 'java_angle.png',
      projects: config.projects.projects
    });
  });
  
  
  return app;
};