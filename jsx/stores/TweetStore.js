var Dispatcher 	 = require('../dispatcher'),
	EventEmitter = require('events').EventEmitter,
	assign 		 = require('object-assign'),
	TweetConsts  = require('../constants/TweetConsts');

var CHANGE_EVENT = 'change';
var QUE_UPDATE_EVENT = 'queue-update';

var _tweets = [],
	_queue  = [];

function add(tweet) {
	_tweets.push(tweet);
}

function queue(tweet) {
	_queue.push(tweet);
}

function flushQueue(){
	_tweets = _queue.concat(_tweets);
	_queue  = [];
}

var TweetStore = assign({}, EventEmitter.prototype, {

	getAll: function() {
		return _tweets;
	},

	getQueueLength: function() {
		return _queue.length;
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function(cb) {
		this.on(CHANGE_EVENT, cb);
	},

	removeChangeListener: function(cb) {
		this.removeListener(CHANGE_EVENT, cb);
	},

	addQueueListener: function(cb) {
		this.on(QUE_UPDATE_EVENT, cb);
	},

	removeQueueListener: function(cb) {
		this.removeListener(QUE_UPDATE_EVENT, cb);
	}


});


Dispatcher.register(function(action){

	switch(action.actionType) {
		case TweetConsts.QUEUE_TWEET: 
			queue(action.tweet);
			TweetStore.emit(QUE_UPDATE_EVENT);
			break;
		case TweetConsts.QUEUE_FLUSH:
			flushQueue();
			TweetStore.emit(CHANGE_EVENT);
			TweetStore.emit(QUE_UPDATE_EVENT);
			break;
	}

});


module.exports = TweetStore;