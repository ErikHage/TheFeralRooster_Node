/**
 * Schema for news object
 *
 * Created by Absulom on 10/22/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var newsSchema = new mongoose.Schema({
    date: {
        day: Number,
        month: Number,
        year: Number
    },
    title: String,
    content: String
});

//custom methods to modify data

var News = mongoose.model('News', newsSchema);

module.exports = News;