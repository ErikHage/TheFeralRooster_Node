/**
 * Schema for Hobbies object
 *
 * Created by Erik on 10/27/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var hobbySchema = new Schema({
    group: String,
    summary: String,
    picturesPath: String
});

var Hobby = mongoose.model('Hobby', hobbySchema);

module.exports = Hobby;
