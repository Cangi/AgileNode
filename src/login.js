import React, { Component } from 'react';
import {Route, Link, BrowserRouter} from "react-router-dom";
import server from './serverConfig'
import LandingPage from './landingPage'
class Login extends Component {


render() {
	window.location.replace(server.serverApi + '/login'); 
    return (
        
        <div class="full-image-background">
            <div class="spinner"></div>
            <div class="landingPage">
                <h2 class="landingPageFont font-w-700 letter-spacing-2 m-0 mt-3 text-uppercase text-white title-xs-extra-large title-sm-extra-large-3 title-extra-large-4">UNIVERSITY OF DUNDEE MAKES RESEARCH EASIER.</h2>
            </div>
        </div>
        
        
	)
}

}

export default Login;
