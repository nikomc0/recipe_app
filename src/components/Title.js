import React from 'react';
import { Link } from 'react-router-dom';

var title = 'Grocery Helper'

class Title extends React.Component {

  render() {
    return <Link to="/">{title}</Link>;
  }
}

export default Title;