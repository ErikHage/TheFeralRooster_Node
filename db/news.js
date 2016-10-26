/**
 * Schema for news object
 *
 * Created by Absulom on 10/22/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var newsSchema = new Schema({
    title: String,
    content: String,
    date: Date,
    updated_at: Date
});

//on every save, add the date
newsSchema.pre('save', function(next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if(!this.date) {
        this.date = currentDate;
    }
    next();
});

var News = mongoose.model('News', newsSchema);

module.exports = News;