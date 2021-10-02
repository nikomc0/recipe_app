import React, { Component } from 'react'

class IngredientCard extends Component {
	render(){
		var ingredients = this.props.ingredients.map((ingredient) => {
			return (
				  <ul key={ingredient.id} className="list-group list-group-flush">
				    <li className="list-group-item text-capitalize" style={{color: 'black'}}>{ingredient.name}</li>
				  </ul>
				)
		})

		return(
			<div className="col-6 mb-4">
				<div id={this.props.key} key={this.props.key} className="card h-100" data-recipe-id="">
					<div className="card-header" style={{color: 'black'}}>
			         	<h6 className="card-title align-self-center text-capitalize" style={{color: 'black'}}>{this.props.recipeName}</h6>
					</div>
					<div className="card-body">
			        	{ingredients}
			       		{/*<h6 className="card-text" style={{color: 'black'}}>Some quick example text to build on the card title and make up the bulk of the card's content.</h6>*/}
					</div>
				</div>
			</div>
		)
	}
}

export default IngredientCard;