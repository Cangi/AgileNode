import React, { Component } from 'react';
import {Route, Link, BrowserRouter} from "react-router-dom";
import MainResearcher from './mainResearcher';

class Login extends Component {
	constructor(props){
		super(props);
		this.state = {
			shown : true
		}
	}
	


render() {
  return (
			<BrowserRouter>
				<div className="Login">
				<button id = "button_id" onClick={()=>this.setState({shown:false})}>
				<Link exact to="/mainResearcher">Login</Link></button>
				<Route path="/mainResearcher" component={MainResearcher}/>
				</div>
			</BrowserRouter>	
		);
		
	}
}

export default Login;