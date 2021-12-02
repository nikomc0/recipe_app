import React, { Component } from 'react';

class Alert extends Component {
	render() {
		let alert = this.props.msg !== "" 
			? <div className="alert alert-success w-50" role="alert">{this.props.msg}</div>
			: <></>

		return (
			<div>
				{alert}
			</div>
		);
	}
}

export default Alert;