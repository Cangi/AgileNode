/*A page that deals with creating a form and asking for confirmation before
sending it to a database*/
/*The basics of this code is taken from https://reactjs.org/docs/forms.html */
import './index.css';
import React from 'react';
import axios from 'axios';
import server from './serverConfig'
//import ProjectsListResearcher from './projectsListResearcher';
//import {Route, Link, BrowserRouter} from "react-router-dom";
//import {HashRouter, NavLink, BrowserRouter, Route} from "react-router-dom";
//import ProjectPage from './projectPage';

class UpDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '' , downloadarray: undefined , dlfile: ''};
	this.handleDownload = this.handleDownload.bind(this);
	this.handleDelete = this.handleDelete.bind(this);
	this.handleUpload = this.handleUpload.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
	axios.get(server.serverApi + '/api/download')
	.then((response) => {
		this.setState({downloadarray: JSON.parse(response.data)});
	});
  }
  handleSubmit(event) {
	var uploadform = document.getElementById('upform');
	let upfile = new FormData(uploadform);
	axios.post(server.serverApi + '/api/upload',upfile)
	.then((response) => {
		alert(response.data);
	});
	
  }

	handleUpload(event) {
		var uploadForm = document.getElementById('upform');
		let upfile = new FormData(uploadForm);
		axios.post(server.serverApi + '/api/upload',upfile)
			.then((response)=>{
				alert(response.data);
				axios.get(server.serverApi + '/api/download')
				.then((response) => {
					this.setState({downloadarray: JSON.parse(response.data)});
				});
				if (response.data == 'File uploaded!')window.location.reload();
			});
	}
  
  handleDownload(event) {
	axios.post(server.serverApi + '/api/download2',{'nameOfFile':event.target.id}).then(()=>{
		var iframe;
	    iframe = document.getElementById("hiddenDownloader");
	    if (iframe == null) {
		    iframe = document.createElement('iframe');
		    iframe.id = "hiddenDownloader";
		    iframe.style.visibility = 'hidden';
		    document.body.appendChild(iframe);
	    }
	    iframe.src = server.serverApi + '/api/download3';
	});
  }
  handleDelete(event) {
	axios.post(server.serverApi + '/api/delete',{'nameOfFile':event.target.id}).then((response)=>{
		alert(response.data);
		axios.get(server.serverApi + '/api/download')
		.then((response) => {
			this.setState({downloadarray: JSON.parse(response.data)});
		});
		if (response.data == 'File deleted!')window.location.reload();
	});
  }
  

  renderList(){
	  if(this.state.downloadarray != undefined && this.state.downloadarray != '' ){
		    return(
			<div>
			<form id="upform" onSubmit={this.handleUpload}>
				<div class="upload-btn-wrapper">
					<button class="btn btn-primary">Browse</button>
					<input type="file" name="sampleFile"/>
				</div>
				<p> Choose a file and click on the Upload button.</p>
				<p></p>
				<button type="button" class="btn btn-primary" onClick={this.handleUpload}>Upload</button>
			</form>
			<div class="list">
				<h3>Manage files</h3>
				<button id={this.state.downloadarray[this.state.downloadarray.length-1]} onClick={this.handleDownload} class="btn btn-primary">Download Latest</button><br/>
				<button class="btn btn-primary">Other Downloads</button>
				{this.state.downloadarray.map(function(item, i){
					return (
						<div>
						<form class="list-items">
						   <span class="btn btn-primary" id={item} onClick={this.handleDownload}><img id={item} class="download-icon" src={server.serverFront+"/images/download.ico"}></img>{item}</span>
						</form>
						<form class="list-items button-list">
						   <button class="btn btn-danger" id={item} onClick={this.handleDelete} type="button">Delete</button>
						</form>
						</div>
					);
				}, this)}
				  </div></div>)
		}
		else{
			return (
				<div>
				<form id="upform" onSubmit={this.handleUpload}>
					<div class="upload-btn-wrapper">
						<button class="btn btn-primary">Browse</button>
						<input type="file" name="sampleFile"/>
					</div>
					<p> Choose a file and click on the Upload button.</p>
					<p></p>
					<button type="button" class="btn btn-primary" onClick={this.handleUpload}>Upload</button>
				</form>
				</div>
			)
		}
  }

  render() {
		return (
		<div>
			{this.renderList()}
		</div>
		);
  }
}

export default UpDown;
