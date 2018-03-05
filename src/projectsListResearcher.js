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
		this.state = ({projectData: undefined, userData: undefined, loggedin: false});
		const self = this;
		
		
		
	}
  objectRow(id) {
	  var name;
	  var username;
	  var date;
	  var staffid;
	  var projectid;
		if(this.state.projectData!=undefined) {
	   name = this.state.projectData[id].name;
	   date = this.state.projectData[id].date.split('T')[0];
	   projectid = this.state.projectData[id]._id;
	   if(this.state.userData!=undefined) {
		 username=this.state.userData.givenName + " " + this.state.userData.surname;
	   }
	  }
	  return <ProjectCard name={name}
           researcherName={username}
           dateCreated = {date}
           risSign = "false"
           researcherSign = "false"
           assocDeanSign = "false"
           deanSign = "false"
			id = {projectid}/>
		   
	}

  render() {
	  var size=0;
      var create = <div></div>;
      if (this.props.userData != undefined && !this.state.loggedin) {
          this.setState({ loggedin: true, userData: this.props.userData });
          axios.post(server.serverApi + '/api/getProjects', { user: this.props.userData }).then((response) => {

              this.setState({ projectData: response.data });
              console.log(response);
          });
      } 
	  if(this.state.projectData!=undefined) {
		  size = this.state.projectData.length;
		  create=<CreateProject />
	  }
	  
	  
    return (

			<div class="container-fluid container-content">
				<h3 class="title">Researcher Projects</h3>
        <div class="Cards">
          {[...Array(size)].map((x, i) =>
						//calls the function 5 times
						
						this.objectRow(i)
					  )}

					  
		
				</div>
				{create}
			</div>
       //passing the parameters to projectCard
    );
  }
}

export default ProjectsListResearcher;