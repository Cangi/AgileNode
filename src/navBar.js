import React, { Component } from 'react';
import logo from './logo.svg';

class NavBar extends Component {
 render() {
   return (
			<div class="container-fluid">
				<nav class="navbar-custom navbar navbar-expand-sm navbar-light">
					<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#nav-content" aria-controls="nav-content" aria-expanded="false" aria-label="Toggle navigation">
						<span class="navbar-toggler-icon"></span>
					</button>

					<a class="navbar-brand" href="#"><img class="dundee-logo" src="https://www.pslteamsports.com/assets/images/ClubShops/UoD/University%20of%20Dundee%20(logo).png"></img></a>

					<div class="collapse navbar-collapse justify-content-end" id="nav-content">  
					
					<ul class="navbar-nav">
					<li class="nav-item">
						<span class="navbar-text">Welcome Paulius! <img class="avatar" src="images/avatar_male.png"></img></span>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#">Link 1</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#">Link 2</a>
					</li>
					</ul>
					</div>
				</nav>
			</div>
   );
 }
}

export default NavBar;