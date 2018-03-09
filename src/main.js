import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ProjectsListResearcher from './projectsListResearcher'
import CreateProject from './createProject'
import SignUp from './signUp'
import Login from './login'
import ProjectPage from './projectPage'
import server from './serverConfig'
import axios from 'axios';
// <Route path='/index' component={ProjectsListResearcher} />
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {department: ''};
    }

    render() {
      if(this.state.department == '')
      axios.post(server.serverApi + '/api/getDepartment', {user: JSON.parse(localStorage.getItem('userData'))}).then((response) => {this.setState({department: response.data})});
      var department = <div></div>;
      if(localStorage.getItem('signUp') == false){
        return (<SignUp userData={this.props.userData} />);
      }
       if(this.state.department == "researcher"){
        department = <ProjectsListResearcher userData={this.props.userData} />
      }
        return (
            <main >
                <Switch>
                    <Route exact path='/' component={() => {
                        if (this.props.userData !== undefined) {
                            window.location = '/index';

                        }
                        return <div></div>
                    }}/>
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

                    <Route path='/signup' component={SignUp} />

                    <Route path='/projectPage' component={ProjectPage} />
                </Switch>
            </main>
        );
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
