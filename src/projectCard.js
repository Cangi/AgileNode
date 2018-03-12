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
		this.state = {linkTo: '/projectPage',};
	}
render() {
  if(this.props.risSign==true){
	var risSign = <img class="checkbox" src='images/greencheckbox.png'></img>;
  }
  else {
	var risSign = <img class="checkbox" src='images/redcheckbox.png'></img>;
  }

  if(this.props.researcherSign==true){
	var resSign = <img class="checkbox" src='images/greencheckbox.png'></img>;
  }
  else {
	var resSign = <img class="checkbox" src='images/redcheckbox.png'></img>;
  }

  if(this.props.assocDeanSign==true){
	var assoSign = <img class="checkbox" src='images/greencheckbox.png'></img>;
  }
  else {
	var assoSign = <img class="checkbox" src='images/redcheckbox.png'></img>;
  }

  if(this.props.deanSign==true){
	var deanSign = <img class="checkbox" src='images/greencheckbox.png'></img>;
  }
  else {
	var deanSign = <img class="checkbox" src='images/redcheckbox.png'></img>;
  }

  return(
	  <div class="card card-custom">
        <div class="card-header card-header-custom">
        {this.props.name}
        </div>
        <div class="card-body">
          <h4 class="card-title">By {this.props.researcherName}</h4>
          <p class="card-text">
              Created : {this.props.dateCreated}
			  </p>
			  <p class="centered">
              Signatures:
			  <span class="badge badge-warning badge-custom">RIS {risSign}</span>
			  <span class="badge badge-warning badge-custom">Researcher {resSign}</span>
			  <span class="badge badge-warning badge-custom">Associate Dean {assoSign}</span>
			  <span class="badge badge-warning badge-custom">Dean {deanSign}</span>
            </p>

          <button class="btn" onClick={()=> window.location = front.serverFront + '/projectPage/:' + this.props.id}>Project Page</button>

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
