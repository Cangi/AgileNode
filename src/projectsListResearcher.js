import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'
import './index.css';
import ProjectCard from './projectCard';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';
import server from './serverConfig'
import CreateProject from './createProject'

class ProjectsListResearcher extends React.Component {
  constructor(props) {
		super(props);
		this.state = ({projectData: undefined, userData: undefined});
		const self = this;
		
		axios.get(server.serverApi + '/userdata')
	    .then((response) => {
			//if(response.data!=undefined)
			self.setState({userData: response.data});
			
		});
		axios.get(server.serverApi + '/api/getProjects')
	    .then((response) => {
			//if(response.data.givenName!=undefined)
			self.setState({projectData: response.data});
		console.log(response.data);
		});
		
	}
  objectRow(id) {
	  var name;
	  var username;
	  var date;
	  var staffid;
		if(this.state.projectData!=undefined) {
	   name = this.state.projectData[id].name;
	   date = this.state.projectData[id].date.split('T')[0];
	   if(this.state.userData!=undefined) {
		 username=this.state.userData.givenName + " " + this.state.userData.surname;
	   }
	  }
	  return <ProjectCard name={name}
           researcherName={username}
           dateCreated = {date}
           risSign = "true"
           researcherSign = "true"
           assocDeanSign = "false"
           deanSign = "false" />
	}

  render() {
	  var size=0;
	  if(this.state.projectData!=undefined) size = this.state.projectData.length;
    return (
			<div class="container-fluid container-content">
				<h3 class="title">Researcher Projects</h3>
        <div class="Cards">
          {[...Array(size)].map((x, i) =>
						//calls the function 5 times
						
						this.objectRow(i)
					  )}
					  

        </div>
			<CreateProject />
			</div>
			
       //passing the parameters to projectCard
    );
  }
}

export default ProjectsListResearcher;