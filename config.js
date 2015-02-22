module.exports = {
	twitterAPI: {
		consumer_key: '',
		consumer_secret: '',
		access_token_key: '',
		access_token_secret: ''
	},

	mongoDb: {
		connStr: ''
	},
	
	mode: process.env.NODE_ENV || 'development',
	
};