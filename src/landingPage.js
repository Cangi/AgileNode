import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'
import './index.css';
import ProjectCard from './projectCard';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';
import server from './serverConfig'
import CreateProject from './createProject'

class LandingPage extends React.Component {
	
  render() {
	  return(
	  <div>
	  <p>Raduu</p>
	  </div>
	  );
  }
}

export default LandingPage;