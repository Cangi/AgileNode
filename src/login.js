import React, { Component } from 'react';
import {Route, NavLink, HashRouter} from "react-router-dom";
import MainResearcher from './MainResearcher';

class Login extends Component {
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(){
		var butt = document.getElementById("button_id");
		butt.div.setState({ showResults: false });
	}

render() {
  return (
			<HashRouter>
				<div className="Login">
				<button id = "button_id" onClick={this.handleClick}><NavLink exact to="/login">Login</NavLink></button>
				<Route path="/MainResearcher" component={MainResearcher}/>
				</div>
			</HashRouter>
		);
	}
}

export default Login;
