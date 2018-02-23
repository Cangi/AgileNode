import './index.css';
import React from 'react';
import { Link } from 'react-router-dom'
import ProjectPage from './projectPage';

class ProjectCard extends React.Component {
render() {
  return(
      <div class="card">
        <div class="card-header">
        {this.props.name}
        </div>
        <div class="card-body">
          <h4 class="card-title">By {this.props.researcherName}</h4>
          <p class="card-text">
              Created : {this.props.dateCreated}
			  </p>
			  <p>
              Signed : RIS = {this.props.risSign} Researcher = {this.props.researcherSign} Associate Dean = {this.props.assocDeanSign} Dean = {this.props.deanSign} 
            </p>
          <button><Link to="/projectPage">Project Page</Link></button>
        </div>

    </div>

  )
  }
}
//displays the project name
//displays the researchers name who created the project
//the date the project was created
//diplays the state of the signatures

export default ProjectCard;