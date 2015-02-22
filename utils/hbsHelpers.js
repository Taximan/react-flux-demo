module.exports = {
	
	//for example: {{#dev mode}}
	dev: function(ctx, options){
		if(ctx === "development") {
			return options.fn(this);
		}
	},

	//for example: {{#prod mode}}
	prod: function(ctx, options) {
		if(ctx === "production") {
			return options.fn(this);
		}
	},


};