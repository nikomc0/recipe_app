import React, { Component } from 'react';
import api from '../../api/recipe_utils';

class EditRecipe extends Component {
	constructor(props) {
		super(props);

		this.state = {
			ingredients: [],
			currentIngredients: [],
			groups: [],
			newIngredient: "",
			currentRecipe: ""
		}
	}

	componentDidMount() {
		this.setCurrentRecipe(this.props.match.params.recipe);
		
		// Fetch Ingredients
		this.fetchIngredients();
	}


	setCurrentRecipe(id) {
		this.setState({currentRecipe: id})
		this.fetchExistingRecipe(id);
	}

	fetchExistingRecipe(currentRecipe) {
		currentRecipe = parseInt(currentRecipe);

		api.getExistingRecipe(currentRecipe)
		.then(response => {
			console.log(response);
		  // response.data.current_ingredients.map((x) => {
		  //   return this.addExistingIngredientToRecipe(x.name);
		  // })
		})
		.catch((error) => {
		  alert(error.response.data.message);
		  console.log(error);
		  console.log(error.response.data.error)
		  console.log(error.response.data.message);
		})
	}

	fetchIngredients(){
		api.getIngredients()
		.then(response => {
		  const ingredients = response.data;
		  this.setState({ ingredients });
		})
		.then(() => {
			console.log('Create Ingredient Groups')
		  // this.createIngredientGroups();
		})
	}

	render() {
		var recipeName = <h4> Create {this.state.recipe}</h4>
		
		return (
			<>
				{recipeName}
			<div>EDIT RECIPE</div>
			</>
		)
	}
}

export default EditRecipe;