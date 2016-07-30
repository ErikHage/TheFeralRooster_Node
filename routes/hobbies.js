/**
 * Standard libraries required for route
 */
var express = require('express');
var path = require('path');
var fs = require('fs');

module.exports = function (config) {
  var app = express();
  app.set('views', path.join(global.appRoot, 'views'));
  app.set('view engine', 'ejs');
  
  app.get('/', function (req, res, next) {
    //Should fix this so it doesn't need to default to something.
    var hobbyBackground = 'beer_back.jpg';
    
    fs.readdir(global.appRoot + '/public/images/hobbies_bgr', function (err, items) {
      var index = Math.floor(Math.random() * items.length);
      hobbyBackground = items[index];
    });
    
    var now = new Date();
    if (config.skills == null || now.setMinutes(now.getMinutes() - config.refreshInterval) > config.lastUpdatedJsonTime) {
      config.lastUpdatedJsonTime = new Date();
      config.refreshFiles();
    }
    
    res.render('hobbies', {
      title: 'Hobbies',
      subtitle: "What I Like to Do",
      jumbotronBackgroundImage: '/hobbies_bgr/' + hobbyBackground,
      brewPics: config.hobbyPics.brewPics,
      cookingPics: config.hobbyPics.cookingPics,
      racePics: config.hobbyPics.racePics
    });
  });
  
  
  return app;
};