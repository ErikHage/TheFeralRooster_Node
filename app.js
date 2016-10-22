/**
 * Standard Node JS Libraries required for Express
 */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

/**
 * Define the global appRoot so that you can find your files anywhere.
 */
global.appRoot = path.resolve(__dirname);

/**
 * Define mongoDB and Schemas
 */
var db = require('./db/db');
var News = require('./db/news');

var news = new News(  {
  "date" : {
    "day" : 29,
    "month" : 7,
    "year" : 2016 },
  "title" : "Races so far this year",
  "content" : "I just completed my 4th obstacle race of the year. Spartan Beast in April, Spartan Sprint in June, Spartan Super and Tough Mudder in July. I may sign up for another Tough Mudder in October, if I get enough team mates to join up. <br><img class='img-responsive img-rounded center-block' style='max-height: 200px' src='/images/hobbies/beast.jpg'>"
});

news.save();


/**
 * Custom routing for this application
 */
var index = require('./routes/index');
var about = require('./routes/about');
var hobbies = require('./routes/hobbies');
var projects = require('./routes/projects');
var skills = require('./routes/skills');


/**
 * Initialize your root Express event stack
 */
var app = express();

/**
 * Standard Express Stack "use" requirements.
 */
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Attempt to build a configuration object for your file management
 *  1) Initialize config
 *  2) Initialize file variables
 *  3) Declare function to refresh files
 *  4) Other stuff you may want to pass around
 */
//1
var config = {};
//2
config.newsEntries = require(global.appRoot + '/data/news.json');
config.projects = require(global.appRoot + '/data/projects.json');
config.skills = require(global.appRoot + '/data/skills.json');
config.hobbyPics = require(global.appRoot + '/data/hobbies.json');

function refreshConfig() {
  config.newsEntries = require(global.appRoot + '/data/news.json');
  config.projects = require(global.appRoot + '/data/projects.json');
  config.skills = require(global.appRoot + '/data/skills.json');
  config.hobbyPics = require(global.appRoot + '/data/hobbies.json');
}

config.refreshConfig = refreshConfig;



/**
 * Add your routes to the event stack after the basics have been processed.
 */
app.use('/', index(config));
app.use('/about', about(config));
app.use('/hobbies', hobbies(config));
app.use('/projects', projects(config));
app.use('/skills', skills(config));

/**
 * Don't need any of that weird shit that was here.
 * This error handler works for Get or Post, as it's an "all"
 * If you want to create a specific page for 400s or other errors,
 *   just write up a app.get & app.post and either * or be regex/specific.
 */
app.all('*', function (req, res, next) {
  res.status(400).send('Page not found.');
});

module.exports = app;
