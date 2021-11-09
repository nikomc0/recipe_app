import React, { Component } from 'react';
import IngredientButton from '../IngredientButton';
import api from '../../api/recipe_utils';
import {ToggleButtonGroup, Button, ToggleButton} from 'react-bootstrap'
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

{/*<div class="container" style="padding-top: 50px;">
  <div class="row">
    <div class="col">
      <h1><%= @recipe.name %></h1>

      <p>Current Ingredients</p>

      <ul id="pendingIngredients">
        <% @recipe_ingredients.each do |t| %>
            <li><%= t.ingredient.name %></li>
        <% end %>
      </ul>
    </div>

    <div class="col">
      <p>Ingredient not listed? Add it manually</p>
      <input id="ingredientToAdd" type="text" name="ingredient" value=""></input>
      <button class="btn btn-light" onclick="add_ingredient()">ADD</button>
    </div>
  </div>
</div>

<!-- <p>Add Ingredients</p>
    <form action="/ingredients_to_recipe" method="post">
    		<input hidden="true" name="recipe_id" value='<%= @recipe.id %>'></input>
	    <% @ingredients.each do |t| %>
				<input type="checkbox" name='<%= t.name %>' value='<%= t.id %>'><%= t.name %></input><br>
	    <% end %>
	    <input type="submit" value="submit">
	  </form> 
 -->
  <script>
  	document.body.onload = function(){
  		document.ingredientsArray = [];
  	}
  </script>

  <script>
  	function add_ingredient(){
  		array = document.ingredientsArray;
  		value = document.querySelector('#ingredientToAdd').value;
  		newIngredients = document.querySelector("#newIngredients").value = array;
			array.push(value);
  		console.log(array);
  		pendingIngredient(value);
  		document.querySelector('#ingredientToAdd').value = '';

  		addToGlobal(array);
  	};

  	function pendingIngredient(value){
		  var ul = document.querySelector("#pendingIngredients");
		  var li = document.createElement("li");
		  li.appendChild(document.createTextNode(value));
		  ul.appendChild(li);
  	};

  	function addToGlobal(array){
  		document.querySelector("#newIngredients").value = array;
  	}

  	function save_ingredients(){
  		ingredients = document.ingredientsArray
  		console.log(ingredients)
  	}
  </script>*/}