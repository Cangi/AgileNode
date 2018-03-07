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

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {staffID: '', position: 'researcher', testing:''};

    this.handleChangeStaffID = this.handleChangeStaffID.bind(this);
    this.handleChangePosition = this.handleChangePosition.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeStaffID(event) {
    this.setState({staffID: event.target.value});
  }

  handleChangePosition(event) {
      this.setState({position: event.target.value});
  }

  handleSubmit(event) {
    let position;
    if(this.state.position == 'RIS'){
      position = this.state.position;
    }else if(this.state.position == 'Associate Dean'){
      position = this.state.position.charAt(0).toLowerCase() + this.state.position.slice(1);
      position = position.replace(/\s/g, "");
      this.setState({position: position});
    }else{
      position = this.state.position.charAt(0).toLowerCase() + this.state.position.slice(1);
      this.setState({positon: position});
    }
    let userData = JSON.parse(localStorage.getItem('userData'));
    axios.post(server.serverApi + '/api/signUp',{ staffID: this.state.staffID, position:position, firstName:userData.displayName.split(' ')[0], lastName:userData.displayName.split(' ')[1], email:userData.mail }).then((response) => {
      this.state.testing = response.data;
    });
    //Debug message
    this.state.testing='da';

  }

  render() {
    console.log(this.state.testing);
    return (
      <form onSubmit={this.handleSubmit}>

        <div class="container">
          <div class="row">
            <div class="col-md-14 col-md-offset-7">
              <div class="panel panel-default">
                <div class="panel-heading">
                  <strong class="">SignUp</strong>
                </div>
                <div class="panel-body">
                    <form class="form-horizontal" role="form">
                      <div class="form-group last">
                          <div class="col-sm-offset- col-sm-9">
                            <label for="inputNewProject"> Staff ID
                              <input type="text" class="form-control" id="inputStaffID" aria-describedby="emailHelp" placeholder="Enter staff ID" value={this.state.staffID} onChange={this.handleChangeStaffID} />
                            </label>
                          </div>
                      </div>
                      <div class="form-group last">
                          <div class="col-sm-offset-3 col-sm-9">
                            <label for="inputNewProject"> Position
                              <select class="form-control" id="inputPosition" aria-describedby="emailHelp"  value={this.state.position} onChange={this.handleChangePosition} >
                                <option>Researcher</option>
                                <option>RIS</option>
                                <option>Associate Dean</option>
                                <option>Dean</option>
                              </select>
                            </label>
                          </div>
                      </div>


                      <div class="form-group last">
                        <div class="col-sm-offset-3 col-sm-9">
                          <button type="submit" class="btn btn-success btn-sm">Sign up</button>
                        </div>
                      </div>
                    </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default SignUp;
