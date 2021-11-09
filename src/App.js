import React from 'react';
import { Route, Switch, withRouter } from "react-router-dom"
import Main from './components/Main'
import RecipeCreate from './components/recipe/RecipeCreate'
import Nav from './components/Nav'

import './App.css';

function App() {
  return (
    <div className="App-header">
      <Nav />
      <Switch>
        <Route path="/new-recipe">
          <RecipeCreate />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </div>
  );
}

export default withRouter(App);
