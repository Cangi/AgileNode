import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ProjectsListResearcher from './projectsListResearcher'
import CreateProject from './createProject'
import Login from './login'
import ProjectPage from './projectPage'
import matriculationReq from './matriculationReq'
import signatureForm from './signatureForm'


const Main = () => (
  <main>
    <Switch>

	  <Route path='/index' component={ProjectsListResearcher}/>
<<<<<<< HEAD
	  <Route path='/login' component={Login}/>
	  <Route path='/matriculationReq' component={matriculationReq}/>
=======

	  <Route path='/login' component={Login}/>

      <Route exact path='/' component={ProjectsListResearcher}/>
	    <Route path='/privacy-policy' component={() => window.location = 'http://localhost:3000/login'}/>
>>>>>>> 0669a9113930d9de9a22e7776af07ccb0ce8cc2f
      <Route path='/createProject' component={CreateProject}/>
      <Route path='/projectPage' component={ProjectPage}/>
	  <Route path='/signatureForm' component={signatureForm}/>
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
