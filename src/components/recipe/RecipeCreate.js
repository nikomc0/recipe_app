import React, { Component } from 'react';
import RecipeForm from './NewRecipe'
import RecipeIngredients from './RecipeIngredients'

class RecipeCreate extends Component {
	constructor(props){
		super(props);
		this.state = {
			recipe: ''
		};

		this.handleNewRecipe = this.handleNewRecipe.bind(this);
	}

	handleNewRecipe(obj){
		var recipe = obj.name
		this.setState({recipe: recipe})
	}

	render(){
		var recipeContainerStyle = {
			'marginTop': '20px'
		};

		var recipeName = <h4> Create {this.state.recipe}</h4>

		return (
			<div className="container-fluid" style={recipeContainerStyle}>

				{recipeName}

				<div>
					{ this.state.recipe === '' ?
						<RecipeForm newRecipe={this.handleNewRecipe}/>
						:
						<RecipeIngredients />
					}
				</div>
			</div>
		)
	}
}

export default RecipeCreate;