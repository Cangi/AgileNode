/*A page that deals with creating a form and asking for confirmation before
sending it to a database*/
/*The basics of this code is taken from https://reactjs.org/docs/forms.html */
import './index.css';
import React from 'react';
import axios from 'axios';


//import ProjectsListResearcher from './projectsListResearcher';
//import {Route, Link, BrowserRouter} from "react-router-dom";
//import {HashRouter, NavLink, BrowserRouter, Route} from "react-router-dom";
//import ProjectPage from './projectPage';

class signatureForm extends React.Component {
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
    axios.post('http://localhost:3000/api/createProject',{ staffID: this.state.value });
  
    //It also needs to collect the date from the server/browser when it was created

    //and then check the name for any bad characters, and then submit to database

  }

  render() {
    return (

		<form id="frm1" action="/action_page.php">
			First name: <input type="text" name="fname"><br>
			Last name: <input type="text" name="lname"><br><br>
			<input type="button" onclick="myFunction()" value="Submit">
		</form>

    );
  }
  
export default signatureForm;
