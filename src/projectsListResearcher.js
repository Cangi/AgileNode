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
	  var name, username, date, staffid, projectid, readyRis, ris, researcher, assocDean, dean;
    if(this.state.projectData!=undefined) {
       name = this.state.projectData[id].name;
       date = this.state.projectData[id].date.split('T')[0];
       projectid = this.state.projectData[id]._id;
       readyRis = this.state.projectData[id].readyForRIS;
       ris = this.state.projectData[id].RISSigned;
       researcher = this.state.projectData[id].researcherSigned;
       assocDean = this.state.projectData[id].associateDeanSigned;
       dean = this.state.projectData[id].deanSigned;

       if(this.state.userData!=undefined) {
         username=this.state.userData.givenName + " " + this.state.userData.surname;
      }
    }
    return <ProjectCard name={name}
         readyRis={readyRis}
         researcherName={username}
         dateCreated = {date}
         risSign = {ris}
         researcherSign = {researcher}
         assocDeanSign = {assocDean}
         deanSign = {dean}
         id = {projectid}/>
  }

  render() {
	  var size=0;
      if (this.props.userData != undefined && !this.state.loggedin) {
          this.setState({ loggedin: true, userData: this.props.userData });
          axios.post(server.serverApi + '/api/getProjects', { user: this.props.userData }).then((response) => {
              this.setState({ projectData: response.data });
          });
      }
	  if(this.state.projectData!=undefined) {
		  size = this.state.projectData.length;

	  }
      var create = <CreateProject />

    return (
			<div class="container-fluid container-content">
				<h3 class="title">Researcher Projects</h3>
        <div class="Cards">
          {[...Array(size)].map((x, i) =>
						this.objectRow(i)
					)}
				</div>
				{create}
			</div>
    );
  }
}

export default ProjectsListResearcher;
