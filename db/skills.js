/**
 * Schema for Skills object
 *
 * Created by Erik on 10/25/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var skillsSchema = new Schema({
    area: String,
    skill: [String],
    order: Number
});

var Skills = mongoose.model('Skills', skillsSchema);

module.exports = Skills;