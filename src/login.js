import React, { Component } from 'react';
import {Route, Link, BrowserRouter} from "react-router-dom";

class Login extends Component {
	

render() {
	window.location.replace("http://ec2-35-160-181-71.us-west-2.compute.amazonaws.com:3000/login"); 
	return (
		<div>Taking you to log in...</div>
		
	)
}

}

export default Login;
