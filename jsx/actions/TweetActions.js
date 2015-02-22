var Dispatcher  = require('../dispatcher');
    TweetConsts = require('../constants/TweetConsts');

var TweetActions = {
	queue: function(tweet){
		Dispatcher.dispatch({
			actionType: TweetConsts.QUEUE_TWEET,
			tweet: tweet
		});
	},

	flushQueue: function() {
		Dispatcher.dispatch({
			actionType: TweetConsts.QUEUE_FLUSH
		});
	},
};

module.exports = TweetActions;