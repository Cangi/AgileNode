//import React from 'react';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Footer from './footer';
import axios from 'axios';
import './projectPage.css'

//call to local host - call to the server, pass it back to the server



class ProjectPage extends Component {
	 constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Signed now bo$$! ' + this.state.value);
    event.preventDefault();
  }

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
						<h2>Last update</h2>
						<p>Last Edited: 01/01/2001</p>
						<p>User who edited it: Radu</p>
					</div>
					<div class="column">
						<h2>Digital signature</h2>
						<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">Sign this document</button>
							<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
							<div class="modal-dialog modal-dialog-centered" role="document">
							<div class="modal-content">
								<div class="modal-body">
									<form onSubmit={this.handleSubmit}>
									<label for="inputID">Please enter your ID
									<input type="number" class="form-control" value value={this.state.value} onChange={this.handleChange}/>
									</label>
									</form>
								</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
								<button type="button" class="btn btn-primary">Sign</button>
							</div>
							</div>
							</div>
							</div>
					</div>
				</div>
				
				<div class="row">
					<div class="column">
						<h2>Comments to be implemented.</h2>
					</div>
				</div>
			</div>
			{/*
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
			*/}
          </body>

    )
  }

}


export default ProjectPage;
