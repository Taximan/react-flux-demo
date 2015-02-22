var React = require('react');
var Tweet = require('./tweet');

module.exports = React.createClass({
	render: function() {

		var tweets = this.props.tweets.map(function(tweet, index) {
			return (
				<Tweet author={tweet.author} username={tweet.username} content={tweet.content} date={tweet.date} source={tweet.source} key={index}/>
			);
		})

		return (
			<ul className="tweets">
				{tweets}
			</ul>
		);
	}
})