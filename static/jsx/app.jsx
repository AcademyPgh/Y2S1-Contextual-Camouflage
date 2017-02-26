import React from 'react';
import ReactDOM from 'react-dom';
import Home from './home';

/* Render Home Component and apply it root id in index.html */
ReactDOM.render(
    <Home/>,
      document.querySelector('.root')
);
