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
			<div class="full-image-background">
				<div class="landingPage">
					<h2 class="landingPageFont font-w-700 letter-spacing-2 m-0 mt-3 text-uppercase text-white title-xs-extra-large title-sm-extra-large-3 title-extra-large-4">UNIVERSITY OF DUNDEE MAKES RESEARCH EASIER.</h2>
				</div>
			</div>
		);
    }
}

export default LandingPage;