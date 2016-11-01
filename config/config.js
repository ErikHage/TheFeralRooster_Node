/**
 * Common config
 *
 * DB schemas
 * Pictures for hobbies page
 *
 * Created by Erik on 10/28/2016.
 */
var config = {};

config.mongo_uri = "mongodb://ehage:ASdot786!@ds061076.mlab.com:61076/theferalrooster";

var News = require('../db/news');
var Skills = require('../db/skills');
var Project = require('../db/projects');
var Hobby = require('../db/hobbies');

config.db = {
    News: News,
    Skills: Skills,
    Project: Project,
    Hobby: Hobby
};

config.hobbyPics = {
    "Brewing": [
        'cider.jpg',
        'drinkingbeer.jpg',
        'ferment.jpg',
        'mash.jpg',
        'setup.jpg'
    ],
    "Cooking": [
        'buckle.jpg',
        'cookies.jpg',
        'frozen.jpg',
        'irish_pot.jpg',
        'pad.jpg',
        'stirfry.jpg'
    ],
    "Exercise": [
        'beast.jpg',
        'spartansprint.jpg',
        'sprint.jpg',
        'super.jpg',
        'tm_2014.jpg',
        'tough_li_2015.jpg',
        'tm_ny_pyramid.jpg',
        'tm_ny_arctic.jpg',
        'super_2016_swim.jpg'
    ]
};

module.exports = config;

