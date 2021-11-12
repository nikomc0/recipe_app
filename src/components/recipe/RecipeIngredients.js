import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';
import api from '../../api/recipe_utils';
import {ToggleButtonGroup, ToggleButton, ButtonToolbar} from 'react-bootstrap'
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css";

class RecipeIngredients extends Component {
  constructor(props){
    super(props)
    this.state = {
      ingredients: [],
      currentIngredients: [],
      newIngredient: "",
      groups: []
    }

    this.fetchIngredients = this.fetchIngredients.bind(this);
    this.addToCurrentRecipe = this.addToCurrentRecipe.bind(this);
    this.handleIngredientChange = this.handleIngredientChange.bind(this);
    this.createIngredientGroups = this.createIngredientGroups.bind(this);
  }

  componentDidMount(){
    axios
    .get(`http://localhost:9393/ingredients`)
    .then(response => {
      const ingredients = response.data;
      this.setState({ ingredients });
    })
    .then(() => {
      this.createIngredientGroups();
    })

  }

  fetchIngredients(){
    var ingredients = api.getIngredients();
    this.setState({ingredients})
  }

  addToCurrentRecipe(event){
    var ingredients = [...this.state.ingredients];
    var ingredient = {
      'name': this.state.newIngredient,
      'addedToRecipe' : false
    };

    // Create the ingredient on the bakend.
    axios
    .post(`http://localhost:9393/ingredients`, { ingredient }, {'Content-Type': 'text/plain'})
    .then(response => {
      ingredient.addedToRecipe = true;
      ingredients.push(ingredient);
      this.setState({ingredients: ingredients})
      // Clear out the now old new ingredient.
      this.setState({newIngredient: ""})
      this.createIngredientGroups();
    })
    .catch((error)=>{
      alert(error.response.data.message);
      console.log(error);
      console.log(error.response.data.error)
      console.log(error.response.data.message);
    });
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

  createIngredientGroups() {
    var start = 0;
    var end   = 9;
    var list  = this.state.ingredients;
    var split = Math.ceil(list.length / 10);

    var groups = [];

    for (var i = 0; i < split; i++) {
        var group = list.slice(start, end);

        var ingredients = group.map((ingredient) => {
          return (
            <ToggleButton       
              key={ingredient.id} 
              id={ingredient.id} 
              value={ingredient.name} 
              // onClick={(e) => this.addExistingIngredientToRecipe(e)} 
              onChange={(e) => this.addExistingIngredientToRecipe(e.currentTarget.value)}
              className="m-1"
              size="sm">
              {ingredient.name}
            </ToggleButton>
            )
        })

        groups.push(ingredients);

        start += 9;
        end += 9;
    }

    this.setState({groups: groups});
  }

  render(){
    var currentIngredients = this.state.ingredients
      .filter((ingredient) => ingredient.addedToRecipe === true)
      .map((ingredient) => {
        return <li key={ingredient.id}> {ingredient.name}</li>
      });

    const ingredients = this.state.groups.map((group) => {
        return (
          <Container>
            <Row>
              <ToggleButtonGroup type="checkbox">
                {group}
              </ToggleButtonGroup>
            </Row>
          </Container>
        )
      })
      
    return(
      <div>
        <div className="container-fluid">
          
          <p>click ingredients to add to recipe</p>

          <ButtonToolbar aria-label="Toolbar with button groups">
            {ingredients}
          </ButtonToolbar>
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