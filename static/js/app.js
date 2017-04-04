import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Menu from './menu';

/*Render Home Component and apply it root id in index.html */
 // ReactDOM.render(
 //    <Home/>,
 //      document.querySelector('.root')
 // );
export default class App extends Component {
  render() {
    return (
      <div>
        <Menu/>
      <div id="map">
        <img src="static/img/C_Camo_Map.png"/>
      </div>
        {this.props.children}
      </div>
    );
  }
}
