import React, { Component } from 'react';
import './App.css';
import { Route, NavLink, HashRouter, Link } from "react-router-dom";
import MainResearcher from './MainResearcher';

class Login extends Component {
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.state = {
			showComponent: true
		}
	}
	
	handleClick(){
		//var foobar = document.getElementById("button_id");
		//foobar.div.setState({ showResults: false });
		//this.setState{showResults: false};
		//this.props.isHidden ? null : <Login />;
		//this.setState({showComponent: !this.state.showComponent})
		//this.state.showComponent && <Login />
	}

render() {
  return (
			<HashRouter>
				<div className="Login">
				<button id = "button_id" onClick={this.handleClick}>
					<NavLink exact to="/MainResearcher">Login</NavLink>
				</button>		
				<Route path="/MainResearcher" component={MainResearcher}/>
				</div>
			</HashRouter>	
		);
	}
}

export default Login;