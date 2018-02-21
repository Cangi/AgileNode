import './index.css';
import React from 'react';
import Navbar from './navbar';
import Footer from './footer';
import CreateProject from './createProject';

class CreateProjectFile extends React.Component {
  render() {
    return (
			<div>
				<Navbar />
				<CreateProject />
				<Footer />
			</div>
		);
	}
}

export default CreateProjectFile;
