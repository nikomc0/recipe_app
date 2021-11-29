import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class AddIngredient extends Component {
	constructor(props) {
		super(props)
		this.state = {
			newIngredient: "",
		}

		this.handleIngredientChange = this.handleIngredientChange.bind(this);
		this.addToRecipe 			= this.addToRecipe.bind(this);
		this.clearNewIngredient 	= this.clearNewIngredient.bind(this);
	}

	handleIngredientChange(event) {
		this.setState({
			newIngredient: event.target.value
		});
	}

	addToRecipe(){
		var ingredient = this.state.newIngredient;
		console.log(ingredient)

		this.props.addToCurrentRecipe(ingredient);
		this.clearNewIngredient();
		return;
	}

	clearNewIngredient(){
		this.setState({newIngredient: ""})
	}


	render() {
		return (
			<div className="col">
              <div className="row">
                <p>Ingredient not listed? Add it manually</p>
              </div>
              <div className="row">
                <div className="col">
                  <input id="ingredientToAdd" type="text" name="ingredient" value={this.state.newIngredient} onChange={(e) => this.handleIngredientChange(e)}></input>
                </div>
                <div className="col">
                  <Button className="btn btn-light" onClick={this.addToRecipe}>ADD</Button>
                </div>
              </div>
            </div>
		)
	}
}

export default AddIngredient;
