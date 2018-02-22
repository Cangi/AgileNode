import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'
import './index.css';
import ProjectCard from './projectCard';
import registerServiceWorker from './registerServiceWorker';


class ProjectsListResearcher extends React.Component {
  render() {
    return (
			<div class="container-fluid">
				<h3 class="">Researcher Products</h3>
        <button><Link to="/projectPage">Project Page</Link></button>
        <div class="Cards">
          <ProjectCard name="Improving Displays for colour blind people"
           researcherName="Paulius Kuzmiskas"
           dateCreated = "22/02/2018"
           risSign = "true"
           researcherSign = "true"
           assocDeanSign = "false"
           deanSign = "false" />

        </div>
			</div>
       //passing the parameters to projectCard
    );
  }
}

export default ProjectsListResearcher;
