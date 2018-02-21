import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ProjectsListResearcher from './projectsListResearcher'
import CreateProject from './createProject'


const Main = () => (
  <main>
    <Switch>
	  
      <Route exact path='/' component={ProjectsListResearcher}/>
      <Route path='/createProject' component={CreateProject}/>
    </Switch>
  </main>
)
//      <Route path='/schedule' component={Schedule}/>
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