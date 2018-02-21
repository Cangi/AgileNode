import './index.css';
import React from 'react';
import Navbar from './navbar';
import Footer from './footer';
import ProjectsListResearcher from './projectsListResearcher';

class MainResearcher extends React.Component {
  render() {
    return (
			<div>
				<Navbar />
				<ProjectsListResearcher />
				<Footer />
			</div>
		);
	}
}

export default MainResearcher;
