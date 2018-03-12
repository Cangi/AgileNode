//import React from 'react';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Footer from './footer';
import axios from 'axios';
import './projectPage.css'
import server from './serverConfig'
import UpDown from './updown'
import CommentCard from './commentCard'
//call to local host - call to the server, pass it back to the server



class ProjectPage extends Component {
	 constructor(props) {
    super(props);
    this.state = { value: '', comment:'',  project: undefined, userData: JSON.parse(localStorage.getItem('userData')),value:'', downloadArray: undefined, dfile:'',department: ''};
    axios.post(server.serverApi + '/api/getProject', { idOfTheProject: this.props.location.pathname.split(':')[1], user: this.state.userData }).then((response) => {this.setState({project: response.data})});
	axios.get(server.serverApi + '/api/downloadList').then((response)=>{
		this.setState({downloadArray:JSON.parse(response.data)});
	});
		axios.post(server.serverApi + '/api/getDepartment', {user: this.state.userData }).then((response) => {this.setState({department: response.data})});
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
		this.handleUpload = this.handleUpload.bind(this);
		this.handleDownload = this.handleDownload.bind(this);
		this.handleSubmitComment = this.handleSubmitComment.bind(this);
		this.handleChangeComment = this.handleChangeComment.bind(this);
	//console.log(this.props);
	//console.log();

  }

	objectRow(id) {
		var name;
		var date;
		var comment;

		if(this.state.project!=undefined && this.state.userData != undefined) {
			 name = this.state.userData.displayName;
			 date = this.state.project.date.split('T')[0] + " " + this.state.project.date.split('T')[1];
			 comment = this.state.project.comments[id].comment;
		}

		return <CommentCard name={name}
				 comment={comment}
				 dateCreated = {date}/>
	}

  handleChange(event) {
    this.setState({value: event.target.value});
  }

	handleChangeComment(event){
		this.setState({comment: event.target.value});
	}

  handleSubmit(event) {
    axios.post(server.serverApi + '/api/signProject', { idOfTheProject: this.props.location.pathname.split(':')[1], user: this.state.userData,signiture:this.state.value });
  }

	handleSubmitComment(event) {
	    axios.post(server.serverApi + '/api/addComment', {comment:this.state.comment , idOfTheProject: this.props.location.pathname.split(':')[1], user: this.state.userData.displayName});
			this.setState({comment:'' });
		}

  handleUpload(event) {
		var uploadForm = document.getElementById('upform');
		let upfile = new FormData(uploadForm);
		axios.post(server.serverApi + '/api/upload',upfile)
			.then((response)=>{
				alert(response.data);
			});
	}
	handleDownload(event) {
		axios.post(server.serverApi + '/api/downloadFile',{'nameOfFile':this.state.project.name}).then(()=>{
		var iframe;
		iframe = document.getElementById('hiddenIframe');
		if(iframe == null){
			iframe = document.createElement('iframe');
			iframe.id = 'hiddenIframe';
			iframe.style.visibility = 'hidden';
			document.body.appendChild(iframe);
		}
		iframe.src = server.serverApi + 'api/downloadFile';
	});
}
//  getData(){
  //  axios.get(URLofDatabase$)
//  }


  render() {

	  var projectName;
	  var researcherName;
	  var date;
		var button;
		var size = 0;

	  if(this.state.project != undefined) {
		  console.log(this.state.department + ":" + this.state.project.RISSigned);
		  projectName = this.state.project.name;
		  date = this.state.project.date.split('T')[0];
			size = this.state.project.comments.length;
		  if(this.state.userData != undefined) {
				researcherName = this.state.userData.givenName + " " + this.state.userData.surname;
				if(this.state.department == 'researcher' && this.state.project.RISSigned == undefined && this.state.project.readyForRIS == undefined){
					button = <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">Send to RIS</button>
				} else if(this.state.department == 'researcher' && this.state.project.RISSigned == undefined && this.state.project.readyForRIS == true){
					button = <button type="button" class="btn btn-primary" >Waiting for RIS</button>
				}else if(this.state.department == 'researcher' && this.state.project.RISSigned == true && this.state.project.readyForRIS == true && this.state.project.researcherSigned == undefined){
					button = <button type="submit" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">Sign document</button>
				}else if(this.state.department == 'researcher' && this.state.project.RISSigned == true && this.state.project.readyForRIS == true && this.state.project.researcherSigned == true){
					button = <button type="submit" class="btn btn-primary">Waiting for Dean/Associate Dean</button>
				}
				if(this.state.department != 'researcher' ){
					button = <button type="submit" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">Sign document</button>
				}
		  }
	  }


    return(
          <body>
		  <div class="container">
			<div class="jumbotron">
				<h1 class="display-3">{projectName}</h1>
				<p class="lead">By {researcherName}</p>
			</div>

			 <div class="row marketing">
				<div class="col-lg-6">
					<h3>Project details</h3>
					<p>Date created: {date}</p>
					<p>Date last updated: {date}</p>
					<p>Last Edited: {date}</p>
					<p>User who edited it: {researcherName}</p>
				</div>
				
				<div class="col-lg-6">
					<h3>Options</h3>
					<form id="upform" onSubmit={this.handleUpload}>
								<button type="button" class="btn btn-primary" onClick={this.handleUpload}>Upload</button>
								<input type="file" name="sampleFile"/><p></p>
					</form>
					<UpDown />
					<p></p>
				</div>
			</div>
			
			<div class="row marketing">
				<div class="col-lg-6">
				{[...Array(size)].map((x, i) =>
						//calls the function as many times as needed

						this.objectRow(i)
						)}
						<form>
							<div class="form-group">
							<div class="form-group">
							<label for="Comment">Leave a comment here!</label>
							<textarea rows="4" cols="1" type="comment" class="form-control" id="Comment" value={this.state.comment} onChange={this.handleChangeComment} placeholder="Comment"/>
							</div>
							<div class="form-check">
							</div>
							<button type="button" class="btn btn-primary" onClick={this.handleSubmitComment}>Submit</button>
							</div>
						</form>
				</div>
				
				<div class="col-lg-6">
					<h3>Digital signature</h3>
									{button}
							<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
								<div class="modal-dialog modal-dialog-centered" role="document">
									<div class="modal-content">
											<div class="modal-body">
												<form onSubmit={this.handleSubmit}>
														<label for="inputID">Please enter your ID
														<input type="number" class="form-control" value={this.state.value} onChange={this.handleChange}/>
														</label>
														<div class="modal-footer">
															<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
															<button type="submit" class="btn btn-primary">Sign</button>
														</div>
												</form>
											</div>
									</div>
								</div>
							</div>
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
