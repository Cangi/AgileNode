import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ProjectsListResearcher from './projectsListResearcher'
import CreateProject from './createProject'
import Login from './login'
import ProjectPage from './projectPage'
import matriculationReq from './matriculationReq'



const Main = () => (
  <main>
    <Switch>

	  <Route path='/index' component={ProjectsListResearcher}/>
	  <Route path='/login' component={Login}/>
	  <Route path='/matriculationReq' component={matriculationReq}/>
      <Route exact path='/' component={ProjectsListResearcher}/>
      <Route path='/createProject' component={CreateProject}/>
      <Route path='/projectPage' component={ProjectPage}/>
    </Switch>
  </main>
)
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
