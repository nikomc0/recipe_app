import React, { Component } from 'react';
import { Circle, CheckCircle } from 'react-feather';
import api from '../../api/recipe_utils'

class RecipeList extends Component {
	constructor (props) {
		super(props);

		this.state = {
			recipes: [],
			selected: [],
		};

		this.fetchRecipes = this.fetchRecipes.bind(this);
		this.setIngredients = this.props.setIngredients;
	}

	componentDidMount(){
		this.fetchRecipes();
	}

	logItem(text){
		console.log(text);
	}

	fetchRecipes() {
		var list = api.getRecipes();
		this.setState({recipes: list})
	}

	fetchRecipeIngredients() {
		var values = [];

		this.state.selected.map((x) => {
			return values.push(x.id)
		})

		var ingredientsList = api.getRecipeIngredients(values);
		this.setIngredients(ingredientsList);
	}

	selectRecipe(id, event) {
		var recipe = this.state.recipes.find((recipe) => recipe.id === id);

		var element = document.getElementById(`recipe-card-${id}`)

		var recipes = [...this.state.recipes];

		if (element.dataset.checked === "false") {
			recipe.selected = true
			this.setState({recipes});
			this.updateSelected(recipe);

			element.classList.add("left-border");
			element.dataset.checked = "true";
		} else {
			recipe.selected=false
			this.setState({recipes});
			this.updateSelected(recipe);

			element.classList.remove("left-border");
			element.dataset.checked = "false";
		}

		return element;
	}

	updateSelected(recipe){
		var selected = [...this.state.selected]
		var included = selected.includes(recipe)

		if (!included) {
			selected.push(recipe)
		}

		if (included) {
			var value = selected.findIndex((x) => x === recipe);
			selected.splice(value, 1)
		}

		this.setState({selected: selected}, () => {
			this.fetchRecipeIngredients();
		});
	}


	render(){
		const listItems = this.state.recipes.map((recipe) => {
			if (recipe.selected === true) {
				return <div id={"recipe-card-" + recipe.id} key={recipe.id} className="card w-100" style={{width: '18rem'}} data-recipe-id={recipe.id} data-checked={false}>
					<div className="card-body">
					  <div className="row">
			        <div className="col-2" onClick={(event) => this.selectRecipe(recipe.id, event)}>
			        		<CheckCircle style={{color:'black'}}/>
			        </div>
			        <div className="col">
			          <h6 className="card-title align-self-center text-capitalize" style={{color: 'black'}}>{recipe.name}</h6>
			   				{/*<h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>*/}
			       		{/*<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>*/}
			    		</div>
					  </div>
					</div>
				</div>
			} else {
				return <div id={"recipe-card-" + recipe.id} key={recipe.id} className="card w-100" style={{width: '18rem'}} data-recipe-id={recipe.id} data-checked={false}>
					<div className="card-body">
					  <div className="row">
			        <div className="col-2" onClick={(event) => this.selectRecipe(recipe.id, event)}>
			        		<Circle style={{color:'black'}}/>
			        </div>
			        <div className="col">
			          <h6 className="card-title align-self-center text-capitalize" style={{color: 'black'}}>{recipe.name}</h6>
			   				{/*<h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>*/}
			       		{/*<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>*/}
			    		</div>
					  </div>
					</div>
				</div>
			}
		});

		return (
			<div className="d-grid gap-2">
				{listItems}
			</div>
		)
	}
}

export default RecipeList;