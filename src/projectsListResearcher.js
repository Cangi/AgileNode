import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'
import './index.css';
import ProjectCard from './projectCard';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';
import server from './serverConfig'

class ProjectsListResearcher extends React.Component {
  constructor(props) {
		super(props);
		this.state = ({projectData: undefined});
		const self = this;
		axios.get(server.serverApi + '/api/getProjects')
	    .then((response) => {
			//if(response.data.givenName!=undefined)
			self.setState({projectData: response.data});
		});
		/*axios.get('http://localhost:3000/api/getProjects')
	    .then((response) => {
			//if(response.data!=undefined)
			self.setState({projectData: response});
		});
		console.log(this.state.projectData);*/
	}
  objectRow(id) {
		var name;
	  var date;
	  var staffid;
		if(this.state.projectData!=undefined) {
	   name = this.state.projectData[id].name;
	   date = this.state.projectData[id].date;
	   staffid = this.state.projectData[id].researcherStaffID;
	  }
	}

  render() {
    return (
			<div class="container-fluid container-content">
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