import React, { Component } from 'react';
import logo from './logo.svg';
import {Route, NavLink, BrowserRouter, Link} from "react-router-dom";
import CreateProjectFile from './createProjectFile';
import axios from 'axios';

class NavBar extends Component {
	constructor(props) {
		super(props);
		this.state = ({name: "Please log in!", loggedin: false, userData: undefined});
		const self = this;
		axios.get('http://localhost:3000/userdata')
	    .then((response) => {
			if(response.data.givenName!=undefined)
			self.setState({name: "Welcome " + response.data.givenName, loggedin: true, userData: response.data});
		});
		
	}
	
 render() {
	
	var loginButton;
	var userIMG;
	if(this.state.loggedin == false) {
		loginButton = <button><Link to="/login">Login</Link></button>
		
	} else {
		userIMG = <img class="avatar" src="images/avatar_male.png"></img>
	}
	
	
   return (
			<div class="container-fluid">
				<nav class="navbar-custom navbar navbar-expand-sm navbar-light">
					<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#nav-content" aria-controls="nav-content" aria-expanded="false" aria-label="Toggle navigation">
						<span class="navbar-toggler-icon"></span>
					</button>

					<a class="navbar-brand" href="/"><img class="dundee-logo" src="https://www.pslteamsports.com/assets/images/ClubShops/UoD/University%20of%20Dundee%20(logo).png"></img></a>

					<div class="collapse navbar-collapse justify-content-end" id="nav-content">  
					
					<ul class="navbar-nav">
					<li class="nav-item">
						<span class="navbar-text">{this.state.name}! {userIMG}</span>
					</li>
					
					<li class="nav-item">
					{loginButton}
					</li>
					
					</ul>
					</div>
				</nav>
			</div>
   );
 }
}

export default NavBar;
