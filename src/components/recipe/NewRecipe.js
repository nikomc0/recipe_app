import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

class RecipeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      time: '',
      redirectToReferrer: false,
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({
      name: event.target.value
    });
  }

  handleTimeChange(event) {
    this.setState({
      time: event.target.value
    });
  }

  handleSubmit(event) {
    debugger;
    this.props.newRecipe(this.state)

    event.preventDefault();
  }

  render() {
    const redirectToReferrer = this.state.redirectToReferrer;
      if (redirectToReferrer) {
      return (
        <Redirect 
          to={{
            pathname: `/new-new`, 
            state: {recipe: this.state}
          }}
        />
      )
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="col-4">
          <div className="mb-3">
            <label htmlFor="recipeName" className="form-label">Name</label>
            <input type="text" className="form-control" id="recipeName" placeholder="ex. Spaghetti" value={this.state.name} onChange={this.handleNameChange}/>
          </div>
          <button type="submit" value="Submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    );
  }
}

export default RecipeForm;