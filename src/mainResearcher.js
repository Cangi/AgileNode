import './index.css';
import React from 'react';
import Navbar from './Navbar';
import Footer from './footer';
import ProjectsListResearcher from './ProjectsListResearcher';

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
