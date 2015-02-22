var React      = require('react'),
	TweetsList = require('./components/tweetsList'),
	UpdatesBar = require('./components/updatesBar'),
	twtActions = require('./actions/TweetActions'),
	twtStore   = require('./stores/TweetStore');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			tweets: this.props.tweets
		};
	},

	componentDidMount: function(){
		var socket = io();

		socket.on('tweet', (function(tweet){
			twtActions.queue(tweet);	
		}).bind(this));

		twtStore.addChangeListener(this.updateTweets);

	},

	updateTweets: function(tweets) {
		this.setState({
			tweets: twtStore.getAll().concat(this.state.tweets)
		});
	},

	render: function(){
		return (
			<div>
				<UpdatesBar  />
				<TweetsList tweets={this.state.tweets} />
			</div>			
		)
	}
});