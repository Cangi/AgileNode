import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';
import server from './serverConfig';
import NewRISProjects from './newRISProjects';
import CompleteRISProjects from './completeRISProjects'
import InProcessRISProjects from './inProcessRISProjects'

class ProjectListRIS extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
			<div>
				<ProjectListRIS>
            <Switch> //switchs out what the content is based on the paths
                <Route path = '/newRISProjects' component = {NewRISProjects}/>
                //the projects that are completely new - no RIS interaction has taken place
                <Route path = '/completeRISProjects' component = {CompleteRISProjects}/>
                //the projects that have been signed off by RIS
                <Route path = '/inProcessRISProjects' component = {InProcessRISProjects}/>
                //the projects that have been picked up by an RIS staff member
            </Switch>

        <ProjectListRIS/>
			</div>
		);
	}
}

export default ProjectListRISa
