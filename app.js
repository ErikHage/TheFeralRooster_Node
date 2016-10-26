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
 * Define mongoDB
 */
var db = require('./db/db');
var News = require('./db/news');
var Skills = require('./db/skills');

//var news = new News(  {
//    "title" : "Red White and Brew",
//    "content" : "I'm proud to be a founding member of the Red White and Brew Beer Company, to be located in/around Swedesboro, New Jersey. I also designed and host the <a href='http://107.170.110.210:32799' target='_blank'>brewery's website</a> (currently under construction). I started brewing back in 2012 when I bought a homebrewing kit on a whim. I'd always been interested in craft beer, but once I started brewing for myself it became a passion. So when my friend Chris (also a homebrewer) asked me if I would be interested in opening a microbrewery, my answer was an emphatic yes! We plan to open mid-end of 2017. <!-- Our flagship beer is called Checks and Balances IPA. We were tired of all those IPAs out there that are 100% bitterness, with no or very little maltiness. Checks and Balances IPA provides the traditional bitterness you would expect of an IPA, yet also has a nice malty finish to balance that out (hence the name). A close comparison would be 21st Amendment's Brew Free or Die IPA. -->"
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
 * Attempt to build a configuration object to pas around data
 */

var config = {
    db: db,
    News: News,
    Skills: Skills
};

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

