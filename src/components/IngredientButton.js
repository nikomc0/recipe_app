import React, { Component } from 'react';

class IngredientButton extends Component {
	render(){
		let button = (
			<>
			    <input type="checkbox" className="btn-check" id={this.props.id} value={this.props.id} autoComplete="off" name={this.props.name} onClick={this.props.onClick}/>
			    <label className="btn btn-outline-primary" htmlFor={this.props.id}>{this.props.name}</label>
			</>
		)
		return(
			<div>
				{button}
			</div>
		)
	}
}

export default IngredientButton;