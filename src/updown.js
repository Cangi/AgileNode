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
    this.handleSubmit = this.handleSubmit.bind(this);
	this.handleDownload = this.handleDownload.bind(this);

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

  handleDownload(event) {
	axios.post(server.serverApi + '/api/download2',{'nameOfFile':event.target.textContent}).then(()=>{
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

  renderList(){
	  if(this.state.downloadarray){
		  return(
			<div class="list">
				{this.state.downloadarray.map(function(item, i){
					return (
						<form class="list-items" onSubmit={this.handleDownload}>
						   <span class="btn btn-primary" id={i} onClick={this.handleDownload}><img class="download-icon" src={server.serverFront+"/images/download.ico"}></img>{item}</span>
						</form>
					);
				}, this)}
				  </div>)
			  }
			  return (
				<div>
			</div>
		)
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
