/**
 * Functions to talk to the mongo database
 *
 * Created by Absulom on 10/22/2016.
 */

var mongoose = require('mongoose');
var config = require('../config/config');

mongoose.connect(config.mongo_uri);