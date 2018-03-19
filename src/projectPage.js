//import React from 'react';
import React from 'react';
import './index.css';
import { Link } from 'react-router-dom'
import Footer from './footer';
import axios from 'axios';
import './projectPage.css'
import server from './serverConfig'
import UpDown from './updown'
import CommentCard from './commentCard'
//call to local host - call to the server, pass it back to the server



class ProjectPage extends React.Component {


    constructor(props) {
        super(props);
        this.state = { value: '', comment: '', project: undefined, userData: JSON.parse(localStorage.getItem('userData')), value: '', downloadArray: undefined, dfile: '', department: '' };
        axios.post(server.serverApi + '/api/getProject', { idOfTheProject: this.props.location.pathname.split(':')[1] }).then((response) => { this.setState({ project: response.data }) });
        axios.get(server.serverApi + '/api/downloadList').then((response) => {
            this.setState({ downloadArray: JSON.parse(response.data) });
        });
        axios.post(server.serverApi + '/api/getDepartment', { user: this.state.userData }).then((response) => { this.setState({ department: response.data }); console.log(this.state.department) });
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitComment = this.handleSubmitComment.bind(this);
        this.handleChangeComment = this.handleChangeComment.bind(this);

    }

    objectRow(id) {
        var name;
        var date;
        var comment;

        if (this.state.project != undefined && this.state.userData != undefined) {
            name = this.state.project.comments[id].name;
            date = this.state.project.comments[id].date.split('T')[0] + " " + this.state.project.date.split('T')[1];
            comment = this.state.project.comments[id].comment;
        }

        return <CommentCard name={name}
            comment={comment}
            dateCreated={date} />
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleChangeComment(event) {
        this.setState({ comment: event.target.value });
    }

    handleSubmit(event) {
        axios.post(server.serverApi + '/api/signProject', { idOfTheProject: this.props.location.pathname.split(':')[1], user: this.state.userData, signiture: this.state.value });
    }

    handleSubmitComment(event) {
        alert('Comment Submited!')
        axios.post(server.serverApi + '/api/addComment', { comment: this.state.comment, idOfTheProject: this.props.location.pathname.split(':')[1], user: this.state.userData });
        this.setState({ comment: '' });
        window.location.reload();
    }

    render() {

        var projectName;
        var researcherName;
        var date;
        var button;
        var size = 0;

        if (this.state.project != undefined) {
			var updown = <UpDown researcherSignedUP={this.state.project.researcherSigned} department={this.state.department} projectID={this.state.project._id} />
            projectName = this.state.project.name;
            let sign = this.state.department + 'Signed';
            date = this.state.project.date.split('T')[0];
            size = this.state.project.comments.length;
            if (this.state.userData != undefined) {
                researcherName = this.state.project.researcherName;
                if (this.state.department == 'researcher' && this.state.project.RISSigned == undefined && this.state.project.readyForRIS == undefined) {
                    button = <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">Send to RIS</button>
                } else if (this.state.department == 'researcher' && this.state.project.RISSigned == undefined && this.state.project.readyForRIS == true) {
                    button = <button type="button" class="btn btn-primary" >Waiting for RIS</button>
                } else if (this.state.department == 'researcher' && this.state.project.RISSigned == true && this.state.project.readyForRIS == true && this.state.project.researcherSigned == undefined) {
                    button = <button type="submit" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">Sign document</button>
                } else if (this.state.department == 'researcher' && this.state.project.RISSigned == true && this.state.project.readyForRIS == true && this.state.project.researcherSigned == true && this.state.project.deanSigned == false) {
                    button = <button type="submit" class="btn btn-primary">Waiting for Dean/Associate Dean</button>
                } else {
                    button = <button type="submit" class="btn btn-primary">Project successfuly signed by everyone.</button>
                }
                if (this.state.department != 'researcher' && ((this.state.department == "RIS" && this.state.project.RISSigned != true)
                    || (this.state.department == "associateDean" && this.state.project.associateDeanSigned != true)
                    || (this.state.department == "dean" && this.state.project.deanSigned != true))) {

                    button = <button type="submit" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">Sign document</button>
                } else if (this.state.department != 'researcher') {

                    button = <button type="button" class="btn btn-primary">Thank you for you contribution</button>
                }
            }

            if (this.state.project.readyForRIS == true) {
                var readyRis = <img class="checkbox" src={server.serverFront + "/images/greencheckbox.png"}></img>;
            }
            else {
                var readyRis = <img class="checkbox" src={server.serverFront + "/images/redcheckbox.png"}></img>;
            }

            if (this.state.project.RISSigned == true) {
                var risSign = <img class="checkbox" src={server.serverFront + "/images/greencheckbox.png"}></img>;
            }
            else {
                var risSign = <img class="checkbox" src={server.serverFront + "/images/redcheckbox.png"}></img>;
            }

            if (this.state.project.researcherSigned == true) {
                var resSign = <img class="checkbox" src={server.serverFront + "/images/greencheckbox.png"}></img>;
            }
            else {
                var resSign = <img class="checkbox" src={server.serverFront + "/images/redcheckbox.png"}></img>;
            }

            if (this.state.project.associateDeanSigned == true) {
                var assoSign = <img class="checkbox" src={server.serverFront + "/images/greencheckbox.png"}></img>;
            }
            else {
                var assoSign = <img class="checkbox" src={server.serverFront + "/images/redcheckbox.png"}></img>;
            }

            if (this.state.project.deanSigned == true) {
                var deanSign = <img class="checkbox" src={server.serverFront + "/images/greencheckbox.png"}></img>;
            }
            else {
                var deanSign = <img class="checkbox" src={server.serverFront + "/images/redcheckbox.png"}></img>;
            }
        }


        return (
            <body>
                <div class="container">
                    <div class="jumbotron">
                        <h1 class="display-3">{projectName}</h1>
                        <p class="lead">By {researcherName}</p>
                        <p class="centered">
                            <span class="badge badge-warning badge-custom">Ready for RIS {readyRis}</span>
                            <span class="badge badge-warning badge-custom">RIS {risSign}</span>
                            <span class="badge badge-warning badge-custom">Researcher {resSign}</span>
                            <span class="badge badge-warning badge-custom">Associate Dean {assoSign}</span>
                            <span class="badge badge-warning badge-custom">Dean {deanSign}</span>
                        </p>
                    </div>

                    <div class="row marketing">
                        <div class="col-lg-6">
                            <h3>Project details</h3>
                            <p>Date created: {date}</p>
                            <p>Date last updated: {date}</p>
                            <p>Last Edited: {date}</p>
                            <p>User who edited it: {researcherName}</p>
                        </div>

                        <div class="col-lg-6">
                            {updown}
                            <p></p>
                        </div>
                    </div>

                    <div class="row marketing">
                        <div class="col-lg-6">
                            {[...Array(size)].map((x, i) =>
                                this.objectRow(i)
                            )}
                            <form>
                                <div class="form-group">
                                    <div class="form-group">
                                    <h3>Leave a comment here:</h3>
                                        <textarea rows="4" cols="1" type="comment" class="form-control" id="Comment" value={this.state.comment} onChange={this.handleChangeComment} placeholder="Comment" />
                                    </div>
                                    <div class="form-check">
                                    </div>
                                    <button type="button" class="btn btn-primary" onClick={this.handleSubmitComment}>Submit</button>
                                </div>
                            </form>
                        </div>

                        <div class="col-lg-6">
                            <h3>Digital signature</h3>
                            {button}
                            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered" role="document">
                                    <div class="modal-content">
                                        <div class="modal-body">
                                            <form onSubmit={this.handleSubmit}>
                                                <label for="inputID">Please enter your ID
														<input type="number" class="form-control" value={this.state.value} onChange={this.handleChange} />
                                                </label>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                                    <button type="submit" class="btn btn-primary">Sign</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </body>


        )
    }

}


export default ProjectPage;
