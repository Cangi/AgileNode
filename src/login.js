import React, { Component } from 'react';
import {Route, NavLink, HashRouter} from "react-router-dom";
import MainResearcher from './mainResearcher';

class Login extends Component {
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	
	handleClick(){
		//var butt = document.getElementById("button_id");
		//butt.div.setState({ showResults: false });
		var x = document.getElementById('button_id');
		x.style.display = 'none';
	}

render() {
  return (
			<HashRouter>
				<div className="Login">
				<button id = "button_id" onClick={this.handleClick}>
				<NavLink exact to="/mainResearcher">Login</NavLink></button>
				<Route path="/mainResearcher" component={MainResearcher}/>
				</div>
			</HashRouter>	
		);
	}
}

export default Login;