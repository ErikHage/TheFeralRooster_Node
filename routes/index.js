module.exports = function(config) {

  var express = require('express');
  var app = express();

  app.get('/*', indexGet(config));
  app.post('/*', indexPost(config));

  return app;
};

var fs = require('fs');
var hobbyBackground = 'beer_back.jpg';

function indexGet(config) {
  var express = require('express');
  var app = express();

  app.get('/', function(req, res, next) {
    var sortedEntries = config.newsEntries.entries;

    sortedEntries.sort(function (a, b) {
      if (a.date.year != b.date.year) {
        return b.date.year - a.date.year;
      } else if (a.date.month != b.date.month) {
        return b.date.month - a.date.month;
      }
      return b.date.day - a.date.day;
    });

    res.render('index', {
      title: 'The Feral Rooster',
      subtitle: 'Personal domain of Erik B Hage',
      jumbotronBackgroundImage: 'sunlight_forest.jpg',
      entries: sortedEntries
    });

    return app;
  });
}


function indexPost(config) {
  var express = require('express');
  var app = express();



  return app;
}

///* GET home page. */
//router.get('/', function(req, res, next) {
//
//  var sortedEntries = newsEntries.entries;
//
//  sortedEntries.sort(function(a,b) {
//    if(a.date.year != b.date.year) {
//      return b.date.year - a.date.year;
//    } else if(a.date.month != b.date.month) {
//      return b.date.month - a.date.month;
//    }
//    return b.date.day - a.date.day;
//  });
//
//  res.render('index', {
//    title: 'The Feral Rooster',
//    subtitle: 'Personal domain of Erik B Hage',
//    jumbotronBackgroundImage: 'sunlight_forest.jpg',
//    entries: sortedEntries
//  });
//});
//
///* GET about me page. */
//router.get('/about', function(req, res, next) {
//  res.render('aboutMe', {
//    title: 'About Me',
//    subtitle: "Who I Am",
//    jumbotronBackgroundImage: 'circuit.jpg'
//  });
//});
//
///* GET skills page. */
//router.get('/skills', function(req, res, next) {
//
//  var now = new Date();
//  if( skills == null || now.setMinutes(now.getMinutes()-30) > lastUpdatedJsonTime)
//    updateJson();
//
//  res.render('skills', {
//    title: 'Skills',
//    subtitle: 'What I Know',
//    jumbotronBackgroundImage: 'maxresdefault.jpg',
//    skills: skills.skills
//  });
//});
//
///* GET projects page. */
//router.get('/projects', function(req, res, next) {
//
//  var now = new Date();
//  if( projects == null || now.setMinutes(now.getMinutes()-30) > lastUpdatedJsonTime)
//    updateJson();
//
//  res.render('projects', {
//    title: 'Projects',
//    subtitle: "What I've Done",
//    jumbotronBackgroundImage: 'java_angle.png',
//    projects: projects.projects
//  });
//});
//
///* GET hobbies page. */
//router.get('/hobbies', function(req, res, next) {
//
//  fs.readdir('./public/images/hobbies_bgr', function(err, items) {
//    var index = Math.floor(Math.random()* items.length);
//    hobbyBackground = items[index];
//  });
//
//  var now = new Date();
//  if( hobbyPics == null || now.setMinutes(now.getMinutes()-30) > lastUpdatedJsonTime)
//    updateJson();
//
//  res.render('hobbies', {
//    title: 'Hobbies',
//    subtitle: "What I Like to Do",
//    jumbotronBackgroundImage: '/hobbies_bgr/' + hobbyBackground,
//    brewPics: hobbyPics.brewPics,
//    cookingPics: hobbyPics.cookingPics,
//    racePics: hobbyPics.racePics
//  });
//});
//
//module.exports = router;
