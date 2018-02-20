import React, { Component } from 'react';
import './App.css';

class Login extends Component {

render() {
  return (
  <html>
        <head>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous"></link>
        </head>
        <body>
            <div className="Login">
            </div>
            <button onClick={() =>alert('Just a test')}>Login</button>        
            </body>
    </html>
  );
}
}

export default Login;