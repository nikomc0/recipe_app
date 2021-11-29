import React, { Component } from 'react';
import Spinner from 'react-bootstrap/Spinner'

class CurrentIngredients extends Component {
	render() {
    let currentIngredients = this.props.currentIngredients
          .filter((x) => x.addedToRecipe === true)
          .map((x) => <li key={x.id}>{x.name}</li>);

		return (
			<>
        <p>Current Ingredients</p>

        <ul id="pendingIngredients">
          {
            this.props.currentIngredients.length > 0 ? 
              currentIngredients 
              :
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
          }
        </ul>
      </>
		)
	}
}

export default CurrentIngredients;
