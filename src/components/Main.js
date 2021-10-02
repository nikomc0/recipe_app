import React from 'react';
import Nav from './Nav';
import Recipes from './recipe/Recipes'

class Main extends React.Component {
  render(){
    return (
      <div>
        <Nav />
        <Recipes />
      </div>
    )
  }

}

export default Main;
