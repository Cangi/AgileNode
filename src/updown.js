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
    this.state = {value: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
	/*axios.get(server.serverApi + '/api/download')
	.then((response) => {
		alert(response.data);
	});*/
  }
  handleSubmit(event) {
	var uploadform = document.getElementById('upform');
	let upfile = new FormData(uploadform);
	axios.post(server.serverApi + '/api/upload',upfile)
	.then((response) => {
		alert(response.data);
	});
  }

  render() {
    return (
      <form id="upform" onSubmit={this.handleSubmit}>
        <label>
          Add excel file:
          <input type="file" name="sampleFile"/>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default UpDown;
