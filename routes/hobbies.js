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

  var hobbyBackground = 'beer_back.jpg';

  app.get('/', function (req, res, next) {
    //Should fix this so it doesn't need to default to something.

    fs.readdir(global.appRoot + '/public/images/hobbies_bgr', function (err, items) {
      var index = Math.floor(Math.random() * items.length);
      hobbyBackground = items[index];
    });

    config.Hobby.find({})
        .exec(function(err, hobbies) {
          if (err) {
            throw err;
          }
          console.log('DB output:' + hobbies);
          renderHobbies(req, res, hobbies);
        });
  });
  
  
  return app;
};

function renderHobbies(req, res, hobbies) {
  res.render('hobbies', {
    title: 'Hobbies',
    subtitle: "What I Like to Do",
    jumbotronBackgroundImage: '/hobbies_bgr/' + hobbyBackground,
    brewPics: config.hobbyPics.brewPics,
    cookingPics: config.hobbyPics.cookingPics,
    racePics: config.hobbyPics.racePics
  });
}