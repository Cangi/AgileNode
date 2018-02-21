//import React from 'react';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Footer from './footer';
import registerServiceWorker from './registerServiceWorker';
/*import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";*/
//call to local host - call to the server, pass it back to the server



class ProjectPage extends Component {
  render() {
    return(
          <body>
            <div class = 'page'>
              <h1 class="display-1">Name of Project (placeholder)</h1>
              <h2 class="display-2">Name of Head Researcher</h2>
              <p>Date Created: 01/01/2001</p>
              <p>Date Last Updated: 02/02/2002</p>
              <button type="button" class="btn btn-primary">Upload</button>
              <button type="button" class="btn btn-primary">Download latest</button>
              <p>Small picture/snapshot of excel file</p>
              <p>Last Edited: 01/01/2001, User who edited it</p>
              <h3>Comments</h3>
              <p>Comment box</p>
            </div>
          </body>

    )
  }
}


export default ProjectPage;
