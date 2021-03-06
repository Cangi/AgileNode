import './index.css';
import React from 'react';
import { Link } from 'react-router-dom'
import ProjectPage from './projectPage';
import server from './serverConfig'
import axios from 'axios'
import front  from './serverConfig'

class CommentCard extends React.Component {
	constructor(props) {
		super(props);
	}
render() {
  return(
	  <div class="card card-custom">
        <div class="card-header card-custom">
        {this.props.name}
        </div>
        <div class="card-body">
          <h4 class="card-title">{this.props.comment}</h4>
          <p class="card-text">
              Created : {this.props.dateCreated}
			  </p>
        </div>
    </div>

  )
  }
}
//axios.post(server.serverApi + '/api/getProject',{ idOfTheProject: this.props.name }).then((response) => {
//<Link to={this.state.linkTo}>Project Page</Link>
//displays the project name
//displays the researchers name who created the project
//the date the project was created
//diplays the state of the signatures

export default CommentCard;
