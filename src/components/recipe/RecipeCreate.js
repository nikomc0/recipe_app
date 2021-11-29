import React, { Component } from 'react';
import RecipeForm from './NewRecipe';
import RecipeIngredients from './RecipeIngredients';
import Spinner from 'react-bootstrap/Spinner';
import api from '../../api/recipe_utils';

const ingredients = async function() {
	await api.getIngredients();
	console.log("FINISHED")
}

class RecipeCreate extends Component {
	constructor(props){
		super(props);
		this.state = {
			recipe: null,
			recipe_ingredients: [],
			current_ingredients: [],
			ingredients: ingredients,
			isFetchingIngredients: true,
		};

		this.handleNewRecipe = this.handleNewRecipe.bind(this);
	}

	componentDidMount() {
		// Existing recipe was clicked, and will have its pertinents fetched.
		if (Object.keys(this.props).length > 0 && this.props.match.params.recipe !== '') {
			this.fetchExistingRecipe(this.props.match.params.recipe);
		}

		api.getIngredients().then((response) => {
			this.setState({ingredients: response.data})
			this.setState({isFetchingIngredients: !this.state.isFetchingIngredients})
		});
	}

	handleNewRecipe(obj){
		var recipe = obj.name

		this.setState({isFetchingIngredients: !this.state.isFetchingIngredients});

		api.newRecipe(recipe)
		.then(response => {
			console.log(response)
			this.setState({recipe: response.data})
			this.setState({isFetchingIngredients: !this.state.isFetchingIngredients});
		})
	}

	fetchExistingRecipe(){
		if (!this.state.recipe) {
			var id = parseInt(this.props.match.params.recipe);
			let recipe, recipeIngredients, currentIngredients;

			api.getExistingRecipe(id)
			.then(response => {
				recipe = response.data.recipe;
				recipeIngredients = response.data.recipe_ingredients;
				currentIngredients = response.data.current_ingredients;
			})
			.then(() => {
				this.setState({
					recipe: recipe,
					recipe_ingredients: recipeIngredients,
					current_ingredients: currentIngredients,
				});
			})
			.catch((error) => {
				// alert(error.response.data.message);
				console.log(error);
				console.log(error.response)
			})
		}
	}

	getContent() {
		if (this.state.recipe && this.state.recipe.name) {
			return <RecipeIngredients data={this.state}/>;
		} else {
			return <RecipeForm newRecipe={this.handleNewRecipe}/>;
		}
	}

	render(){
		if (this.state.isFetching) {
			return (
				<Spinner animation="border" role="status">
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			);
		}

		let content = this.getContent();

		let recipeName;
		if (this.state.recipe && this.state.recipe.name != null) {
			recipeName = this.state.recipe.name;
		}

		return (
			<div className="container-fluid" style={{marginTop: '20px'}}>

				<h4>{recipeName}</h4>

				<div>
					{ 
						this.state.isFetchingIngredients ? 
							<Spinner animation="border" role="status">
								<span className="visually-hidden">Loading...</span>
							</Spinner>
						:
							content 
					}
				</div>
			</div>
		)
	}
}

export default RecipeCreate;