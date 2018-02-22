//import React from 'react';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Footer from './footer';
import axios from 'axios';
import './projectPage.css'

//call to local host - call to the server, pass it back to the server



class ProjectPage extends Component {

//  getData(){
  //  axios.get(URLofDatabase$)
//  }
  render() {
    return(
          <body>
            <div class = 'page'>
              <h1 class="display-1">{this.props.name}</h1>
              <h2 class="display-2">By {this.props.researcherName}</h2>
              <p>Date Created: {this.props.dateCreated}</p>
              <p>Date Last Updated: 02/02/2002</p> //need to add this by quering when upload was last used
              <button type="button" class="btn btn-primary">Upload</button>
              <button type="button" class="btn btn-primary">Download latest</button>
              <p>Small picture/snapshot of excel file</p>
              <p>Signed : RIS = {this.props.risSign}
                       Researcher = {this.props.researcherSign}
                       Associate Dean = {this.props.assocDeanSign}
                       Dean = {this.props.dean}//diplays the state of the signatures

              </p>
              <h3>Comments</h3>
              <p>Comment box</p>
            </div>
          </body>

    )
  }
  function tick() //changes the word "true" to a green tick and false to a x
  {

  }
}


export default ProjectPage;
