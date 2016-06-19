var express = require('express');
var fs = require('fs');

var router = express.Router();

var skills = require('../data/skills.json');
var projects = require('../data/projects.json');
var newsEntries = require('../data/news.json');
var hobbyPics = require('../data/hobbies.json');

var lastUpdatedJsonTime = new Date();
var hobbyBackground = 'beer_back.jpg';

function updateJson() {
  newsEntries = JSON.parse(fs.readFileSync('./data/news.json'));
  projects = JSON.parse(fs.readFileSync('./data/projects.json'));
  skills = JSON.parse(fs.readFileSync('./data/skills.json'));
}

/* GET home page. */
router.get('/', function(req, res, next) {

  var now = new Date();
  if( newsEntries == null || now.setMinutes(now.getMinutes()-30) > lastUpdatedJsonTime)
    updateJson();

  //if(newsEntries == null)
  //  newsEntries = JSON.parse(fs.readFileSync('./data/news.json'));

  //fs.readFile('./data/news.json', function(err, data) {
  //  newsEntries = JSON.parse(data);
  //});

  //sort entries

  var sortedEntries = newsEntries.entries;

  sortedEntries.sort(function(a,b) {
    if(a.date.year != b.date.year) {
      return b.date.year - a.date.year;
    } else if(a.date.month != b.date.month) {
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
});

/* GET about me page. */
router.get('/about', function(req, res, next) {
  res.render('aboutMe', {
    title: 'About Me',
    subtitle: "Who I Am",
    jumbotronBackgroundImage: 'circuit.jpg'
  });
});

/* GET skills page. */
router.get('/skills', function(req, res, next) {
  res.render('skills', {
    title: 'Skills',
    subtitle: 'What I Know',
    jumbotronBackgroundImage: 'maxresdefault.jpg',
    skills: skills.skills
  });
});

/* GET projects page. */
router.get('/projects', function(req, res, next) {
  res.render('projects', {
    title: 'Projects',
    subtitle: "What I've Done",
    jumbotronBackgroundImage: 'java_angle.png',
    projects: projects.projects
  });
});

/* GET hobbies page. */
router.get('/hobbies', function(req, res, next) {

  fs.readdir('./public/images/hobbies_bgr', function(err, items) {
    var index = Math.floor(Math.random()* items.length);
    hobbyBackground = items[index];
  });

  res.render('hobbies', {
    title: 'Hobbies',
    subtitle: "What I Like to Do",
    jumbotronBackgroundImage: '/hobbies_bgr/' + hobbyBackground,
    racePics: hobbyPics.hobbies.racePics
  });
});

module.exports = router;
