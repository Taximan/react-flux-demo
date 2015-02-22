var Tweet = require('../models/Tweet');

module.exports = function(tweet, io) {

	// skip all non english tweets.
	if(tweet.lang != 'en') {
		return false;
	}

	var shortenTweet = {
		author: tweet.user.name,
		username: tweet.user.screen_name,
		content: tweet.text,
		date: new Date(tweet.created_at),
		source: 'https://twitter.com/' + tweet.user.screen_name + '/status/' + tweet.id_str
	};

	var tweetToBeAdded = new Tweet(shortenTweet);

	tweetToBeAdded.save(function(err){
		if(!err) {
			io.emit('tweet', shortenTweet);
		} else {
			console.log(err);
		}
	});

	
};