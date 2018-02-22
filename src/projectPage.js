//import React from 'react';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Footer from './footer';
import registerServiceWorker from './registerServiceWorker';
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
			<div class = "page">
				<div class="row">
					<div class="column">
						<h1>Name of Project</h1>
						<p>Insert information here.</p>
					</div>
					<div class="column">
						<h1>Name of Head Researcher</h1>
					<p>Insert information here.</p>
					</div>
					<div class="column">
						<h2>Details</h2>
						<p>Date created: 01/01/2001</p>
						<p>Date Last Updated: 02/02/2002</p>
					</div>
				</div>
				
				<div class="row">
					<div class="column">
					<button type="button" class="btn btn-primary">Upload</button><p></p>
					<button type="button" class="btn btn-primary">Download latest</button>
					<p></p>
					<p>Small picture/snapshot of excel file</p>
					</div>
					<div class="column">
						<h2>Last update:</h2>
						<p>Last Edited: 01/01/2001</p>
						<p>User who edited it: Radu</p>
					</div>
				</div>
				
				<div class="row">
					<div class="column">
						<h2>Comments to be implemented.</h2>
					</div>
				</div>	
			</div>
          </body>

    )
  }
}


export default ProjectPage;
