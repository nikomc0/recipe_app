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
    var ingredients = [...this.state.currentIngredients];

    var value = event.target.value

    if (value.length === 0) {
      var data = api.addIngredient(this.state.newIngredient)

      this.state.ingredients.forEach((x) => {
        if (x && x.id && x.id === data) {
          ingredients.push(this.state.ingredients[data-1].name)
        }
      })
    } else {
      var single = this.state.ingredients.find((x) => x.id === parseInt(value))
      ingredients.push(single)
    }

    console.log(this.state.ingredients)

    this.setState({currentIngredients: ingredients})
    this.setState({newIngredient: ""})
  }

  addExistingIngredientToRecipe(ingredient) {
    var currentIngredients = [...this.state.currentIngredients];

    var ingredientToSet = this.findIngredient(ingredient)

    currentIngredients.push(ingredientToSet)

    this.setState({currentIngredients: currentIngredients})
  }

  findIngredient(ingredient) {
    let value;

    this.state.ingredients.forEach((x) => {
      console.log({x})
      if (x && x.id && x.name === ingredient) {
        value = x
      }
    })

    return value
  }

  handleIngredientChange(event) {
    this.setState({
      newIngredient: event.target.value
    });
  }

  render(){
    var currentIngredients = this.state.currentIngredients.map((ingredient, index) => {
      return <li key={index}> {ingredient.name}</li>
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