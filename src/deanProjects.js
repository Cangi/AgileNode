import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'
import './index.css';
import ProjectCard from './projectCard';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';
import server from './serverConfig';


class DeanProjects extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({projectData: undefined, userData: undefined, loggedin: false, department:undefined});
    //ProjectQuery changes what projects are displayed
    //reRender determines if it needs to reRender
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
    var readyRis;
    if(this.state.projectData!=undefined) {
      this.handleInProcessPro
       name = this.state.projectData[id].name;
       date = this.state.projectData[id].date.split('T')[0];
       projectid = this.state.projectData[id]._id;
       ris = this.state.projectData[id].RISSigned;
       researcher = this.state.projectData[id].researcherSigned;
       assocDean = this.state.projectData[id].associateDeanSigned;
       dean = this.state.projectData[id].deanSigned;
readyRis = this.state.projectData[id].readyForRIS;
username = this.state.projectData[id].researcherName;
    }
    return <ProjectCard name={name}
         researcherName={username}
         dateCreated = {date}
         risSign = {ris}
         readyRis = {readyRis}
         researcherSign = {researcher}
         assocDeanSign = {assocDean}
         deanSign = {dean}
         id = {projectid}/>
  }

  render() {
    var size=0;

    if (this.props.userData != undefined && !this.state.loggedin) {
        this.setState({ loggedin: true, userData: this.props.userData });
        axios.post(server.serverApi + '/api/getDepartment', {user: JSON.parse(localStorage.getItem('userData'))}).then((response) => {this.setState({department: response.data})});

        }

        if(this.state.department != undefined && this.state.projectData == undefined){
              axios.post(server.serverApi + '/api/getDeanProjects', {user: this.props.userData, department: this.state.department}).then((response) => {
                //should return the projects that RIS and the researcher signed - only the ones that the user hasn't signed yet
                this.setState({ projectData: response.data });
              });
        }
   if(this.state.projectData!=undefined) {
     size = this.state.projectData.length;

   }
   return (
     <div class="container-fluid container-content">
       <h3 class="title"> List of Projects needing Signed</h3>
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

export default DeanProjects
