import React, { Component } from 'react';
import logo from './logo.svg';
import {Route, NavLink, BrowserRouter, Link} from "react-router-dom";
import CreateProjectFile from './createProjectFile';
import axios from 'axios';
import server from './serverConfig'
import front from './serverConfig'
class NavBar extends Component {
	constructor(props) {
		super(props);
		this.state = ({name: "", loggedin: false, userData: undefined});
		const self = this;
		
		
		/*axios.get(server.serverApi + '/userdata')
	    .then((response) => {
            console.log(response.data);
            });*/
        
		
		
	}
	
    render() {
        /*if (sessionStorage.userData != undefined && !this.state.loggedin) {
            console.log(JSON.parse(sessionStorage.userData));
            //console.log("hi");
            let ob = JSON.parse(sessionStorage.userData);
            this.setState({ name: "Welcome " + ob.displayName, loggedin: true, userData: ob });
        }
        else {
            console.log("USERDATA UNDEFINED");
            
        }*/
	if(this.props.userData!=undefined && !this.state.loggedin) {
			this.setState({name: "Welcome " + this.props.userData.displayName, loggedin: true, userData: this.props.userData});
	} 
	var loginButton;
	var userIMG;
	if(this.state.loggedin == false) {
		loginButton = <button type="button" class="btn btn-light" onClick={() => this.setState({disconnected: false})}><Link to="/login">Login</Link></button>
	} else {

		loginButton = <button type="button" class="btn btn-light" onClick={() => this.setState({name: "", loggedin: false, userData: undefined})}><Link to="/disconnect">Logout</Link></button>
		userIMG = <img class="avatar" src={front.serverFront + "/images/avatar_male.png"}></img>
		
	}
	
	
   return (
			<div class="container-fluid container-navbar">
				<nav class="navbar-custom navbar navbar-expand-sm navbar-light">
					<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#nav-content" aria-controls="nav-content" aria-expanded="false" aria-label="Toggle navigation">
						<span class="navbar-toggler-icon"></span>
					</button>

					<a class="navbar-brand" href="/index"><img class="dundee-logo" src={front.serverFront + "/images/university_logo.png"}></img></a>

					<div class="collapse navbar-collapse justify-content-end" id="nav-content">  
					
					<ul class="navbar-nav">
					<li class="nav-item">
						<span class="navbar-text">{this.state.name} {userIMG}</span>
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
