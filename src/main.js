import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ProjectsListResearcher from './projectsListResearcher'
import NewRISProjects from './newRISProjects'
import CreateProject from './createProject'
import SignUp from './signUp'
import Login from './login'
import ProjectPage from './projectPage'
import server from './serverConfig'
// <Route path='/index' component={ProjectsListResearcher} />

class Main extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
      if(localStorage.getItem('signUp') == false)
       return (<SignUp userData={this.props.userData} />);
        return (
            <main >
                <Switch>
                    <Route exact path='/' component={() => {
                        if (this.props.userData != undefined) {
                            window.location = '/index';

                        }
                        return <div></div>
                    }}/>

                    {/*starts routing to different home pages if different departments (ie researcher/RIS/dean)*/}
                    if(this.props.userData.department == "researcher")
                    {

                      <Route path='/index' render={(props) => (
                          <ProjectsListResearcher {...props} userData={this.props.userData} />
                      )} />
                    }
                    else if(this.props.userData.department == "RIS")
                    {
                      <Route path='/index' render={(props) => (
                          <NewRISProjects {...props} userData={this.props.userData} />
                      )} />
                    }


                    //TODO add routes for assoc dean and dean

                    <Route path='/disconnect' component={() => {
                        localStorage.clear();
                        window.location = server.serverApi + '/disconnect';
                    }
                    } />
                    <Route path='/login' component={Login} />

                    <Route path='/createProject' component={CreateProject} />

                    <Route path='/signup' component={SignUp} />

                    <Route path='/projectPage' component={ProjectPage} />

                    <Route path='/newRISProjects' component={NewRISProjects} />
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
