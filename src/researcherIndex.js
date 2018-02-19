import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import NavBar from './navBar';
import Footer from './footer';
import registerServiceWorker from './registerServiceWorker';


class Frame extends React.Component {
  render() {
    return (
			<div class="container-fluid">
				<h3 class="">Researcher Products</h3>
				<table class="table-custom table table-bordered">
				<thead>
				  <tr>
					<th>Project Name</th>
					<th>Project date</th>
					<th>Owner</th>
				  </tr>
				</thead>
				<tbody>
				  <tr>
					<td>John</td>
					<td>Doe</td>
					<td>john@example.com</td>
				  </tr>
				  <tr>
					<td>Mary</td>
					<td>Moe</td>
					<td>mary@example.com</td>
				  </tr>
				  <tr>
					<td>July</td>
					<td>Dooley</td>
					<td>july@example.com</td>
				  </tr>
				</tbody>
			  </table>
			</div>
    );
  }
}

ReactDOM.render(
		<div>
			<NavBar />
			<Frame />
			<Footer />
		</div>,
  document.getElementById('root')
);
registerServiceWorker();

export default Frame;

