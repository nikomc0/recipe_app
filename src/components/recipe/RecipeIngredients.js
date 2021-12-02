import React, { Component } from 'react';
import {ToggleButtonGroup, ToggleButton, Button} from 'react-bootstrap'
import Ingredients from '../IngredientsList';
import CurentIngredients from '../CurrentIngredients';
import AddIngredient from '../AddIngredient';
import Spinner from 'react-bootstrap/Spinner';
import Alert from '../Alert';

import "bootstrap/dist/css/bootstrap.min.css";

import api from '../../api/recipe_utils';
import utils from '../../utils/ingredients';

class RecipeIngredients extends Component {
  constructor(props){
    super(props)
    this.state = {
      ingredients: this.props.data.ingredients || RecipeIngredients.defaultProps.ingredients,
      currentIngredients: this.props.data.current_ingredients || RecipeIngredients.defaultProps.currentIngredients,
      groups: [],
      newIngredient: "",
      currentRecipe: this.props.data.recipe || RecipeIngredients.defaultProps.currentRecipe,
      msg: ""
    }

    this.addToCurrentRecipe 	         = this.addToCurrentRecipe.bind(this);
    this.createIngredientGroups        = this.createIngredientGroups.bind(this);
    this.addExistingIngredientToRecipe = this.addExistingIngredientToRecipe.bind(this);
    this.currentIngredientsList        = this.currentIngredientsList.bind(this);
    this.setIngredient                 = this.setIngredient.bind(this);
  }

  componentDidMount() {
    console.log(this.state);

    if (Object.keys(this.state.ingredients).length === 0) {
      console.warn("Need to fetch ingredients.")
    }

    // Create a new recipe
    if (this.props.recipe) {
  		let newRecipe = this.props.recipe;

  		this.createNewRecipe(newRecipe)
    }

    // Segment out ingredients into groups
    this.createIngredientGroups();

    // Set currentIngredients to addedToRecipe in IngredientsList
    this.currentIngredientsList();
  }

  createNewRecipe(newRecipe) {
    api.newRecipe(newRecipe)
      .then((response) => {
        this.setState({...this.state.currentRecipe, response})   
      })
      .catch((error) => console.log(error));
  }

  // Takes all pending ingredients and saves them to the database.
  saveIngredientsToRecipe() {
    var ingredients = this.state.ingredients
      .filter((x) => x.addedToRecipe && x.addedToRecipe === true);

    let currentRecipe = this.state.currentRecipe;

    api.saveIngredientsToRecipe(currentRecipe, ingredients)
      .then(response => {
        this.setState({msg: "Recipe has been updated."});
      })
      .then(() => {
        setTimeout(() => {
          this.setState({msg: ""})
        }, 5000);
      });
  }

  addToCurrentRecipe(value){
    var ingredients = [...this.state.ingredients];
    var ingredient = {
      'name': value,
      'addedToRecipe' : false
    };

    // Create the ingredient on the backend.
    api.newIngredient(ingredient)
    .then(response => {
      // console.log(response);
      ingredient = response.data;
      ingredient.addedToRecipe = true;
      ingredients.push(ingredient);
      this.setState({ingredients: ingredients})
      this.createIngredientGroups();
    })
    .catch((error)=>{
      alert(error.response.data.message);
      console.log(error);
      console.log(error.response.data.error)
      console.log(error.response.data.message);
    });
  }

  setIngredient(ingredientToSet) {
    // 1. Make a shallow copy of the items
    let ingredients = [...this.state.ingredients];

    if (ingredientToSet) {
      // 2. Make a shallow copy of the item you want to mutate
      let ingredient = {...ingredients[ingredientToSet.index]};

      // 3. Replace the property you're intested in
      if (!ingredient.addedToRecipe) {
        ingredient.addedToRecipe = true;
      } else {
        ingredient.addedToRecipe = !ingredient.addedToRecipe;
      }

      // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
      ingredients[ingredientToSet.index] = ingredient;

      // 5. Set the state to our new copy
      this.setState({ingredients});
    }
  }

  addExistingIngredientToRecipe(ingredient) {
    var ingredientToSet = utils.findIngredient(this.state.ingredients, ingredient);

    if (ingredientToSet) {
      this.setIngredient(ingredientToSet);
    } else {
      console.warn("Couldn't set ingredient")
    }
  }

  createIngredientGroups() {
    if (Object.keys(this.state.ingredients).length === 0) {
      return;
    }

    var start = 0;
    var end   = start + 10;
    var list  = this.state.ingredients;
    var split = Math.ceil(list.length / 10);

    var groups = [];

    for (var i = 0; i <= split; i++) {
        var group = list.slice(start, end);

        var ingredients = group.map((ingredient) => {
          return (
              <ToggleButton    
                key={ingredient.id} 
                id={ingredient.id} 
                value={ingredient.name} 
                onClick={(e) => this.addExistingIngredientToRecipe(e.currentTarget.innerText)}
                onChange={(e) => this.addExistingIngredientToRecipe(e.currentTarget.value)}
                className="m-1 col-sm-1"
                size="sm">
                  {ingredient.name}
              </ToggleButton>
          )
        })

        groups.push(ingredients);

        start += 10;
        end += 10;
    }

    this.setState({groups: groups});
  }

  currentIngredientsList() {
  	var currentIngredients;
    var data = this.props.data.current_ingredients;

    if (Object.keys(this.state.currentIngredients).length > 0) {

      data.forEach((x) => {
        var ingredient = utils.findIngredient(this.state.ingredients, x.name);
        ingredient.x.addedToRecipe = true;

        console.log(ingredient.x)

      });
    }

  	return currentIngredients;
  }

  ingredientsList() {
  	var data = this.state.groups;

  	data.map((group) => {
		return (
			<ToggleButtonGroup type="checkbox" style={{width: '100%'}} className='d-flex justify-content-center'>
				{group}
			</ToggleButtonGroup>
		)
	});

	return data;
  }

  render(){
    let ingredients = this.ingredientsList();
      
    return(
      <div>
        { 
          this.state.ingredients.length > 0 
          ? <Ingredients ingredients={ingredients} />
          : <Spinner animation="border" />
        }

        <div className="container" style={{'paddingTop': '50px'}}>
          <Alert msg={this.state.msg} />
          <div className="row">
            <div className="col">

          	<CurentIngredients 
          		currentIngredients={this.state.ingredients} 
          		saveIngredientsToRecipe={this.saveIngredientsToRecipe}
          	/>
            <Button
              onClick={() => this.saveIngredientsToRecipe()}>
              SAVE    
            </Button>
            </div>

          	<AddIngredient 
          		newIngredient={this.state.newIngredient} 
          		handleIngredientChange={this.handleIngredientChange} 
          		addToCurrentRecipe={this.addToCurrentRecipe}
          	/>
          </div>
        </div>
      </div>
    )
  }
}

RecipeIngredients.defaultProps = {
  ingredients: [1,2,3],
  currentIngredients: [],
  currentRecipe: "",
};


export default RecipeIngredients;