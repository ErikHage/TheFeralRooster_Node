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
    
    config.db.Project.find({})
        .sort('+project')
        .exec(function(err, projects) {
          if(err) {
            throw err;
          }
          console.log('DB Output: ' + projects);

          renderProjects(req, res, projects);
        });
  });
  
  return app;
};

function renderProjects(req, res, projects) {

  res.render('projects', {
    title: 'Projects',
    subtitle: "What I've Done",
    jumbotronBackgroundImage: 'java_angle.png',
    projects: projects
  });

}