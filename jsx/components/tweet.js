var React = require('react');

module.exports = React.createClass({
	
	render: function() {
		return (
			<div className="tweet">
				<div className="author">{this.props.author} <span className="username">(@{this.props.username})</span></div>
				<div className="content">{this.props.content}</div>
				<div className="date">{this.props.date}</div>
				<a className="source" href={this.props.source}>source</a>
				<div className="clearfix"></div>
			</div>
		);
	}

})