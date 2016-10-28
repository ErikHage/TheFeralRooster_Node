/**
 * Schema for Projects Object
 *
 * Created by Erik on 10/27/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
    type: String,
    project: String,
    skillsUsed: String,
    github: String,
    url: String,
    description: String
});

var Project = mongoose.model('Project', projectSchema);

module.exports = Project;