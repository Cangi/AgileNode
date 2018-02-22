import React from 'react'
import Navbar from './navbar'
import ProjectsListResearcher from './projectsListResearcher'
import Main from './main'
import Footer from './footer';
import { Switch, Route } from 'react-router-dom'


const App = () => (
  <div>
    <Navbar />
    <Main />
	<Footer />
  </div>
)

export default App