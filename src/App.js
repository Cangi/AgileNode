import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  getThickness(){
	  return "Dombro";
  }
  
  render() {
    return (
      <div className="App">
	  <h1>Hello world {this.getThickness()}</h1>,
      </div> 
    );
  }
}

export default App;