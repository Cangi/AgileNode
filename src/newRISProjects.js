import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'
import './index.css';
import ProjectCard from './projectCard';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';
import server from './serverConfig';


class NewRISProjects extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({projectData: undefined, userData: undefined, loggedin: false });
    const self = this;
  }

  objectRow(id) { //id is the project ID
    var name;
    var username;
    var date;
    var staffid;
    var projectid;
    var ris;
    var researcher;
    var assocDean;
    var dean;
    if(this.state.projectData!=undefined) {
       name = this.state.projectData[id].name;
       date = this.state.projectData[id].date.split('T')[0];
       projectid = this.state.projectData[id]._id;
       ris = this.state.projectData[id].RISSigned;
       researcher = this.state.projectData[id].researcherSigned;
       assocDean = this.state.projectData[id].associateDeanSigned;
       dean = this.state.projectData[id].deanSigned;

       if(this.state.userData!=undefined) {
         username=this.state.userData.givenName + " " + this.state.userData.surname;
      }
    }
    return <ProjectCard name={name}
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
        axios.post(server.serverApi + '/api/getRISNewProjects', {user: this.props.userData}).then((response) => {
            //should return all projects that have been readied for RIS
            this.setState({ projectData: response.data });
            console.log(response);
        });
      }
   if(this.state.projectData!=undefined) {
     size = this.state.projectData.length;

   }
   return (
     <div class="container-fluid container-content">
       <h3 class="title"> RIS Projects View</h3>
       <div class="card_container">
       {/*<a onClick={()=> window.location = front.serverFront + '//:' + this.props.id}>Project*/}
         <div class="Cards">
           {[...Array(size)].map((x, i) =>
           /*calls the function as many times as needed*/

             this.objectRow(i)
           )}



         </div>
       </div>
     </div>
      /*passing the parameters to projectCard*/
   );
  }
}

export default NewRISProjects