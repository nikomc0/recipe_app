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

	componentDidMount() {
		console.log(this.state)
	}

	handleNewRecipe(obj){
		var recipe = obj.name

		this.setState({...this.state.recipe, recipe})
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
						<RecipeIngredients recipe={this.state}/>
					}
				</div>
			</div>
		)
	}
}

export default RecipeCreate;