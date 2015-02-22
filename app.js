var React = require('react');
var TweetApp = require('./jsx/main');

var initialState = JSON.parse(document.getElementById('initial-state').innerHTML);

React.render(<TweetApp tweets={initialState} />, document.getElementById('tweet-app'));