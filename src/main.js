import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ProjectsListResearcher from './projectsListResearcher'
import NewRISProjects from './newRISProjects'
import CreateProject from './createProject'
import SignUp from './signUp'
import Login from './login'
import ProjectPage from './projectPage'
import server from './serverConfig'
import LandingPage from './landingPage'
import axios from 'axios';
// <Route path='/index' component={ProjectsListResearcher} />

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = { department: '' };
    }

    render() {


        var department = <div></div>

        if (localStorage.getItem('signUp') != "true" && JSON.parse(localStorage.getItem('userData')) != undefined) {
            console.log(localStorage.getItem('signUp'));
            console.log(JSON.parse(localStorage.getItem('userData')));
            return (<SignUp userData={this.props.userData} />);
        }
        if (this.state.department == '' && JSON.parse(localStorage.getItem('userData')) != undefined)
            axios.post(server.serverApi + '/api/getDepartment', { user: JSON.parse(localStorage.getItem('userData')) }).then((response) => { this.setState({ department: response.data }) });
        var department = <div></div>;

        if (this.state.department == "researcher") {
            department = <ProjectsListResearcher userData={this.props.userData} />
        }
        else if (this.state.department == "RIS") {
            department = <NewRISProjects userData={this.props.userData} />
        }
        return (
            <main>
                <Switch>
                    <Route exact path='/' component={() => {
                        if (this.props.userData !== undefined) {

                            window.location = '/index';

                        }
                        return <LandingPage />
                    }} />
                    <Route path='/index' render={(props) => (
                        department
                    )} />
                    <Route path='/disconnect' component={() => {
                        localStorage.clear();
                        window.location = server.serverApi + '/disconnect';
                    }
                    } />
                    <Route path='/login' component={Login} />

                    <Route path='/createProject' component={CreateProject} />

                    <Route path='/signup' component={() => {
                        if (localStorage.getItem('signUp') == 'true') {
                            window.location = '/index';
                            return department;
                        } else {
                            return <SignUp />
                        }
                    }} />

                    <Route path='/projectPage' component={ProjectPage} />

                    <Route path='/newRISProjects' component={NewRISProjects} />
                </Switch>
            </main>
        );
        //}
    }

}
// <Route exact path='/' component={ProjectsListResearcher}/>
//   {() => window.location = 'http://localhost:3000/login'}/>   <Route path='/schedule' component={Schedule}/>
/*
<RouteIf
		 condition={(() => {
			return true
		 })()}
		 privateRoute={true}
		 path="/path/:value"
		 component={MyComponent}
	  />
	  */
export default Main
