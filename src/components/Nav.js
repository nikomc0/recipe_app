import React from 'react';
import Title from './Title';

class Nav extends React.Component {
	render(){
		return (
	    <nav className="navbar navbar-expand-lg navbar-light bg-light">
				<div className="container-fluid">
				  <Title className="navbar-brand" href="/" />
				  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
				    <span className="navbar-toggler-icon"></span>
				  </button>
				  <div className="collapse navbar-collapse" id="navbarNav">
				    <ul className="navbar-nav">
				      <li className="nav-item">
				        <a className="nav-link" href="/ingredients">Ingredients</a>
				      </li>
				    </ul>
				  </div>
				</div>
			</nav>
		)
	}
}

export default Nav;
