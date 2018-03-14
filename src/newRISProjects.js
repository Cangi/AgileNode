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
    this.state = ({projectData: undefined, userData: undefined, loggedin: false, projectQuery:"new", reRender:true });
    //ProjectQuery changes what projects are displayed
    //reRender determines if it needs to reRender
    const self = this;
    this.handleNewProjects = this.handleNewProjects.bind(this);
    this.handleInProcessPro = this.handleInProcessPro.bind(this);
    this.reRenderTrue = this.reRenderTrue.bind(this);
    this.reRenderFalse = this.reRenderFalse.bind(this);
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
       assocDean = this.state.projectData[id].associateDeanSigned;
       dean = this.state.projectData[id].deanSigned;
       researcher = this.state.projectData[id].researcherName;
       readyRis = this.state.projectData[id].readyForRIS;
    }
    return <ProjectCard name={name}
        researcherName={researcher}
        dateCreated={date}
        readyRis={readyRis}
         risSign = {ris}
         researcherSign = {researcher}
         assocDeanSign = {assocDean}
         deanSign = {dean}
         id = {projectid}/>
  }

  reRenderTrue(){this.setState({reRender:true})} //changes the values of reRender so we can say for it rerender the page
  reRenderFalse(){this.setState({reRender:false})}


  handleNewProjects(){
    this.setState({projectQuery:"new"});
    console.log("Changed to new");
    this.reRenderTrue(); //change to true so the cards can be rerendered
    this.forceUpdate();
  }

  handleInProcessPro(){
    this.setState({projectQuery:"inProcess"});
    console.log("Changed to in process");
    this.reRenderTrue();
    this.forceUpdate();

  }




  render() {
    var size=0;
    console.log(this.props.projectQuery);

    if (this.state.reRender == true) {
        this.setState({ loggedin: true, userData: this.props.userData });
        
        this.reRenderFalse(); //changes reRender value to false so it can only rerender after a button is clicked
        if (this.state.projectQuery == "inProcess") {
            console.log("get into in process");
            axios.post(server.serverApi + '/api/getRISInProcessProjects', { user: this.props.userData }).then((response) => {
                //should return the projects the ris member have assigned themselves to
                this.setState({ projectData: response.data });
                console.log(response);
            });
        }
        else if (this.state.projectQuery == "new") {

            axios.get(server.serverApi + '/api/getRISNewProjects').then((response) => {
                //should return all projects that have been readied for RIS
                this.setState({ projectData: response.data });
                console.log(response);
            });
        }
      }
        



    
   if(this.state.projectData!=undefined) {
     size = this.state.projectData.length;

   }
   return (
     <div class="container-fluid container-content">
       <h3 class="title"> RIS Projects View</h3>
       <div class="buttons">
        <button type="button" class="btn btn-primary" onClick={this.handleNewProjects}>New Projects</button>
        <button type="button" class="btn btn-primary" onClick={this.handleInProcessPro}>In process projects</button>
       </div>
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
