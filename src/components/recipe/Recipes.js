import React from 'react';
import { Link } from 'react-router-dom'
import RecipeList from './RecipeList'
import RecipeIngredients from '../RecipeIngredients'
import { Plus } from 'react-feather';

class Recipes extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			selected: false,
			ingredientsList: [],
		};
	}

	handleSelected(){
		this.setState({
			selected: !this.state.selected
		});
	}

	handleIngredients(ingredients){
		this.setState({
			ingredientsList: ingredients,
		});
	}

	render(){
		var recipeContainerStyle = {
			'marginTop': '20px'
		};

		var recipeListStyle = {
			'height': 100
		};

		return (
			<div className="container-fluid" style={recipeContainerStyle}>
				<div className="row vh-100">
					<div className="col-3" style={recipeListStyle}>
						<div className="row">
							<div className="col">
								<p> Recipes </p>
							</div>
							<div className="col">
								<Link to="/new-recipe" style={{color: 'white'}}>
									<Plus />
								</Link >
							</div>
						</div>
						<RecipeList
							setIngredients={(items) => this.handleIngredients(items)}
						/>
					</div>
					<div className="col-9 vh-100">
						<RecipeIngredients
							selectedIngredients={this.state.ingredientsList}
						/>
					</div>
				</div>
			</div>
		)
	}
}

export default Recipes;
