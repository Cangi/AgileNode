import React, { Component } from 'react';
import logo from './logo.svg';

class NavBar extends Component {
 render() {
   return (
                <nav class="navbar navbar-light bg-faded">
                    <a class="navbar-brand" href="#">
                        <img src="https://www.familyfreshmeals.com/wp-content/uploads/2017/07/Creamy-Instant-Pot-Mac-and-Cheese-Step-1.jpg" width="60" height="60" class="d-inline-block align-top" alt=""></img>
                    </a>
                    Enter title here
                    
                    <a class="welcome">
                    Wecome -username-
                    </a>
                    
                    <a class="profilepic">
                        <img src="http://cdn.wpbeginner.com/wp-content/uploads/2012/03/icontexto-user-web20-wordpress-180x180.png" width="60" height="60" alt=""></img>
                    </a>
                    
                    <form class="form-inline">
                        <button class="btn btn-outline-success" type="button">Button 1</button>
                        <button class="btn btn-outline-success" type="button">Button 2</button>
                    </form>
                    
                </nav>
   );
 }
}

export default NavBar;