import React, { Component } from 'react';
import api from '../../api/recipe_utils';
import {ToggleButtonGroup, ToggleButton} from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";

class RecipeIngredients extends Component {
  constructor(props){
    super(props)
    this.state = {
      ingredients: [],
      currentIngredients: [],
      newIngredient: "",
    }

    this.fetchIngredients = this.fetchIngredients.bind(this);
    this.addToCurrentRecipe = this.addToCurrentRecipe.bind(this);
    this.handleIngredientChange = this.handleIngredientChange.bind(this);
  }

  componentDidMount(){
    this.fetchIngredients();
  }

  fetchIngredients(){
    var ingredients = api.getIngredients();
    this.setState({ingredients})
  }

  addToCurrentRecipe(event){
    // Create the ingredient on the bakend.
    api.addIngredient(this.state.newIngredient)

    // Clear out the now old new ingredient.
    this.setState({newIngredient: ""})
  }

  addExistingIngredientToRecipe(ingredient) {
    var ingredientToSet = this.findIngredient(this.state.ingredients, ingredient);
    // 1. Make a shallow copy of the items
    let ingredients = [...this.state.ingredients];

    // 2. Make a shallow copy of the item you want to mutate
    let ing = {...ingredients[ingredientToSet.index]};

    // 3. Replace the property you're intested in

    ing.addedToRecipe = !ing.addedToRecipe;

    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    ingredients[ingredientToSet.index] = ing;

    // 5. Set the state to our new copy
    this.setState({ingredients});
  }

  findIngredient(array, ingredient) {
    let value;
    let index;

    array.forEach((x, i) => {
      if (x && x.id && x.name === ingredient) {
        value = x;
        index = i;
      }
    })

    return {value, index}
  }

  handleIngredientChange(event) {
    this.setState({
      newIngredient: event.target.value
    });
  }

  render(){
    var currentIngredients = this.state.ingredients
      .filter((ingredient) => ingredient.addedToRecipe === true)
      .map((ingredient) => {
        return <li key={ingredient.id}> {ingredient.name}</li>
      });

    const ingredients = this.state.ingredients.map((ingredient) => {
      return (
        <ToggleButton 
          key={ingredient.id} 
          id={ingredient.id} 
          value={ingredient.name} 
          // onClick={this.addToCurrentRecipe} 
          onChange={(e) => this.addExistingIngredientToRecipe(e.currentTarget.value)}
          className="m-1"
        >{ingredient.name}</ToggleButton>
        )
    }) 
    return(
      <div>
        <div className="container-fluid">
          
          <p>click ingredients to add to recipe</p>

          <ToggleButtonGroup type="checkbox" className="mb-2">
            {ingredients}
          </ToggleButtonGroup>
        </div>

        <div className="container" style={{'paddingTop': '50px'}}>
          <div className="row">
            <div className="col">

              <p>Current Ingredients</p>

              <ul id="pendingIngredients">
                {currentIngredients}
              </ul>
            </div>

            <div className="col">
              <div className="row">
                <p>Ingredient not listed? Add it manually</p>
              </div>
              <div className="row">
                <div className="col">
                  <input id="ingredientToAdd" type="text" name="ingredient" value={this.state.newIngredient} onChange={this.handleIngredientChange}></input>
                </div>
                <div className="col">
                  <button className="btn btn-light" onClick={this.addToCurrentRecipe}>ADD</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default RecipeIngredients;