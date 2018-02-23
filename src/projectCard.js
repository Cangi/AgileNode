import './index.css';
import React from 'react';
import { Link } from 'react-router-dom'
import ProjectPage from './projectPage';
import server from './serverConfig'
import axios from 'axios'
import front  from './serverConfig'

class ProjectCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {linkTo: '/projectPage'};
	}
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
          <button onClick={()=> window.location = front.serverFront + '/projectPage/:' + this.props.id}>Project Page</button>
        </div>
		
    </div>

  )
  }
}
//axios.post(server.serverApi + '/api/getProject',{ idOfTheProject: this.props.name }).then((response) => {
//<Link to={this.state.linkTo}>Project Page</Link>
//displays the project name
//displays the researchers name who created the project
//the date the project was created
//diplays the state of the signatures

export default ProjectCard;