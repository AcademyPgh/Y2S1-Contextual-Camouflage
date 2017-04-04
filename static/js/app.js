import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Menu from './menu';
import {Image} from 'react-bootstrap';

export default class App extends Component {
  render() {
    return (
      <div>
        <Menu/>
      <div id="map">
        <Image src="static/img/C_Camo_Map.png" responsive/>
      </div>
      
        {this.props.children}

      </div>
    );
  }
}
