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
 * Define env variables for dev
 */
require('dotenv').config({silent: true});

/**
 * Connect to mongoDB
 */
var db = require('./db/db');
var config = require('./config/config');

//var news = new config.db.News(  {
//    "title" : "2016 - Year in review",
//    "content" : "<p>So this was a crazy year, I'm thinking of investing in alcohol. I know at least 50% of this country and the UK will be getting heavily intoxicated often. My year was pretty great though. I completed 5 races, three spartans and two tough mudders, without injuring myself too badly. I developed a proof of concept rest service at work that will hopefully convince my team to start breaking up our monolith applications. I finished the brewery's website, which is scheduled to go live very soon (find it <a href='http://redwhiteandbrewbeercompany.com'>HERE</a> once it does).</p><p>I had a great Christmas break home with the family, I hope everyone else did as well! We saw Rogue One (great movie!), ate some hibachi, exchanged gifts (got a new desk chair!), and I cooked up a bunch of dishes for the annual family Christmas Eve party. My latest dish was a frozen orange cream pie, which went over very well.</p>"
//});
//
//news.save(function(err) {
//  if (err) throw err;
//  console.log('News saved');
//});

//var skills = new Skills({
//    "order": 12,
//    "area": "Engineering",
//    "skill": ["Statics","Mechanics of Materials","Fluid Dynamics","Mechanical Design and Analysis","Biomaterials",
//        "Biomechanics","Pharmacokinetics","Pharmacodynamics","Tissue Engineering","BioInstrumentation","ProEngineer",
//        "Nonlinear Dynamics","Manufacturing Processes"]
//});
//
//skills.save(function(err) {
//   if(err) throw err;
//});

//var project = new Project({
//    "type": "personal",
//    "project": "Payroll Management System",
//    "skillsUsed": "Java 7, Oracle 12c, PLSQL, Swing",
//    "github": null,
//    "url": null,
//    "description": "A system to calculate employee pay with data acquired via a timeclock UI. This allowed the client to save 1-2 hours each week calculating payroll. The system also flagged suspicious events and notified the proper manager. Automatically notified employees with a detailed review of their weekly hours. Included flexible querying of data and report generation for admin level users."
//});
//
//project.save(function(err) {
//    if(err) throw err;
//});
//
//var hobby = new Hobby({
//    "group": "exercise",
//    "picturesPath": "images/hobbies/exercise",
//    "summary": "Description here"
//});
//
//hobby.save(function(err) {
//    if(err) throw err;
//});


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
 * Add your routes to the event stack after the basics have been processed.
 */
app.use('/', index(config));
app.use('/about', about(config));
app.use('/hobbies', hobbies(config));
app.use('/projects', projects(config));
app.use('/skills', skills(config));

app.use(function (err, req, res, next) {
  global.logger.error('Error: (' + err.status + ') ' + err.message, {js:'app.js'});
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    err: err
  });
});

module.exports = app;

