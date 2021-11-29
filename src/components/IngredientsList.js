import React, { Component } from 'react';
import { Container, ButtonToolbar}  from 'react-bootstrap';

class Ingredients extends Component {
	render() {
		return (
			<Container fluid>
	          <p>click ingredients to add to recipe</p>

	          <ButtonToolbar aria-label="Toolbar with button groups">
	            {this.props.ingredients}
	          </ButtonToolbar>
	        </Container>
		)
	}
}

export default Ingredients;
