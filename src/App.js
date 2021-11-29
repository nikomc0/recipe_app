import React from 'react';
import { Route, Switch, withRouter } from "react-router-dom"
import Main from './components/Main'
import RecipeCreate from './components/recipe/RecipeCreate'
import Nav from './components/Nav'
import NewRecipe from './components/recipe/NewRecipe'

import './App.css';

class App extends React.Component {
  render(){
  return (
    <div className="App-header">
      <Nav />
      <Switch>
        <Route 
          path="/new-recipe" 
          component={NewRecipe}>
          <RecipeCreate />
        </Route>
        <Route
          path="/:recipe"
          component={RecipeCreate}>
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </div>
  )};
}

export default withRouter(App);
