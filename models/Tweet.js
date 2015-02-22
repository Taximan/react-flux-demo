var mongoose = require('mongoose');

var schema =  new mongoose.Schema({
	author: String,
	username: String,
	content: String,
	date: Date,
	source: String

});

module.exports = mongoose.model('Tweet', schema);