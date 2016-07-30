/**
 * Standard libraries required for route
 */
var express = require('express');
var path = require('path');

module.exports = function (config) {
  var app = express();
  app.set('views', path.join(global.appRoot, 'views'));
  app.set('view engine', 'ejs');
  
  /**
   * If you need to break a route into GET/POST then I suggest to do this:
   */
  
  // app.get('*', functionForGets(config));
  // app.post('*', functionForPosts(config));
  
  /**
   * And then do the following in their respective functions
   */
  
  // var app = express();
  // app.get('/', function(req, res, next) {
  //   //...
  // });
  // return app;
  
  app.get('/', function (req, res, next) {
    if (!config.newsEntries.entries)
      res.status(500).send('A terrible thing has happened.');
    else {
      renderIndex(req, res, config);
    }
  });

  app.get('/refreshConfig', function(req, res, next) {
    config.refreshConfig();
    renderIndex(req, res, config);
  });
  
  return app;
};

function renderIndex(req, res, config) {
  var sortedEntries = config.newsEntries;
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
}