/**
 * Standard libraries required for route
 */
var express = require('express');
var path = require('path');

module.exports = function (config) {
  var app = express();
  app.set('views', path.join(global.appRoot, 'views'));
  app.set('view engine', 'ejs');

  app.get('/', function (req, res) {
    config.News.find({})
        .sort('-date')
        .exec(function(err, news) {
            if (err) {
              throw err;
            }
            console.log('DB output:' + news);
            renderIndex(req, res, news);
        });
  });

  return app;
};

function renderIndex(req, res, news) {
  //var sortedEntries = config.newsEntries;
  //sortedEntries.sort(function (a, b) {
  //  if (a.date.year != b.date.year) {
  //    return b.date.year - a.date.year;
  //  } else if (a.date.month != b.date.month) {
  //    return b.date.month - a.date.month;
  //  }
  //  return b.date.day - a.date.day;
  //});

  res.render('index', {
    title: 'The Feral Rooster',
    subtitle: 'Personal domain of Erik B Hage',
    jumbotronBackgroundImage: 'sunlight_forest.jpg',
    entries: news
  });
}