import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import api from '../../api/recipe_utils';
import {ToggleButtonGroup, ToggleButton, ButtonToolbar, Button} from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";

class RecipeIngredients extends Component {
  constructor(props){
    super(props)
    this.state = {
      ingredients: [],
      currentIngredients: [],
      newIngredient: "",
      groups: [],
      currentRecipe: ""
    }

    this.fetchIngredients = this.fetchIngredients.bind(this);
    this.addToCurrentRecipe = this.addToCurrentRecipe.bind(this);
    this.handleIngredientChange = this.handleIngredientChange.bind(this);
    this.createIngredientGroups = this.createIngredientGroups.bind(this);
  }

  componentDidMount(){
    // Current/Existing Recipe
    if (this.props.location) {
      let currentRecipe = this.props.location.state.recipe 

      this.setState({currentRecipe: currentRecipe});

      this.fetchExistingRecipe(currentRecipe);
    }

    // Create a new recipe
    if (this.props.recipe) {
      let newRecipe = this.props.recipe;

      this.createNewRecipe(newRecipe)
    }

    // Fetch Ingredients
    this.fetchIngredients();
  }

  createNewRecipe(newRecipe) {
    api.newRecipe(newRecipe)
      .then((response) => {
        this.setState({...this.state.currentRecipe, response})   
      })
      .catch((error) => console.log(error));
  }

  fetchExistingRecipe(currentRecipe) {
      api.getExistingRecipe(currentRecipe)
      .then(response => {
        response.data.current_ingredients.map((x) => {
          return this.addExistingIngredientToRecipe(x.name);
        })
      })
      .catch((error) => {
        alert(error.response.data.message);
        console.log(error);
        console.log(error.response.data.error)
        console.log(error.response.data.message);
      })
  }

  saveIngredientsToRecipe() {
    var ingredients = [];

    this.state.ingredients
      .filter((x) => x.addedToRecipe && x.addedToRecipe === true)
      .map((x) => {
        return ingredients.push(x);
      });

    let currentRecipe = this.state.currentRecipe;

    console.log(ingredients);

    api.saveIngredientsToRecipe(currentRecipe, ingredients)
      .then(response => console.log(response));
  }

  fetchIngredients(){
    api.getIngredients()
    .then(response => {
      const ingredients = response.data;
      this.setState({ ingredients });
    })
    .then(() => {
      this.createIngredientGroups();
    })
  }

  addToCurrentRecipe(event){
    var ingredients = [...this.state.ingredients];
    var ingredient = {
      'name': this.state.newIngredient,
      'addedToRecipe' : false
    };

    // Create the ingredient on the bakend.
    api.newIngredient()
    .then(response => {
      console.log(response);
      ingredient = response.data;
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
    if (!ing.addedToRecipe) {
      ing.addedToRecipe = true;
    } else {
      ing.addedToRecipe = !ing.addedToRecipe;
    }

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

  render(){
    var currentIngredients = this.state.ingredients
      .filter((ingredient) => ingredient.addedToRecipe === true)
      .map((ingredient) => {
        return <li key={ingredient.id}> {ingredient.name}</li>
      });

    const ingredients = this.state.groups.map((group) => {
        return (
                <ToggleButtonGroup type="checkbox" style={{width: '100%'}} className='d-flex justify-content-center'>
                  {group}
                </ToggleButtonGroup>
        )
      })
      
    return(
      <div>
        <Container fluid>
          
          <p>click ingredients to add to recipe</p>

          <ButtonToolbar aria-label="Toolbar with button groups">
            {ingredients}
          </ButtonToolbar>
        </Container>

        <div className="container" style={{'paddingTop': '50px'}}>
          <div className="row">
            <div className="col">

              <p>Current Ingredients</p>

              <ul id="pendingIngredients">
                {currentIngredients}
              </ul>

              <Button
                onClick={() => this.saveIngredientsToRecipe()}>
                SAVE    
              </Button>
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