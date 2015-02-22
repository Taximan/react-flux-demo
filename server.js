var express     = require('express'),
	mongoose    = require('mongoose'),
	config      = require('./config'),
	routes      = require('./routes'),
	twitter     = require('node-twitter'),
	exphbs      = require('express-handlebars'),
	tweetHandle = require('./utils/tweetHandler');

mongoose.connect(config.mongoDb.connStr);


var app = express();
var PORT = process.env.PORT || 8080;

app.disable('etag');



var twitter = new twitter.StreamClient(
	config.twitterAPI.consumer_key,
	config.twitterAPI.consumer_secret,
	config.twitterAPI.access_token_key,
	config.twitterAPI.access_token_secret

);

app.engine('handlebars', exphbs({
	defaultLayout: 'main',
	helpers: require('./utils/hbsHelpers')
}));

app.set('view engine', 'handlebars');

app.get('/', routes.index);
app.use("/", express.static(__dirname + '/public/'));



var server = app.listen(PORT, function() {
	console.log('server awaits at port:' + PORT);
});

var io = require('socket.io').listen(server);

twitter.on('error', function(error) {
	console.log(error);
})

twitter.on('tweet', function(tweet) {
	tweetHandle(tweet, io);
})

twitter.start(['javascript']);
