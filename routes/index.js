var express = require('express');
var fs = require('fs');
var router = express.Router();

var newsEntries = null;

var lastUpdatedJsonTime = new Date();
var hobbyBackground = 'beer_back.jpg';

/* GET home page. */
router.get('/', function(req, res, next) {

  var now = new Date();
  if( newsEntries == null || now.setMinutes(now.getMinutes()-30) > lastUpdatedJsonTime)
    newsEntries = JSON.parse(fs.readFileSync('./data/news.json'));

  //if(newsEntries == null)
  //  newsEntries = JSON.parse(fs.readFileSync('./data/news.json'));

  //fs.readFile('./data/news.json', function(err, data) {
  //  newsEntries = JSON.parse(data);
  //});

  res.render('index', {
    title: 'The Feral Rooster',
    subtitle: 'Personal domain of Erik B Hage',
    jumbotronBackgroundImage: 'sunlight_forest.jpg',
    entries: newsEntries.entries
  });
});

/* GET skills page. */
router.get('/skills', function(req, res, next) {
  res.render('skills', {
    title: 'Skills',
    subtitle: 'My Many Talents',
    jumbotronBackgroundImage: 'maxresdefault.jpg'
  });
});

/* GET projects page. */
router.get('/projects', function(req, res, next) {
  res.render('projects', {
    title: 'Projects',
    subtitle: "What I've Done",
    jumbotronBackgroundImage: 'java_angle.png'
  });
});

/* GET hobbies page. */
router.get('/hobbies', function(req, res, next) {

  fs.readdir('./public/images/hobbies', function(err, items) {
    var index = Math.floor(Math.random()* items.length);
    hobbyBackground = items[index];
  });

  res.render('hobbies', {
    title: 'Hobbies',
    subtitle: "What I Like to Do",
    jumbotronBackgroundImage: '/hobbies/' + hobbyBackground
  });
});

module.exports = router;
