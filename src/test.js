import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Test extends Component {
  getThickness(){
	  return "test";
  }
  
  render() {
    return (
      <div className="Test">
	  <h1>Hello world {this.getThickness()}</h1>,
      </div> 
    );
  }
}

export default Test;