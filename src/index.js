import registerServiceWorker from './registerServiceWorker';
import React from 'react'
import { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import App from './app';
import axios from 'axios';
import ReactDom from 'react-dom'
import Login from './login'

/*class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isLoggedIn: false};
	const self = this;
	axios.get('http://localhost:3000/userdata')
	   .then((response) => {
		   if(response.data!=undefined)
		self.setState({isLoggedIn: true});
		
		});
	console.log("test");
  }
	

  render() {
	

	//if(account!=undefined) isLoggedIn = true;
	//console.log(account);
    return (
      <div>
        <Greeting isLoggedIn={this.state.isLoggedIn}/>
      </div>
    );
  }
}
//<Greeting isLoggedIn={this.state.isLoggedIn} />
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <App />;
  } else {
   return <Login />;
  }
}*/

ReactDom.render((

  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'));

registerServiceWorker();
