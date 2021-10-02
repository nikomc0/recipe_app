import React, { Component } from'react'
import IngredientCard from './IngredientCard'

class RecipeIngredients extends Component {
	componentDidMount(){
		// this.parseIngredients();
	}

	parseIngredients(){
		var allIngredients = [];

		this.props.selectedIngredients.map((ingredient) => {
			console.log(ingredient.ingredients)
		});
	}

	render(){
		if (this.props.selectedIngredients.length === 0) {
			var recipeAlert = <div className="alert alert-warning w-50" role="alert">
					<h5>Please Select A Recipe.</h5>
				</div>
		} else {
		}

		const recipes = this.props.selectedIngredients.map((recipe) => {
			return <IngredientCard key={recipe.id} id={recipe.id} ingredients={recipe.ingredients} recipeName={recipe.recipe_name}/>
		});

		return(
			<div className="col">
				<h3>List of Ingredients</h3>
				<p>for selected recipes</p>
				
				{recipeAlert}

				<div className="row row-cols-1 row-cols-md-3 g-4">
					{recipes}
				</div>
			</div>

		)
	}
}

export default RecipeIngredients;
