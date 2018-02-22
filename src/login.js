import React, { Component } from 'react';
import {Route, Link, BrowserRouter} from "react-router-dom";
import server from './serverConfig'
class Login extends Component {


render() {
	window.location.replace(server.serverApi + '/login'); 
	return (
		<div>Taking you to log in...</div>

	)
}

}

export default Login;
