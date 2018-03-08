import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ProjectsListResearcher from './projectsListResearcher'
import CreateProject from './createProject'
import SignUp from './signUp'
import Login from './login'
import ProjectPage from './projectPage'
import server from './serverConfig'

class LandingPage extends React.Component {
    render() {
		return(
			<div>
			<p>Radoo</p>
			</div>
		);
    }
}

export default LandingPage;