//TODO: rename to queuebar.

var React      = require('react'),
	twtStore   = require('../stores/TweetStore'),
	twtActions = require('../actions/TweetActions');
 
module.exports = React.createClass({

	getInitialState: function() {
		return {
			unread: twtStore.getQueueLength()
		};
	},

	componentDidMount: function() {
		twtStore.addQueueListener(this._updateState);
	},
	
	_updateState: function() {
		this.setState({
			unread: twtStore.getQueueLength()
		});
	},

	render: function() {

		var classes = "updatesBar ";

		(this.state.unread > 0) ? classes += "on" : 1;	

		var tweetWordVariety = "tweet";

		(this.state.unread > 1) ? tweetWordVariety += "s" : 1;


		return (
			<div className={classes}>
			  You have <span className="amount">{this.state.unread}</span> unread {tweetWordVariety}. <a href="#" onClick={this._flushQue}>click to display</a>
			</div>
		);
	},

	_flushQue: function() {
		twtActions.flushQueue();
	}

})