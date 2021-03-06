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

class CreateProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) { //this code is from http://codeheaven.io/how-to-use-axios-as-your-http-client/
    axios.post(server.serverApi + '/api/createProject',{ nameOfTheProject: this.state.value, user:JSON.parse(localStorage.getItem('userData'))});

    //It also needs to collect the date from the server/browser when it was created

    //and then check the name for any bad characters, and then submit to database

  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
	  <div class="form-custom form-group">
        <label for="inputNewProject"> Create a new project
          <input type="text" class="form-control" id="inputNewProject" aria-describedby="emailHelp" placeholder="Enter name" value={this.state.value} onChange={this.handleChange} />
        </label>
		<button type="submit" class="btn btn-primary" value="Submit">Submit</button>
		</div>
      </form>
    );
  }
}

export default CreateProject;
