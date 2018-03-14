import registerServiceWorker from './registerServiceWorker';
import React from 'react'
import { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import App from './app';
import ReactDom from 'react-dom'

ReactDom.render((

  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'));

registerServiceWorker();
