var Tweet  = require('./models/Tweet'),
	config = require('./config'),
	JSX    = require('node-jsx').install(),
	React  = require('react'),
	twtApp = React.createFactory(require('./jsx/main'));

module.exports = {
	index: function(req, res) {

		var tweets = [];
		var markup = "";

		//get 10 last tweets from the DB.

		Tweet.find({}).sort({date: '-1'}).limit(10).exec(function(err, fromDb) {
			if(!err) {
				// because why the fuck not.
				tweets = JSON.parse(JSON.stringify(fromDb));

				//Server side render. 
				markup = React.renderToString(twtApp({tweets: tweets}));

				res.render('home.handlebars', {
					markup: markup,
					state: JSON.stringify(tweets),
					mode: config.mode
				});

			} else {
				console.log(err);
				res.status(500).send("something went wrong..");
			}
		})	

		
	}
}