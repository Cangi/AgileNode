/*A page that deals with creating a form and asking for confirmation before
sending it to a database*/
/*The basics of this code is taken from https://reactjs.org/docs/forms.html */
import './index.css';
import React from 'react';

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

  handleSubmit(event) {
    //if(confirm('Are you sure you want the name ' + this.state.value))
    //{ //This function will ask for confirmation that the name is correct
    
    //}
    //else {
      //nothing happens it goes back to the normal page
   // }
    //It also needs to collect the date from the server/browser when it was created

    //and then check the name for any bad characters, and then submit to database

  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default CreateProject;
